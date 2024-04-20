import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.bundle.min";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Navbar from "./components/navbar";
import CurrentWeather from "./components/currentWeather";
import React, { useState, useEffect } from "react";
import { weather_api_key, weather_api_url } from "./components/api";
import { geo_api_url, options } from "./components/api";
import ForecastItem from "./components/forecastItem";
import "./App.css";
import CurrentForecast from "./components/currentForecast";
import About from "./components/about";
import currentForecast from "./components/currentForecast";

function App() {
  const [currentWeather, setCurrentWeather] = useState(null);
  const [forecast, setForecast] = useState(null);


  useEffect(() => {
    // Function to fetch weather data for Navi Mumbai
    const fetchDefaultCityWeather = async () => {
      try {
        const defaultCityResponse = await fetch(
          `${weather_api_url}/weather?q=Navi%20Mumbai,IN&appid=${weather_api_key}&units=metric`
        );
        const defaultCityWeatherData = await defaultCityResponse.json();
        setCurrentWeather(defaultCityWeatherData);
        //console.log(currentWeather);
      } catch (error) {
        console.error("Error fetching default city weather:", error);
      }
    };

    // Function to fetch forecast data for Navi Mumbai
    const fetchDefaultCityForecast = async () => {
      try {
        const defaultCityForecastResponse = await fetch(
          `${weather_api_url}/forecast?q=Navi%20Mumbai,IN&appid=${weather_api_key}&units=metric`
        );
        const defaultCityForecastData = await defaultCityForecastResponse.json();
        setForecast(defaultCityForecastData);
        //console.log(forecast);
      } catch (error) {
        console.error("Error fetching default city forecast:", error);
      }
    };

    // Call the functions to fetch data for Navi Mumbai
    fetchDefaultCityWeather();
    fetchDefaultCityForecast();
  }, []);


  const handleOnSearchChange = (searchData) => {
    //console.log("Searched City is");
    //console.log(searchData);
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

        setCurrentWeather({
          city: searchData.label,
          dateTime: dateTimeData.data,
          ...weatherResponse,
        });
        setForecast({ city: searchData.label, ...forecastResponse });
      })
      .catch((err) => console.log(err));
  };

  // console.log(currentWeather);
  // console.log(forecast);

  return (
    <BrowserRouter /*basename="/React-Weather-App"*/>
      <div className="main">
        <div className="navigation">
          <Navbar onSearchChange={handleOnSearchChange} />
        </div>
        <div>
          <Routes>
            <Route exact path="/" element={<CurrentForecast  currentData={currentWeather} forecastData={forecast}/>}/>
            <Route exact path="/about" element={<About />} />
          </Routes>
        </div>
      </div>
    </BrowserRouter>
  );
}

export default App;
