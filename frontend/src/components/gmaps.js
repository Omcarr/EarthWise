
import React, { useEffect, useState } from 'react';
import axios from 'axios';

const App = () => {
  const [mapLoaded, setMapLoaded] = useState(false);
  const [nearestStations, setNearestStations] = useState(null);

  // Define the locations
  const locations = [
    { name: "Andheri", lat: 19.1137, lng: 72.8697 },
    { name: "Bandra", lat: 19.0597, lng: 72.8295 },
    { name: "Powai", lat: 19.1177, lng: 72.9060 },
    { name: "Churchgate", lat: 18.9323, lng: 72.8265 },
    { name: "Juhu", lat: 19.1076, lng: 72.8264 }
  ];

  useEffect(() => {
    const fetchNearestStations = async () => {
      try {
        const response = await axios.post('http://localhost:5000/generate', {
          locations: locations.map(loc => loc.name)
        });
        setNearestStations(response.data.result);
      } catch (error) {
        console.error('Error fetching nearest stations:', error);
      }
    };

    fetchNearestStations();
  }, []);

  useEffect(() => {
    const script = document.createElement('script');
    script.src = `https://maps.googleapis.com/maps/api/js?key=AIzaSyDaQZ6F6QVVie1p8WCEFy-8xs018IaMe9s`;
    script.async = true;
    script.onload = () => {
      setMapLoaded(true);
      initMap();
    };
    document.head.appendChild(script);
  }, [nearestStations]);

  const initMap = () => {
    if (!window.google) return;

    const map = new window.google.maps.Map(document.getElementById('map'), {
      center: { lat: 19.0760, lng: 72.8777 }, // Mumbai center
      zoom: 11
    });

    // Add markers for input locations
    locations.forEach(loc => {
      new window.google.maps.Marker({
        position: { lat: loc.lat, lng: loc.lng },
        map: map,
        title: loc.name,
        icon: 'http://maps.google.com/mapfiles/ms/icons/blue-dot.png'
      });
    });

    // Add markers for nearest stations
    if (nearestStations) {
      Object.keys(nearestStations).forEach(location => {
        const station = nearestStations[location].nearest_station;
        new window.google.maps.Marker({
          position: { lat: station.latitude, lng: station.longitude },
          map: map,
          title: station.name,
          icon: 'http://maps.google.com/mapfiles/ms/icons/purple-dot.png'
        });
      });
    }
  };

  return (
    <div>
      <h1>Top 5 Locations in Mumbai</h1>
      <div id="map" style={{ height: "600px", width: "100%" }}></div>
    </div>
  );
};

export default App;

