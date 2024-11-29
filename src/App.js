import React, { useState } from "react";
import Weather from "./components/Weather";

function App() {
    const [city, setCity] = useState("Toronto");
    const [searchCity, setSearchCity] = useState("Toronto"); 

    const handleSearch = () => {
        setSearchCity(city); 
    };

    return (
        <div className="weather-container">
            <h1>Weather App</h1>
            <div className="searcher">
                <input
                    type="text"
                    placeholder="Enter city name"
                    className="form-control search-input"
                    value={city}
                    onChange={(e) => setCity(e.target.value)} 
                />
                <button
                    className="btn btn-primary mt-2"
                    onClick={handleSearch} 
                >
                    Search
                </button>
            </div>
            <Weather city={searchCity} />
        </div>
    );
}

export default App;
