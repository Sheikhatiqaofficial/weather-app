import React, { useState } from 'react';
import './App.css';
import axios from 'axios';

function App() {
  const [city, setCity] = useState(''); 
  const [weatherData, setWeatherData] = useState(null); 
  const [loading, setLoading] = useState(false); 
  const [error, setError] = useState('');

  const apiKey = '1f825b7faaa6d540f842aa9758cf6b5b'

  const handleSearch = async (e) => {
    e.preventDefault(); 
    setLoading(true); 
    setError(''); 
    setWeatherData(null);

    try {
    
      const response = await axios.get(
        `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`
      );
      setWeatherData(response.data); 
    } catch (err) {
      setError('City not found! Please try again.'); 
    } finally {
      setLoading(false); 
    }
  };

  return (
    <>
      <div className="App">
        <div className="sky">
          <div className="sun"></div>
          <div className="clouds">
            <div className="cloud"></div>
            <div className="cloud"></div>
            <div className="cloud"></div>
          </div>
        </div>

        <div className="App">
          <h1>Live Weather App</h1>

         
          <form onSubmit={handleSearch}>
            <input
              type="text"
              value={city}
              onChange={(e) => setCity(e.target.value)}
              placeholder="Enter city name"
              required
            />
            <button type="submit">Search</button>
          </form>

          {loading && <p>Loading...</p>}

        
          {error && <p>{error}</p>}

     
          {weatherData && (
            <div className="weather-info">
              <h2>{weatherData.name}</h2>
              <p>{weatherData.weather[0].description}</p>
              <p>Temperature: {weatherData.main.temp}°C</p>
              <p>Humidity: {weatherData.main.humidity}%</p>
              <p>Wind Speed: {weatherData.wind.speed} m/s</p>
            </div>
          )}
        </div>
      </div>
    </>
  );
}

export default App;
