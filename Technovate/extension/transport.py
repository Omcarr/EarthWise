from typing import Dict, Union, List, Any, Tuple
from datetime import datetime
import json
import re
from collections import Counter
from pathlib import Path

class TransportAnalyzer:
    """Analyzes transport data with eco-points, distance/time summaries, and top visited locations."""

    # Define eco-points for all transport types
    ECO_POINTS_MAP = {
        "WALKING": 5,
        "CYCLING": 5,
        "IN_BUS": 3,
        "IN_TRAIN": 4,
        "IN_SUBWAY": 4,
        "IN_PASSENGER_VEHICLE": -3,
        "MOTORCYCLING": -2,
        "IN_FOUR_WHEELER": -5
    }

    def __init__(self, file_path: Union[str, Path]):
        """Initialize the analyzer with file path."""
        self.file_path = Path(file_path)
        self.distance_summary: Dict[str, float] = {}
        self.time_summary: Dict[str, float] = {}
        self.total_points: float = 0
        self.place_visits: List[Dict[str, Any]] = []  # Store places with location data

    def _parse_timestamp(self, timestamp: str) -> datetime:
        """Parse ISO format timestamp."""
        return datetime.fromisoformat(timestamp.replace("Z", "+00:00"))

    def _extract_locality(self, address: str) -> str:
        """Extract locality name from full address."""
        if not address:
            return "Unknown Location"
        # Extract the locality before 'Mumbai' or 'Maharashtra'
        match = re.search(r'([^,]+)(?=,\s*(?:Mumbai|Maharashtra|India))', address)
        if match:
            return match.group(1).strip()
        return "Unknown Location"

    def _process_activity_segment(self, segment: Dict[str, Union[str, float, dict]]) -> None:
        """Process a single activity segment and update distance, time, and eco-points."""
        activity_type = segment.get("activityType", "UNKNOWN")
        distance_meters = float(segment.get("distance", 0))
        distance_km = distance_meters / 1000

        # Calculate duration
        duration = segment.get("duration", {})
        start_time = duration.get("startTimestamp")
        end_time = duration.get("endTimestamp")
        
        if start_time and end_time:
            start_dt = self._parse_timestamp(start_time)
            end_dt = self._parse_timestamp(end_time)
            duration_hours = (end_dt - start_dt).total_seconds() / 3600
        else:
            duration_hours = 0

        # Update distance and time summaries
        self.distance_summary[activity_type] = self.distance_summary.get(activity_type, 0) + distance_km
        self.time_summary[activity_type] = self.time_summary.get(activity_type, 0) + duration_hours

        # Calculate eco-points
        if activity_type in self.ECO_POINTS_MAP:
            self.total_points += self.ECO_POINTS_MAP[activity_type] * distance_km

    def _process_place_visit(self, place_visit: Dict[str, Any]) -> None:
        """Process a single place visit to track frequently visited locations."""
        location = place_visit.get("location", {})
        address = location.get("address", "")
        locality = self._extract_locality(address)

        # Capture latitude and longitude
        latitude = location.get("latitudeE7", 0) / 1e7  # Convert from E7 format
        longitude = location.get("longitudeE7", 0) / 1e7  # Convert from E7 format

        # Add visited location data with coordinates
        self.place_visits.append({
            "locality": locality,
            "latitude": latitude,
            "longitude": longitude
        })

    def analyze(self) -> Dict[str, Any]:
        """Analyze transport data and generate a summary of distance, time, eco-points, and top visited locations."""
        try:
            if not self.file_path.exists():
                raise FileNotFoundError(f"File not found: {self.file_path}")

            with open(self.file_path, 'r', encoding='utf-8') as file:
                data = json.load(file)

            timeline_objects = data.get("timelineObjects", [])
            
            for obj in timeline_objects:
                if "activitySegment" in obj:
                    self._process_activity_segment(obj["activitySegment"])
                elif "placeVisit" in obj:
                    self._process_place_visit(obj["placeVisit"])

            # Calculate top 5 most frequently visited locations
            location_counter = Counter([visit["locality"] for visit in self.place_visits])
            top_5_locations = location_counter.most_common(5)

            # Prepare top 5 locations as tuples for MapComponent
            top_5_with_coordinates: List[Tuple[str, float, float, int]] = []
            for location, visit_count in top_5_locations:
                # Find corresponding lat/lon for this locality
                location_data = [visit for visit in self.place_visits if visit["locality"] == location]
                # Use the first occurrence for lat/lon, in case there are multiple visits
                if location_data:
                    top_5_with_coordinates.append((
                        location,
                        location_data[0]["latitude"],
                        location_data[0]["longitude"],
                        visit_count
                    ))

            return {
                "travel_summary_kms": self.distance_summary,
                "travel_summary_hours": self.time_summary,
                "total_eco_points": round(self.total_points, 2),
                "top_5_locations": top_5_with_coordinates
            }

        except Exception as e:
            raise RuntimeError(f"Error analyzing transport data: {str(e)}")

def print_analysis(result: Dict[str, Any]) -> None:
    """Print formatted analysis results."""
    print("\nTravel Summary (in km):")
    print("-" * 40)
    for transport_mode, distance in result["travel_summary_kms"].items():
        print(f"{transport_mode}: {distance:.2f} km")

    print("\nTravel Summary (in hours):")
    print("-" * 40)
    for transport_mode, hours in result["travel_summary_hours"].items():
        print(f"{transport_mode}: {hours:.2f} hours")

    print(f"\nTotal Eco-Points: {result['total_eco_points']:.2f}")

    print("\nTop 5 Most Frequently Visited Locations:")
    print("-" * 40)
    for location in result["top_5_locations"]:
        print(f"{location[0]}: {location[3]} visits, Latitude: {location[1]}, Longitude: {location[2]}")

def format_result(result):
    # Format travel_summary_kms and travel_summary_hours
    for key in ['travel_summary_kms', 'travel_summary_hours']:
        for transport_mode, value in result[key].items():
            result[key][transport_mode] = round(value, 2)

    return result
