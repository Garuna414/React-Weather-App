import React, { useState, useEffect } from "react";
import "../styles/currentWeather.css";
import "bootstrap/dist/css/bootstrap.css";

export default function CurrentWeather({ data }) {
  const [city, country] = data.city.split(",");

  const cityTime = data.time;

  const [time, setTime] = useState(cityTime.slice(0, 7));

  useEffect(() => {
    const intervalId = setInterval(() => {
      // Parse the time string and increment by 1 second
      const [hours, minutes, seconds] = time.split(":");
      const nextTime = new Date(2000, 0, 1, hours, minutes, parseInt(seconds, 10) + 1);
      
      // Format the updated time with leading zeros as needed
      const formattedTime = `${String(nextTime.getHours()).padStart(2, '0')}:${String(nextTime.getMinutes()).padStart(2, '0')}:${String(nextTime.getSeconds()).padStart(2, '0')}`;
      
      // Update the state with the formatted time
      setTime(formattedTime);
    }, 1000);

    // Clear the interval when the component is unmounted
    return () => clearInterval(intervalId);
  }, [time]);

  return (
    <div className="mainContainer">
      <div className="weather">
        <div className="upper">
          <div className="upperLeft">
            <div className="regionName">
              <p className="cityName">{city}</p>
              <p className="countryName">{country}</p>
              <div className="adjacentUpper">
                <p className="message">Sunny</p>
                <p className="time">{time && time.slice(0,5)}</p>
              </div>
              <p className="temp">22°C</p>
            </div>
          </div>
          <div className="upperRight">
            <img src="/icons/01d.png" alt="" className="weatherIcon" />
          </div>
        </div>
        <div className="lower">
          <div className="lowerLeft">
            <div className="adjacent">
              <p className="lowerText">Feels Like</p>
              <p className="lowerData">21°</p>
              <p className="lowerMetrics">C</p>
            </div>
            <div className="adjacent">
              <p className="lowerText">Humidity</p>
              <p className="lowerData">41</p>
              <p className="lowerMetrics">%</p>
            </div>
          </div>
          <div className="lowerRight">
            <div className="adjacent">
              <p className="lowerLeftText">Wind Speed</p>
              <p className="lowerData">161</p>
              <p className="lowerMetrics">Km/h</p>
            </div>
            <div className="adjacent">
              <p className="lowerLeftText">Pressure</p>
              <p className="lowerData">1.012</p>
              <p className="lowerMetrics">hPa</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
