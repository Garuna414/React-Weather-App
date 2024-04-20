import React, { useState, useEffect, useRef } from "react";
import "../styles/currentWeather.css";
import "bootstrap/dist/css/bootstrap.css";

export default function CurrentWeather({ data }) {
  const [city, country] = data.city.split(",");
  const description = data.weather[0].description;
  const [dateTimeFromApi, setDateTimeFromApi] = useState(null);
  const [formattedDateTime, setFormattedDateTime] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const latestDateTimeRef = useRef(0);
  const timerIdRef = useRef(null);

  function formatDateTime(date) {
    return new Intl.DateTimeFormat("en-GB", {
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

  useEffect(() => {
    setIsLoading(true);
  
    const rawTimeFromApi = data.dateTime;
    if (rawTimeFromApi) {
      const newDateTimeFromApi = new Date(rawTimeFromApi.slice(0, 19) + "Z");
      setDateTimeFromApi(newDateTimeFromApi);
      latestDateTimeRef.current = newDateTimeFromApi.getTime();
  
      // Clear previous interval (if any)
      clearInterval(timerIdRef.current);
  
      const timerId = setInterval(() => {
        const nextDateTime = new Date(latestDateTimeRef.current + 1000);
        setDateTimeFromApi(nextDateTime);
        setFormattedDateTime(formatDateTime(nextDateTime));
        latestDateTimeRef.current = nextDateTime.getTime();
      }, 1000);
  
      timerIdRef.current = timerId;
      setIsLoading(false);
    }
  
    // Cleanup previous interval when the component unmounts or when data changes
    return () => clearInterval(timerIdRef.current);
  }, [data]);


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
            {formattedDateTime && (
              <p className="message">
                {formattedDateTime.split(" ")[1].slice(0, 5)}
              </p>
            )}
            <p className="message" style={{ textAlign: "center" }}>
              {description.toUpperCase()}
            </p>
          </div>
        </div>
        <div className="lower">
          <div className="lowerLeft">
            <div className="adjacent">
              <p className="lowerText">Feels Like</p>
              <p className="lowerData">{Math.round(data.main.feels_like)}°C</p>
            </div>
            <div className="adjacent">
              <p className="lowerText">Humidity</p>
              <p className="lowerData">{data.main.humidity}%</p>
            </div>
          </div>
          <div className="lowerRight">
            <div className="adjacent">
              <p className="lowerLeftText">Wind Speed</p>
              <p className="lowerData">{Math.round(data.wind.speed)}m/s</p>
            </div>
            <div className="adjacent">
              <p className="lowerLeftText">Pressure</p>
              <p className="lowerData">{data.main.pressure}hPa</p>
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
