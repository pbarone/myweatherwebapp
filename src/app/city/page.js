"use client";

import { useEffect, useState } from "react";

const CurrentLocation = () => {
  const [location, setLocation] = useState(null);
  const [cityData, setCityData] = useState(null);
  const [weatherData, setWeatherData] = useState(null);
  const [error, setError] = useState(null);

  const fetchCityData = async (latitude, longitude) => {
    try {
      const cityURL = `https://dataservice.accuweather.com/locations/v1/cities/geoposition/search?apikey=${process.env.NEXT_PUBLIC_ACCUWEATHER_API_KEY}&q=${latitude}%2C${longitude}&details=true`;
      const response = await fetch(cityURL);
      const data = await response.json();
      setCityData(data);
    } catch (err) {
      setError("Unable to fetch city data.");
    }
  };

  const fetchWeatherData = async (cityKey) => {
    try {
      const weatherURL = `https://dataservice.accuweather.com/currentconditions/v1/${cityKey}?apikey=${process.env.NEXT_PUBLIC_ACCUWEATHER_API_KEY}&details=true&language=en-us`;
      const response = await fetch(weatherURL);
      const data = await response.json();
      setWeatherData(data);
    } catch (err) {
      setError("Unable to fetch weather data.");
    }
  };

  const getLocation = () => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        async (position) => {
          const { latitude, longitude } = position.coords;
          setLocation({ latitude, longitude });
          await fetchCityData(latitude, longitude);
        },
        () => setError("Unable to retrieve your location.")
      );
    } else {
      setError("Geolocation is not supported by this browser.");
    }
  };

  useEffect(() => {
    getLocation();
  }, []);

  useEffect(() => {
    if (cityData?.Key) {
      fetchWeatherData(cityData.Key);
      
    }
  }, [cityData]);

  

  return (
    <div>
      <h1>Current Location</h1>
      {error && <p style={{ color: "red" }}>{error}</p>}
      {location ? (
        <p>
          City: {cityData?.LocalizedName || "Loading city..."} <br />
          Parent: {cityData?.ParentCity?.LocalizedName || "Loading parent..."} <br />
          Latitude and Longitude: {location.latitude}, {location.longitude} <br />
          Temperature: {weatherData 
                        ? `${weatherData[0]?.Temperature?.Metric?.Value} °C - ${weatherData[0]?.Temperature?.Imperial?.Value} °F` 
                        : "Loading temperature..."}
          <br />
          Feels like: {weatherData 
                        ? `${weatherData[0]?.RealFeelTemperature?.Metric?.Value} °C - ${weatherData[0]?.RealFeelTemperature?.Imperial?.Value} °F` 
                        : "Loading temperature..."}

          <br />
          Weather: {weatherData ? weatherData[0]?.WeatherText : "Loading weather..."}
        </p>
      ) : (
        <p>Loading location...</p>
      )}
    </div>
  );
};

export default CurrentLocation;
