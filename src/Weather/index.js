import React, { useState } from 'react';
import axios from 'axios';
import './weather.css'; 

const Weather = () => {
  const [forecast, setForecast] = useState([]);
  const [cityName, setCityName] = useState('');

  const handleCityChange = (event) => {
    setCityName(event.target.value);
  };

  const handleSubmit = () => {
    const API_KEY = '0c206ceea5fa22fff8f7ee59352c6a1b';
    const URL = `https://api.openweathermap.org/data/2.5/forecast?q=${cityName}&units=metric&appid=${API_KEY}`;

    axios.get(URL)
      .then(response => {
        // Group the weather data by date
        const groupedData = groupWeatherByDate(response.data.list);
        setForecast(groupedData);
      })
      .catch(error => {
        console.error('Error fetching weather data:', error);
      });
  };

  // Function to group weather data by date
  const groupWeatherByDate = (data) => {
    const groupedData = {};
    data.forEach(item => {
      const date = new Date(item.dt * 1000).toLocaleDateString('en-US', { weekday: 'long' });
      if (!groupedData[date]) {
        groupedData[date] = item;
      }
    });
    return Object.values(groupedData);
  };

  return (
    <div>
      <h1>Weather Forecast</h1>
      <div>
        <input
          type="text"
          placeholder="Enter city name"
          value={cityName}
          onChange={handleCityChange}
        />
        <button onClick={handleSubmit}>Get Weather</button>
      </div>
      {forecast.length > 0 ? (
        forecast.map((item, index) => (
          <div className="weather-card" key={index}>
            <h2>{new Date(item.dt * 1000).toLocaleDateString('en-US', { weekday: 'long' })}</h2>
            <img
              src={`https://openweathermap.org/img/wn/${item.weather[0].icon}.png`}
              alt={item.weather[0].description}
            />
            <p>High: {item.main.temp_max}°C</p>
            <p>Low: {item.main.temp_min}°C</p>
          </div>
        ))
      ) : (
        <p>Enter a city name to get the weather forecast.</p>
      )}
    </div>
  );
};

export default Weather;
