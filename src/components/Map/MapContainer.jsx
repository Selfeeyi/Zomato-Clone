
import React, { useState } from 'react';
import { GoogleMap, Marker, withGoogleMap, withScriptjs } from 'react-google-maps';
import axios from 'axios'; // Import axios or any HTTP client library you prefer

const Map = ({ handleMarkerDrag }) => (
  <GoogleMap
    defaultZoom={10}
    defaultCenter={{ lat: 13.025998, lng: 77.6362621 }}
  >
    {/* Example marker */}
    <Marker
      draggable={true}
      position={{ lat: 13.029918, lng: 77.6362621 }}
      onDragEnd={handleMarkerDrag}
    />
  </GoogleMap>
);

const WrappedMap = withScriptjs(withGoogleMap(Map));

const MapContainer = () => {
  const [selectedLocation, setSelectedLocation] = useState({
    lat: 13.029918,
    lng: 77.6362621,
    address: ''
  });

  const handleMarkerDrag = async (event) => {
    const newLat = event.latLng.lat();
    const newLng = event.latLng.lng();

    try {
      // Make an API call to retrieve address from lat lng
      const response = await axios.get(`https://userpanel.selfeey.com/api.selfeey.com/addressapi.php?lat=${newLat}&lng=${newLng}`);

      if (response.data.success) {
        setSelectedLocation({
          lat: newLat,
          lng: newLng,
          address: response.data.address
        });
      } else {
        // Handle unsuccessful response
        console.error('Error retrieving address:', response.data.error);
      }
    } catch (error) {
      // Handle API call error
      console.error('Error fetching address:', error);
    }
  };

  return (
    <div style={{ width: '50vw', height: '50vh' }}>
      <WrappedMap
        googleMapURL={`https://maps.googleapis.com/maps/api/js?key=AIzaSyCKrfTpQUe5jTENrJLx51TZ0n8DF6wxGzw`}
        loadingElement={<div style={{ height: '100%' }} />}
        containerElement={<div style={{ height: '100%' }} />}
        mapElement={<div style={{ height: '100%' }} />}
        handleMarkerDrag={handleMarkerDrag}
      />
      <div>
        <h3>Selected Location:</h3>
        <p>Latitude: {selectedLocation.lat}</p>
        <p>Longitude: {selectedLocation.lng}</p>
        <p>Address: {selectedLocation.address}</p>
      </div>
    </div>
  );
};

export default MapContainer;
