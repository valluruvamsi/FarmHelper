
import axios from 'axios';

const getYieldPrediction = async () => {
    try {
        const response = await axios.get('/api/yield-prediction'); // Ensure the backend route matches
        return response.data;
    } catch (error) {
        console.error('Error fetching yield prediction:', error);
        throw error;
    }
};

export default { getYieldPrediction };
