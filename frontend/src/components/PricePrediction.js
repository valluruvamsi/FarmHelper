import React, { useEffect, useState, useRef } from 'react';
import { InputText } from 'primereact/inputtext';
import { Button } from "primereact/button";
import { Dropdown } from 'primereact/dropdown';
import { Calendar } from 'primereact/calendar';
import { Messages } from 'primereact/messages';

export const PricePrediction = () => {
    // State variables
    const [rainfall, setRainfall] = useState('');
    const [dropdownValue, setDropdownValue] = useState(null);
    const [calendarValue, setCalendarValue] = useState(null);

    const priceDisplayMessage = useRef();

    // Dropdown crop options
    const dropdownValues = [
        { name: 'Cotton' },
        { name: 'Coconut' },
        { name: 'Wheat' },
        { name: 'Maize' },
        { name: 'Jute' },
        { name: 'Moong' },
        { name: 'Black_Gram' }
    ];

    const onSubmitCropData = async () => {
        // Validate inputs
        if (!dropdownValue || !calendarValue || !rainfall) {
            priceDisplayMessage.current.show({
                severity: 'warn',
                summary: 'Incomplete data',
                detail: 'Please provide all the required inputs.',
                life: 3000
            });
            return;
        }

        // Prepare data for API
        const crop = dropdownValue.name.toLowerCase();
        const year = calendarValue.getFullYear();
        const month = calendarValue.getMonth() + 1; // Months are 0-indexed in JavaScript
        const cropData = { crop, month, year, rainfall };

        try {
            // Call the backend API
            const response = await fetch('http://localhost:5000/price', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(cropData),
            });

            if (!response.ok) {
                throw new Error('Failed to fetch price prediction.');
            }

            const data = await response.json();

            // Display the result
            if (data.price) {
                priceDisplayMessage.current.show({
                    severity: 'success',
                    summary: 'Prediction Success',
                    detail: `Predicted price: Rs ${data.price} per quintal.`,
                    life: 5000
                });
            } else {
                throw new Error(data.error || 'Unexpected response format.');
            }
        } catch (error) {
            // Display error message
            console.error('Error during price prediction:', error);
            priceDisplayMessage.current.show({
                severity: 'error',
                summary: 'Error',
                detail: 'Failed to fetch price prediction. Please try again.',
                life: 5000
            });
        }
    };

    return (
        <div className="grid p-fluid">
            <div className="col-12">
                <div className="card">
                    <h4>Price Prediction</h4>
                    <div className="grid p-fluid pt-4">

                        {/* Crop Dropdown */}
                        <div className="col-12 md:col-6">
                            <h5>Select the Crop</h5>
                            <Dropdown
                                value={dropdownValue}
                                onChange={(e) => setDropdownValue(e.value)}
                                options={dropdownValues}
                                optionLabel="name"
                                placeholder="Select Crop"
                            />
                        </div>

                        {/* Rainfall Input */}
                        <div className="col-12 md:col-6">
                            <h5>Rainfall</h5>
                            <div className="p-inputgroup">
                                <span className="p-inputgroup-addon">
                                    <i className="pi pi-cloud"></i>
                                </span>
                                <InputText
                                    placeholder="Rainfall (in mm)"
                                    value={rainfall}
                                    onChange={(e) => setRainfall(e.target.value)}
                                />
                            </div>
                        </div>

                        {/* Date Picker */}
                        <div className="col-12 md:col-6">
                            <h5>Date</h5>
                            <Calendar
                                showIcon
                                showButtonBar
                                value={calendarValue}
                                onChange={(e) => setCalendarValue(e.value)}
                            ></Calendar>
                        </div>

                    </div>
                    <div className="col-6 md:col-6 pt-4">
                        {/* Submit Button */}
                        <Button
                            label="Submit Data"
                            onClick={(e) => {
                                e.preventDefault();
                                onSubmitCropData();
                            }}
                            className="mr-2 mb-2"
                        />
                    </div>
                    {/* Message Display */}
                    <Messages ref={priceDisplayMessage} />
                </div>
            </div>
        </div>
    );
};
