import React, { useState, useEffect } from 'react';
import SensorCard from '../components/SensorCard';
import ChartPanel from '../components/ChartPanel';
import InsightsPanel from '../components/InsightsPanel';
import TopBar from '../components/TopBar';
import '../styles/dashboard.css';
import axios from 'axios';
import {useGetAllTemperatures} from "../Hooks/useGetTemperature.jsx";


// Mock data and utility functions
const delay = (ms) => new Promise(resolve => setTimeout(resolve, ms));

const mockSensorData = {
    temperature: {
        labels: ['00:00', '04:00', '08:00', '12:00', '16:00', '20:00'],
        values: [20, 22, 25, 28, 26, 23]
    },
    humidity: {
        labels: ['00:00', '04:00', '08:00', '12:00', '16:00', '20:00'],
        values: [60, 62, 65, 63, 68, 65]
    },
    light: {
        labels: ['00:00', '04:00', '08:00', '12:00', '16:00', '20:00'],
        values: [0, 100, 500, 800, 600, 200]
    },
    soilMoisture: {
        labels: ['00:00', '04:00', '08:00', '12:00', '16:00', '20:00'],
        values: [40, 38, 42, 45, 43, 41]
    }
};

export default function Dashboard() {
    const [isOnline, setIsOnline] = useState(true);
    const [plantType, setPlantType] = useState('Bell Pepper');
    const [plantTypes, setPlantTypes] = useState([]);
    const [notifications, setNotifications] = useState([]);
    const [sensorData, setSensorData] = useState({});
    const [error, setError] = useState(null);
    const [isLoading, setIsLoading] = useState(true);

    const {data, loading} = useGetAllTemperatures();
    console.log(useGetAllTemperatures());


    // Mock API calls
    const fetchPlantTypes = async () => {
        await delay(300);
        return ['Tomato', 'Bell Pepper', 'Chestnut'];
    };

    const fetchNotifications = async () => {
        await delay(400);
        return [
            { id: 1, message: "Water pump level low. Refill soon." },
            { id: 2, message: "Optimal conditions maintained for the last 24 hours." }
        ];
    };

    const fetchSensorData = async (type) => {
        await delay(500);
        return mockSensorData[type] || null;
    };

    const updateIrrigationStatus = async (status) => {
        await delay(200);
        console.log(Irrigation status updated to: ${status});
        return { success: true, message: Irrigation ${status ? 'activated' : 'deactivated'} };
    };



    if (error) {
        return <div className="error">{error}</div>;
    }

    const handleIrrigationControl = async (activate) => {
        try {
            const result = await updateIrrigationStatus(activate);
            console.log(result.message);
            // You might want to update some state here or show a notification
        } catch (error) {
            console.error('Error updating irrigation status:', error);
        }
    };

    return (
        <div className="dashboard-container">
            <TopBar notifications={notifications} />
            <header className="dashboard-header">
                <h1>PlaceHolder</h1>
                <p>Greenhouse Monitoring Dashboard</p>
                {(loading) ? (<p>Loading</p>) : (data.map((measurement) => (
          <li key={measurement.id}>
            <strong>Temperature:</strong> {measurement.temperature}°C |{' '}
            <strong>Humidity:</strong> {measurement.humidity}% |{' '}
            <strong>Timestamp:</strong> {new Date(measurement.timestamp).toLocaleString()}
          </li>
        )))}
                </header>
        </div>
    );
}
