import React from "react";
import "../styles/forecastItem.css";

export default function forecastItem({ data }) {
  console.log(data);
  return (
    <div className="forecast">
      <p className="cityName">Forecast</p>
      <div className="itemBox">
        {data.list.slice(0, 11).map((item, idx) => {
          return (
            <div className="forecastItem" key={idx}>
              <div className="imgDay">
                <div>
                  <img
                    src={`/React-Weather-App/icons/${item.weather[0].icon}.png`}
                    alt=""
                    className="forecastImg"
                  />
                </div>
                <div>
                  <p className="dayName">
                    {item.dt_txt
                      .split(" ")[0]
                      .split("-")
                      .reverse()
                      .join("/")
                      .slice(0, 5)}{" "}
                    {item.dt_txt.split(" ")[1].slice(0, 5)}
                  </p>
                </div>
              </div>
              <p className="desc">
                {item.weather[0].description[0].toUpperCase(0)}
                {item.weather[0].description.substring(1)}
              </p>
              <div>
                <p className="minmax">
                  {Math.round(item.main.temp_max)}°C/{" "}
                  {Math.round(item.main.temp_min)}°C
                </p>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
