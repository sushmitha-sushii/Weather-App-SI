import React from "react";
import { WiHumidity, WiThermometer } from "react-icons/wi";
import { BsCloudSun } from "react-icons/bs";

const WeatherCard = ({ weather }) => {
  return (
    <div className="weather-card">
      <h2 className="weather-city">{weather.city}</h2>
      <div className="weather-condition">
        <BsCloudSun className="weather-icon" />
        <p>{weather.condition}</p>
      </div>
      <div className="weather-details">
        <p className="weather-temp">
          <WiThermometer className="weather-icon" />
          {weather.temp.toFixed(1)}°C
        </p>
        <p className="weather-humidity">
          <WiHumidity className="weather-icon" />
          {weather.humidity}%
        </p>
      </div>
    </div>
  );
};

export default WeatherCard;

