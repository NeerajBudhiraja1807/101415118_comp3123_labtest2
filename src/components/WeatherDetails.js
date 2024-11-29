import React from "react";

const WeatherDetails = ({ weather }) => {
    const { name, main, weather: weatherInfo } = weather;
    const iconUrl = `http://openweathermap.org/img/wn/${weatherInfo[0].icon}@2x.png`;

    return (
        <div style={{ margin: "20px", padding: "10px", border: "1px solid #ccc" }}>
            <h2>{name}</h2>
            <img src={iconUrl} alt={weatherInfo[0].description} />
            <p>Temperature: {main.temp}°C</p>
            <p>Condition: {weatherInfo[0].description}</p>
        </div>
    );
};

export default WeatherDetails;
