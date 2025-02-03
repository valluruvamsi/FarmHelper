import React, { useState } from 'react';
import { InputText } from 'primereact/inputtext';
import { Button } from 'primereact/button';
import { Messages } from 'primereact/messages';
import { Dropdown } from 'primereact/dropdown';

export const YieldPrediction = () => {
    const [formData, setFormData] = useState({
        Year: '',
        average_rain_fall_mm_per_year: '',
        pesticides_tonnes: '',
        avg_temp: '',
        Area: '',
        Item: null,
    });
    const [prediction, setPrediction] = useState(null);
    const [error, setError] = useState(null);

    const messageRef = React.useRef(null);

    const cropItems = [
        { label: 'Wheat', value: 'Wheat' },
        { label: 'Rice', value: 'Rice' },
        { label: 'Corn', value: 'Corn' },
        { label: 'Barley', value: 'Barley' },
        { label: 'Soybeans', value: 'Soybeans' },
        { label: 'Potatoes', value: 'Potatoes' },
    ];

    const handleChange = (e, name) => {
        setFormData({
            ...formData,
            [name]: e.target ? e.target.value : e.value,
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await fetch('http://127.0.0.1:5020/predict', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(formData),
            });
            if (response.ok) {
                const data = await response.json();
                setPrediction(data.prediction);
                messageRef.current.show({
                    severity: 'success',
                    summary: 'Prediction Successful',
                    detail: `Predicted Yield: ${data.prediction} tons per hectare`,
                    life: 5000,
                });
                setError(null);
            } else {
                throw new Error('Prediction failed.');
            }
        } catch (err) {
            console.error(err);
            setPrediction(null);
            setError('Failed to fetch yield prediction. Please check your input and try again.');
            messageRef.current.show({
                severity: 'error',
                summary: 'Prediction Failed',
                detail: 'Error fetching yield prediction.',
                life: 5000,
            });
        }
    };

    return (
        <div className="grid p-fluid mt-5">
            <div className="col-12">
                <div className="card">
                    <h2 className="text-center" style={{ color: '#5cb85c' }}>
                        Yield Prediction
                    </h2>
                    <form onSubmit={handleSubmit} className="p-fluid grid">
                        <div className="col-12 md:col-6">
                            <h5>Year</h5>
                            <InputText
                                value={formData.Year}
                                onChange={(e) => handleChange(e, 'Year')}
                                placeholder="Enter Year"
                                type="number"
                                required
                            />
                        </div>
                        <div className="col-12 md:col-6">
                            <h5>Average Rainfall (mm/year)</h5>
                            <InputText
                                value={formData.average_rain_fall_mm_per_year}
                                onChange={(e) => handleChange(e, 'average_rain_fall_mm_per_year')}
                                placeholder="Enter Average Rainfall"
                                type="number"
                                required
                            />
                        </div>
                        <div className="col-12 md:col-6">
                            <h5>Pesticides (tonnes)</h5>
                            <InputText
                                value={formData.pesticides_tonnes}
                                onChange={(e) => handleChange(e, 'pesticides_tonnes')}
                                placeholder="Enter Pesticides Usage"
                                type="number"
                                required
                            />
                        </div>
                        <div className="col-12 md:col-6">
                            <h5>Average Temperature (°C)</h5>
                            <InputText
                                value={formData.avg_temp}
                                onChange={(e) => handleChange(e, 'avg_temp')}
                                placeholder="Enter Average Temperature"
                                type="number"
                                required
                            />
                        </div>
                        <div className="col-12 md:col-6">
                            <h5>Area</h5>
                            <InputText
                                value={formData.Area}
                                onChange={(e) => handleChange(e, 'Area')}
                                placeholder="Enter Area Name"
                                required
                            />
                        </div>
                        <div className="col-12 md:col-6">
                            <h5>Item</h5>
                            <Dropdown
                                value={formData.Item}
                                options={cropItems}
                                onChange={(e) => handleChange(e, 'Item')}
                                placeholder="Select Crop"
                                required
                            />
                        </div>
                        <div className="col-12 mt-4">
                            <Button type="submit" label="Predict Yield" className="p-button-success w-100" />
                        </div>
                    </form>
                    <Messages ref={messageRef} />
                    {error && (
                        <div className="alert alert-danger mt-4 text-center">
                            <p>{error}</p>
                        </div>
                    )}
                    {prediction && (
                        <div className="alert alert-success mt-4 text-center">
                            <h4>Predicted Yield:</h4>
                            <p><strong>{prediction} tons per hectare</strong></p>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
};

export default YieldPrediction;
