import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.bundle.min";
import React, { useState } from "react";
import { AsyncPaginate } from "react-select-async-paginate";
import { options, geo_api_url } from "./api.jsx";
import "../styles/navbar.css";
import { NavLink } from "react-router-dom";


export default function Navbar({ onSearchChange }) {
  const [search, setSearch] = useState(null);

  const handleOnChange = (searchData) => {
    setSearch(searchData);
    onSearchChange(searchData);
  };

  const loadOptions = async (inputValue) => {
    return fetch(
      `${geo_api_url}/cities?minPopulation=100000&namePrefix=${inputValue}`,
      options
    )
      .then((response) => response.json())
      .then((response) => {
        return {
          options: response.data.map((city) => {
            return {
              value: `${city.latitude} ${city.longitude} ${city.id}`,
              label: `${city.name}, ${city.country}`,
            };
          }),
        };
      });
  };

  return (
    <>
      <nav className="navbar navbar-expand-lg bg-body-tertiary">
        <div className="container-fluid">
          <NavLink className="navbar-brand" to="/">
            WeatherUNA
          </NavLink>
          <button
            className="navbar-toggler"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#navbarSupportedContent"
            aria-controls="navbarSupportedContent"
            aria-expanded="false"
            aria-label="Toggle navigation"
          >
            <span className="navbar-toggler-icon"></span>
          </button>
          <div className="collapse navbar-collapse" id="navbarSupportedContent">
          <ul className="navbar-nav me-auto mb-2 mb-lg-0">
              <li className="nav-item mx-1">
                <NavLink className="nav-link active" aria-current="page" to="/">
                  Weather
                </NavLink>
              </li>
              <li className="nav-item mx-1">
                <NavLink className="nav-link active" to="/about">
                  About
                </NavLink>
              </li>
            </ul>
            <AsyncPaginate
              placeholder="Enter City"
              debounceTimeout={600}
              value={search}
              onChange={handleOnChange}
              loadOptions={loadOptions}
              className="search"
            />
          </div>
        </div>
      </nav>
    </>
  );
}
