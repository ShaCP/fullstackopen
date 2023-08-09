import React, { useState, useEffect } from "react";
import axios from "axios";
// I'm caching the database results to avoid making additional requests since it's just a test app;
import { cacheData, getCachedData, isEmptyObj } from "../helpers";

const Weather = ({ weatherData }) => {
  const icon = `http://openweathermap.org/img/wn/${weatherData?.weather?.[0].icon}@2x.png`;

  return (
    <div>
      <h3>Weather in {weatherData?.name}</h3>
      <div className="weather_data">
        <span className="data_type">Temperature: </span>
        {weatherData?.main?.temp} °C
      </div>
      <img
        className="weather_data"
        alt={`${weatherData?.weather?.[0].description} forecast`}
        src={icon}
      ></img>
      <div className="weather_data">
        <span className="data_type">Wind: </span>
        {weatherData?.wind?.speed} mph - direction {weatherData?.wind?.deg}°
      </div>
    </div>
  );
};

const baseWeatherApiUrl = (lat, lon) =>
  `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${process.env.REACT_APP_API_KEY}&units=metric`;

const Country = ({
  country: {
    name: { common: name },
    capital,
    population,
    languages,
    flags,
    latlng: [lat, lon]
  },
  isOnlyResult
}) => {
  const weatherApiUrl = `${baseWeatherApiUrl(lat, lon)}`;
  const [showData, setShowData] = useState(false);
  const [weatherData, setWeatherData] = useState(
    getCachedData(weatherApiUrl) || {}
  );

  const expand = showData || isOnlyResult;

  useEffect(() => {
    if (expand && isEmptyObj(weatherData)) {
      axios.get(weatherApiUrl).then(({ data }) => {
        setWeatherData(data);
        cacheData(data, weatherApiUrl);
      });
    }
  }, [expand, weatherData, weatherApiUrl]);

  return (
    <div className={`country ${expand ? "expanded" : ""}`.trim()}>
      {expand ? (
        <>
          <h2>
            {name}{" "}
            {!isOnlyResult && (
              <button onClick={() => setShowData(false)}>hide</button>
            )}
          </h2>
          <div>
            <span className="data_type">Capital:</span> {capital[0]}
          </div>
          <div>
            <span className="data_type">Population:</span>{" "}
            {Number(population).toLocaleString()}
          </div>
          <h3>Spoken languages</h3>
          <ul>
            {Object.values(languages).map((lang) => (
              <li key={lang}>{lang}</li>
            ))}
          </ul>
          <img className="flag" src={flags.svg} alt={`${flags.alt}`} />
          <Weather weatherData={weatherData} />
        </>
      ) : (
        <>
          {name} <button onClick={() => setShowData(true)}>show</button>
        </>
      )}
    </div>
  );
};

export const Countries = ({ countries, filter }) => {
  const filteredCountries = filter
    ? countries.filter((country) =>
        country.name.common.toLowerCase().includes(filter.toLowerCase())
      )
    : [];

  const showCountries = filteredCountries.length < 10;

  if (!showCountries) {
    return (
      <div className="countries">Too many matches, specify another filter</div>
    );
  }

  return (
    !!filteredCountries.length && (
      <div className="countries">
        {filteredCountries.map((country) => (
          <Country
            country={country}
            isOnlyResult={filteredCountries.length === 1}
            key={country.name.common}
          />
        ))}
      </div>
    )
  );
};

export default Countries;
