import React, { useEffect, useState } from "react";
import axios from "axios";

const Weather = ({ city }) => {
    const [currentWeather, setCurrentWeather] = useState(null);
    const [forecast, setForecast] = useState([]);
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        if (city) {
            fetchWeatherData(city);
        }
    }, [city]);

    const fetchWeatherData = async (cityName) => {
        setLoading(true);
        try {
            const apiKey = "91b09cfb3070b88976c37e292b6f535f"; 
            const weatherResponse = await axios.get(
                `https://api.openweathermap.org/data/2.5/weather?q=${cityName}&appid=${apiKey}&units=metric`
            );
            const forecastResponse = await axios.get(
                `https://api.openweathermap.org/data/2.5/forecast?q=${cityName}&appid=${apiKey}&units=metric`
            );

            setCurrentWeather(weatherResponse.data);
            const dailyForecast = forecastResponse.data.list.filter((item, index) =>
                index % 8 === 0
            );
            setForecast(dailyForecast);
        } catch (error) {
            console.error("Error fetching weather data:", error);
        }
        setLoading(false);
    };

    return (
        <div>
            {loading && <p>Loading...</p>}
            {!loading && currentWeather && (
                <div className="current-weather card text-white bg-dark p-4">
                    <h2 className="text-center">{currentWeather.name}</h2>
                    <div className="weather-details text-center">
                        <img
                            src={`http://openweathermap.org/img/wn/${currentWeather.weather[0].icon}@2x.png`}
                            alt={currentWeather.weather[0].description}
                        />
                        <h3>{currentWeather.main.temp}°C</h3>
                        <p>{currentWeather.weather[0].description}</p>
                        <div className="weather-stats">
                            <p>Humidity: {currentWeather.main.humidity}%</p>
                            <p>Wind: {currentWeather.wind.speed} km/h</p>
                            <p>UV Index: 8 (Very High)</p>
                        </div>
                    </div>
                </div>
            )}
            <div className="forecast mt-4">
                <h3 className="text-center text-white">5-Day Forecast</h3>
                <div className="forecast-row d-flex justify-content-center">
                    {forecast.map((day, index) => (
                        <div key={index} className="forecast-card">
                            <div className="card bg-secondary text-white text-center p-2">
                                <h5>
                                    {new Date(day.dt * 1000).toLocaleDateString("en-US", {
                                        weekday: "short",
                                    })}
                                </h5>
                                <img
                                    src={`http://openweathermap.org/img/wn/${day.weather[0].icon}@2x.png`}
                                    alt={day.weather[0].description}
                                />
                                <p>{day.main.temp}°C</p>
                                <p>{day.weather[0].description}</p>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default Weather;
