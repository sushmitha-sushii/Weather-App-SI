import React, { useState } from "react";
import axios from "axios";
import WeatherCard from "./components/WeatherCard";
import { FaTimes } from "react-icons/fa"; // Import the cross icon
import './App.css';

const App = () => {
  const [city, setCity] = useState("");
  const [weather, setWeather] = useState(null);
  const [history, setHistory] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  const apiKey = "5213577a315d35d0e51c6443ae4bc8de";
  const apiUrl = "https://api.openweathermap.org/data/2.5/weather";

  const fetchWeather = async () => {
    if (!city.trim()) return;

    setIsLoading(true);
    try {
      const response = await axios.get(apiUrl, {
        params: {
          q: city,
          units: "metric",
          appid: apiKey,
        },
      });

      const data = response.data;
      setWeather({
        city: data.name,
        temp: data.main.temp,
        humidity: data.main.humidity,
        condition: data.weather[0].description,
      });

      setHistory((prevHistory) => [
        ...new Set([city, ...prevHistory]),
      ]);
    } catch (error) {
      console.error("Error fetching weather data:", error);
      alert("City not found or API limit exceeded!");
    } finally {
      setIsLoading(false);
    }
  };

  const clearHistory = () => {
    setHistory([]);
  };

  const removeFromHistory = (indexToRemove) => {
    setHistory((prevHistory) => prevHistory.filter((_, index) => index !== indexToRemove));
  };

  return (
    <div className="app">
      <div className="app-container">
        <h1 className="app-title">Weather App</h1>
        <div className="search-container">
          <input
            type="text"
            value={city}
            placeholder="Enter city"
            onChange={(e) => setCity(e.target.value)}
            className="search-input"
          />
          <button onClick={fetchWeather} className="search-button" disabled={isLoading}>
            {isLoading ? "Searching..." : "Search"}
          </button>
        </div>

        {weather && <WeatherCard weather={weather} />}

        {history.length > 0 && (
          <div className="history">
            <h2 className="history-title">Search History</h2>
            <ul className="history-list">
              {history.map((item, index) => (
                <li key={index} className="history-item">
                  <span onClick={() => setCity(item)}>{item}</span>
                  <button 
                    className="delete-item-btn"
                    onClick={() => removeFromHistory(index)}
                    aria-label={`Delete ${item} from history`}
                  >
                    <FaTimes />
                  </button>
                </li>
              ))}
            </ul>
            <button onClick={clearHistory} className="clear-history-btn">
              Clear History
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default App;

