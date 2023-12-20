import React from 'react'
import "../styles/about.css";

export default function about() {
  return (
    <div className="mainContainer">
      <h1 className="title">
        About WeatherUNA
      </h1>
      <p className="description">
        WeatherUNA is a react based weather app. Users can check out the current weather and forecasted weather of their cities. 
      </p>
      <h1 className="title">
        How to use?
      </h1>
      <p className="description">
        Users on mobile can tap the menu button on the top right to find a search box. Type the name of your desired city and select it from the dropdown. After selecting, the current and forecasted weather will be shown on the "Weather" page.
      </p>
    </div>
  );
}
