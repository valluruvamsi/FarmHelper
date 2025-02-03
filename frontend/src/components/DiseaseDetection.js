import React, { useState } from 'react';
import axios from 'axios';

const DiseaseDetection = () => {
    const [selectedFile, setSelectedFile] = useState(null);
    const [result, setResult] = useState(null);
    const [error, setError] = useState(null);

    // Handle file selection
    const handleFileChange = (event) => {
        setSelectedFile(event.target.files[0]);
        setError(null); // Clear any previous errors
    };

    // Handle form submission and API call
    const handleSubmit = async (event) => {
        event.preventDefault();

        // Check if file is selected
        if (!selectedFile) {
            setError("Please select an image file.");
            return;
        }

        const formData = new FormData();
        formData.append('file', selectedFile);

        try {
            // Send POST request to backend API
            const response = await axios.post('http://localhost:5000/predict', formData, {
                headers: {
                    'Content-Type': 'multipart/form-data',
                },
            });

            console.log("API Response:", response.data);

            if (response.data.status === "success" && response.data.data) {
                // Extract data from API response
                const { disease, confidence, reference } = response.data.data;
                setResult({ disease, confidence, reference });
                setError(null); // Clear any errors
            } else {
                setError("Unexpected response format from the server.");
            }
        } catch (err) {
            console.error("Error during disease detection:", err);
            setError("Error detecting disease. Please try again.");
        }
    };

    return (
        <div style={{ padding: '20px', fontFamily: 'Arial, sans-serif' }}>
            <h2>Disease Detection</h2>

            <form onSubmit={handleSubmit}>
                <label>
                    <strong>Upload an image:</strong>
                    <input type="file" accept="image/*" onChange={handleFileChange} />
                </label>
                <button type="submit" style={{ marginLeft: '10px' }}>
                    Detect Disease
                </button>
            </form>

            {error && <p style={{ color: 'red', marginTop: '10px' }}>{error}</p>}

            {result && (
                <div style={{ marginTop: '20px' }}>
                    <h3>Detection Result:</h3>
                    <p><strong>Disease:</strong> {result.disease}</p>
                    <p><strong>Confidence:</strong> {result.confidence}</p>
                    <p>
                        <strong>Reference:</strong>{' '}
                        <a href={result.reference} target="_blank" rel="noopener noreferrer">
                            {result.reference}
                        </a>
                    </p>
                </div>
            )}
        </div>
    );
};

export default DiseaseDetection;
