// Path: src/service/WeeklyService.js

import axios from 'axios';

// Function to fetch weekly data for a specific crop
const getWeeklyData = async (crop) => {
    try {
        const response = await axios.get(`/api/weekly-data?crop=${crop}`);
        return response.data;
    } catch (error) {
        console.error('Error fetching weekly crop data:', error);
        throw error;
    }
};

export default { getWeeklyData };
