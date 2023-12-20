import React from 'react'
import CurrentWeather from './currentWeather'
import ForecastItem from './forecastItem'
import "../styles/currentWeather.css";
import "../styles/forecastItem.css";

export default function currentForecast({ currentData, forecastData}) {
  console.log(currentData);
  console.log(forecastData);
  return (
    <div className="infoContainer">
    <div className="weatherContainer">
      {currentData && <CurrentWeather data={currentData} />}
    </div>
    <div className="forecastContainer">
      {forecastData && <ForecastItem data={forecastData} />}
    </div>
  </div>
  )
}
