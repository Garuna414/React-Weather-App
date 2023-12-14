import React, { useState, useEffect } from "react";
import "../styles/currentWeather.css";
import "bootstrap/dist/css/bootstrap.css";

export default function CurrentWeather({ data }) {
  const [city, country] = data.city.split(",");
  const description = data.weather[0].description;
  // const rawTimeFromApi = data.dateTime;

  // const fullDateTimeFromApi = new Date(data.dateTime.slice(0, 19));

  const dateTimeFromApi = new Date(data.dateTime.slice(0, 19) + 'Z'); // Append 'Z' to indicate UTC
  const [dateTime, setDateTime] = useState(dateTimeFromApi);
  
  useEffect(() => {
    const intervalId = setInterval(() => {
      // Increment the time by 1 second
      const nextDateTime = new Date(dateTime.getTime() + 1000);
      setDateTime(nextDateTime);
    }, 1000);
  
    // Clear the interval when the component is unmounted
    return () => clearInterval(intervalId);
  }, [dateTime]);
  
  const formattedDateTime = dateTime.toISOString().slice(0, 19).replace("T", " ");
  

  return (
    <div className="mainContainer">
      <div className="weather">
        <div className="upper">
          <div className="upperLeft">
            <div className="regionName">
              <p className="cityName">{city}</p>
              <p className="countryName">{country}</p>
              <div className="adjacentUpper">
                {/* <p className="message">{description[0].toUpperCase() + description.substring(1)}</p> */}
                <p className="time">{formattedDateTime.split(" ")[0].split("-").reverse().join("/")}</p>
              </div>
              <p className="temp">{Math.round(data.main.temp)}°C</p>
            </div>
          </div>
          <div className="upperRight">
            <img src={`/icons/${data.weather[0].icon}.png`} alt="" className="weatherIcon" />
            <p className="message">{formattedDateTime.split(" ")[1].slice(0, 5)}</p>
            <p className="message">{description.toUpperCase()}</p>

          </div>
        </div>
        <div className="lower">
          <div className="lowerLeft">
            <div className="adjacent">
              <p className="lowerText">Feels Like</p>
              <p className="lowerData">{Math.round(data.main.feels_like)}°</p>
              <p className="lowerMetrics">C</p>
            </div>
            <div className="adjacent">
              <p className="lowerText">Humidity</p>
              <p className="lowerData">{data.main.humidity}</p>
              <p className="lowerMetrics">%</p>
            </div>
          </div>
          <div className="lowerRight">
            <div className="adjacent">
              <p className="lowerLeftText">Wind Speed</p>
              <p className="lowerData">{Math.round(data.wind.speed)}</p>
              <p className="lowerMetrics">m/s</p>
            </div>
            <div className="adjacent">
              <p className="lowerLeftText">Pressure</p>
              <p className="lowerData">{data.main.pressure}</p>
              <p className="lowerMetrics">hPa</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
