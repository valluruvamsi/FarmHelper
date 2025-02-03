// Path: src/components/weatherService.js

import axios from 'axios';

const API_BASE_URL = 'https://api.openweathermap.org/data/2.5';  // Example base URL for OpenWeatherMap
const API_KEY = 'YOUR_OPENWEATHER_API_KEY';  // Replace with your actual API key

// Function to fetch current weather data based on location
export const getCurrentWeather = async (location) => {
    try {
        const response = await axios.get(`${API_BASE_URL}/weather`, {
            params: {
                q: location,
                appid: API_KEY,
                units: 'metric',  // For Celsius; use 'imperial' for Fahrenheit
            }
        });
        return response.data;
    } catch (error) {
        console.error('Error fetching current weather data:', error);
        throw error;
    }
};

// Function to fetch 7-day weather forecast based on location
export const getWeatherForecast = async (location) => {
    try {
        const response = await axios.get(`${API_BASE_URL}/forecast/daily`, {
            params: {
                q: location,
                cnt: 7,  // 7-day forecast
                appid: API_KEY,
                units: 'metric',
            }
        });
        return response.data;
    } catch (error) {
        console.error('Error fetching weather forecast:', error);
        throw error;
    }
};
