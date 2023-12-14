import Navbar from "./components/navbar";
import CurrentWeather from "./components/currentWeather";
import React, { useState } from "react";
import { weather_api_key, weather_api_url } from "./components/api";
import { geo_api_url, options } from "./components/api";

function App() {
  const [currentWeather, setCurrentWeather] = useState(null);
  const [forecast, setForecast] = useState(null);

  const handleOnSearchChange = (searchData) => {
    const [lat, lon, id] = searchData.value.split(" ");
    const currentWeatherFetch = fetch(
      `${weather_api_url}/weather?lat=${lat}&lon=${lon}&appid=${weather_api_key}&units=metric`
    );
    const forecastFetch = fetch(
      `${weather_api_url}/forecast?lat=${lat}&lon=${lon}&appid=${weather_api_key}&units=metric`
    );

    const dateTimeFetch = fetch(
      `${geo_api_url}/cities/${id}/dateTime?name=${searchData}`,
      options
    );

    Promise.all([currentWeatherFetch, forecastFetch, dateTimeFetch])
      .then(async (response) => {
        const weatherResponse = await response[0].json();
        const forecastResponse = await response[1].json();
        const dateTimeData = await response[2].json();

        setCurrentWeather({ city: searchData.label, dateTime: dateTimeData.data, ...weatherResponse });
        setForecast({ city: searchData.label, ...forecastResponse });
      })
      .catch((err) => console.log(err));
  };

  console.log(currentWeather);
  console.log(forecast);

  return (
    <div className="main">
      <div style={{ height: "56px", top: "0", left: "0" }}>
        <Navbar onSearchChange={handleOnSearchChange} />
      </div>
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
        }}
      >
        {currentWeather && <CurrentWeather data={currentWeather} />}
      </div>
    </div>
  );
}

export default App;
