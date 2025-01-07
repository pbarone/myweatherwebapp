"use client"

import { useEffect, useState } from 'react';

const CurrentLocation = () => {
  const [location, setLocation] = useState(null);
  const [error, setError] = useState(null);

  useEffect(() => {
    // Function to handle successful location retrieval
    const getLocation = () => {
      if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(
          (position) => {
            const { latitude, longitude } = position.coords;
            setLocation({ latitude, longitude });
          },
          (err) => {
            setError("Unable to retrieve your location.");
          }
        );
      } else {
        setError("Geolocation is not supported by this browser.");
      }
    };

    getLocation();
  }, []);

  return (
    <div>
      <h1>Current Location</h1>
      {error && <p style={{ color: 'red' }}>{error}</p>}
      {location ? (
        <p>
          Latitude: {location.latitude} <br />
          Longitude: {location.longitude}
        </p>
      ) : (
        <p>Loading location...</p>
      )}
    </div>
  );
};

export default CurrentLocation;
