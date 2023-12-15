import React, { useState, useEffect, useRef } from "react";
import "../styles/currentWeather.css";
import "bootstrap/dist/css/bootstrap.css";
import ForecastItem from "./forecastItem";

export default function CurrentWeather({ data }) {
  const [city, country] = data.city.split(",");
  const description = data.weather[0].description;
  const rawTimeFromApi = data.dateTime;

  const dateTimeFromApi = new Date(rawTimeFromApi.slice(0, 19) + "Z");
  const [dateTime, setDateTime] = useState(dateTimeFromApi);
  const [formattedDateTime, setFormattedDateTime] = useState(
    formatDateTime(dateTimeFromApi)
  );

  const latestDateTimeRef = useRef(dateTimeFromApi);

  useEffect(() => {
    // Update dateTimeFromApi and latestDateTimeRef on data update
    const rawTimeFromApi = data.dateTime;
    const newDateTimeFromApi = new Date(rawTimeFromApi.slice(0, 19) + "Z");
    setDateTime(newDateTimeFromApi);
    latestDateTimeRef.current = newDateTimeFromApi;

    // Clear the timer and set a new one based on new data
    clearInterval(timerIdRef.current);
    timerIdRef.current = setInterval(() => {
      const nextDateTime = new Date(latestDateTimeRef.current.getTime() + 1000);
      setDateTime(nextDateTime);
      setFormattedDateTime(formatDateTime(nextDateTime));
      latestDateTimeRef.current = nextDateTime;
    }, 1000);

    // Return cleanup function to clear the timer on unmount
    return () => clearInterval(timerIdRef.current);
  }, [data]);

  const timerIdRef = useRef(null); // Use a separate ref for the timer

  function formatDateTime(date) {
    return new Intl.DateTimeFormat("en-US", {
      year: "numeric",
      month: "2-digit",
      day: "2-digit",
      hour: "2-digit",
      minute: "2-digit",
      second: "2-digit",
      hour12: false,
      timeZone: "UTC",
    }).format(date);
  }


  return (
    <div>
      <div className="weather">
        <div className="upper">
          <div className="upperLeft">
            <div className="regionName">
              <p className="cityName">{city}</p>
              <p className="countryName">{country}</p>
              <div className="adjacentUpper">
                {/* <p className="message">{description[0].toUpperCase() + description.substring(1)}</p> */}
                <p className="time">
                  {formattedDateTime
                    .split(", ")[0]
                    .split("-")
                    .reverse()
                    .join("/")}
                </p>
              </div>
              <p className="temp">{Math.round(data.main.temp)}°C</p>
            </div>
          </div>
          <div className="upperRight">
            <img
              src={`/icons/${data.weather[0].icon}.png`}
              alt=""
              className="weatherIcon"
            />
            <p className="message">
              {formattedDateTime.split(" ")[1].slice(0, 5)}
            </p>
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

      {/* {forecastData.map((item, idx) => (
        <div key={idx}>
          <ForecastItem
            imgUrl={`/icons/${item.weather[0].icon}.png`} // Use item's icon
            date={item.dt_txt} // Use formatted date from item
            message={item.weather[0].description} // Use item's description
            min={Math.round(item.main.temp_min)} // Use item's min temperature
            max={Math.round(item.main.temp_max)} // Use item's max temperature
          />
        </div>
      ))} */}
      {/*
        <ForecastItem imgUrl = "/icons/01d.png" date = "Saturday" message = "Scattered clouds" min = "30" max = "20"/>
        <ForecastItem imgUrl = "/icons/01d.png" date = "Saturday" message = "Scattered clouds" min = "30" max = "20"/>
        <ForecastItem imgUrl = "/icons/01d.png" date = "Saturday" message = "Scattered clouds" min = "30" max = "20"/>
        <ForecastItem imgUrl = "/icons/01d.png" date = "Saturday" message = "Scattered clouds" min = "30" max = "20"/>
        <ForecastItem imgUrl = "/icons/01d.png" date = "Saturday" message = "Scattered clouds" min = "30" max = "20"/>
        <ForecastItem imgUrl = "/icons/01d.png" date = "Saturday" message = "Scattered clouds" min = "30" max = "20"/> */}
    </div>
  );
}
