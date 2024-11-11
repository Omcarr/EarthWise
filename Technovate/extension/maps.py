import google.generativeai as genai
import json
import os
from dotenv import load_dotenv

load_dotenv()

# sample locations to be formatted like this after getting it from gmaps history json
# locations = [
#     {"name": "Andheri", "lat": 19.1136, "lng": 72.8697},
#     {"name": "Bandra", "lat": 19.0596, "lng": 72.8295},
#     {"name": "Powai", "lat": 19.1176, "lng": 72.9060},
#     {"name": "Churchgate", "lat": 18.9322, "lng": 72.8264},
#     {"name": "Juhu", "lat": 19.1075, "lng": 72.8263}
# ]

GEMINI_API_KEY =  os.environ.get("GEMINI_API_KEY")

print(f"GEMINI_API_KEY: {GEMINI_API_KEY}")
def get_nearest_transport_stations(locations):

    genai.configure(api_key=GEMINI_API_KEY)
    model = genai.GenerativeModel("gemini-1.5-flash")

    prompt = f"""You are a knowledgeable assistant tasked with providing the nearest public transport stations (train or bus) for given locations in Mumbai. Your response should be in JSON format with the location name and the nearest transport station's details (name, latitude, and longitude).
    For each location, find the nearest train or bus station and provide the following information in this format:

      - Location name (as provided in the list)
      - Nearest transport station (train or bus)
        - Name: Name of the station (e.g., 'Andheri Railway Station')
        - Latitude: The latitude coordinate of the station (e.g., 19.1136)
        - Longitude: The longitude coordinate of the station (e.g., 72.8697)

    ### Instructions:
    1. Look up the nearest bus or train station for each location listed below.
    2. If there are multiple options, pick the station that is closest to the center of the location.
    3. Return only the relevant station with latitude and longitude.
    4. Be specific in your answers, avoid general terms like "nearby station," and focus on exact station names.
    5. Ensure the response is in valid JSON format and follows the structure outlined below.

    Locations:
    {locations}

    Response format:
    {{
        "LocationName": {{
            "nearest_station": {{
                "name": "Station Name",
                "latitude": number,
                "longitude": number
            }}
        }}
    }}
    """
    
    try:
        # Make the request to Gemini API with the generated prompt
        response = model.generate_content(prompt)
        response_text = response.text

        # Print the raw response from Gemini for debugging
        print("Gemini Response:", response_text)

        return json.loads(response_text)  # Attempt to return the parsed JSON response

    except Exception as e:
        print(f"Error: {str(e)}")
        return None  # Return None or handle the error as needed

# get_nearest_transport_stations(locations)