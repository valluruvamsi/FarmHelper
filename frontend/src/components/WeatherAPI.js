// Path: src/components/WeatherAPI.js

import React, { useEffect, useState } from 'react';
import { getCurrentWeather, getWeatherForecast } from './weatherService';

const WeatherAPI = ({ location = 'Hyderabad' }) => {
    const [currentWeather, setCurrentWeather] = useState(null);
    const [forecast, setForecast] = useState(null);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchWeatherData = async () => {
            try {
                const current = await getCurrentWeather(location);
                const forecastData = await getWeatherForecast(location);
                setCurrentWeather(current);
                setForecast(forecastData);
            } catch (error) {
                setError('Error fetching weather data');
            }
        };
        fetchWeatherData();
    }, [location]);

    return (
        <div>
            <h2>Weather for {location}</h2>
            {error ? (
                <p>{error}</p>
            ) : (
                <>
                    {currentWeather && (
                        <div>
                            <p>Temperature: {currentWeather.main.temp}°C</p>
                            <p>Condition: {currentWeather.weather[0].description}</p>
                        </div>
                    )}
                    {forecast && (
                        <div>
                            <h3>7-Day Forecast</h3>
                            {forecast.list.map((day, index) => (
                                <div key={index}>
                                    <p>Day {index + 1}: {day.temp.day}°C - {day.weather[0].description}</p>
                                </div>
                            ))}
                        </div>
                    )}
                </>
            )}
        </div>
    );
};

export default WeatherAPI;
