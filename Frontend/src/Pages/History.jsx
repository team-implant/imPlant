import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import ChartPanel from '../components/ChartPanel';
import '../styles/History.css';
import TopBar from '../components/TopBar';

export default function History() {
    const [notifications, setNotifications] = useState([]);
    const [startDate, setStartDate] = useState('');
    const [endDate, setEndDate] = useState('');

    // Sample Data to be handled by the backend
    const temperatureData = {
        labels: ['Day 1', 'Day 2', 'Day 3', 'Day 4', 'Day 5', 'Day 6', 'Day 7'],
        values: [22, 23, 25, 24, 26, 25, 23]
    };

    const lightIntensityData = {
        labels: ['Day 1', 'Day 2', 'Day 3', 'Day 4', 'Day 5', 'Day 6', 'Day 7'],
        values: [300, 320, 310, 330, 315, 325, 320]
    };

    const airHumidityData = {
        labels: ['Day 1', 'Day 2', 'Day 3', 'Day 4', 'Day 5', 'Day 6', 'Day 7'],
        values: [60, 62, 61, 63, 62, 64, 63]
    };

    const soilMoistureData = {
        labels: ['Day 1', 'Day 2', 'Day 3', 'Day 4', 'Day 5', 'Day 6', 'Day 7'],
        values: [40, 42, 41, 43, 42, 44, 43]
    };

    const handleApply = () => {
        // Here you would typically fetch data based on the date range
        console.log(`Fetching data from ${startDate} to ${endDate}`);
    };

    return (
        <div className="page">
            <TopBar notifications={notifications} />
            <div className="history-content">
                <h1>Sensor Data History</h1>
                
                <div className="date-picker">
                    <label>Select Date Range:</label>
                    <input 
                        type="date" 
                        value={startDate} 
                        onChange={(e) => setStartDate(e.target.value)} 
                    /> to 
                    <input 
                        type="date" 
                        value={endDate} 
                        onChange={(e) => setEndDate(e.target.value)} 
                    />
                    <button onClick={handleApply}>Apply</button>
                </div>

                <div className="charts">
                    <ChartPanel title="Measurement " data={temperatureData} />
                    <ChartPanel title="Light Intensity " data={lightIntensityData} />
                    <ChartPanel title="Air Humidity" data={airHumidityData} />
                    <ChartPanel title="Soil Moisture " data={soilMoistureData} />
                </div>
            </div>
        </div>
    );
}