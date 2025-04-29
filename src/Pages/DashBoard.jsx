import React, { useState, useEffect } from 'react';
import SensorCard from '../components/SensorCard';
import ChartPanel from '../components/ChartPanel';
import InsightsPanel from '../components/InsightsPanel';
import TopBar from '../components/TopBar';
import '../styles/dashboard.css';
import { useQuery } from '@tanstack/react-query';
import axios from '../../shared/axios';

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

const getAllTemperatures = async () => {
  const url = `/api/temperature`;
  const response = await axios.get(url);
  return response.data;
};

export default function Dashboard() {
    const [isOnline, setIsOnline] = useState(true);
    const [plantType, setPlantType] = useState('Bell Pepper');
    const [plantTypes, setPlantTypes] = useState([]);
    const [notifications, setNotifications] = useState([]);
    const [sensorData, setSensorData] = useState({});
    const [error, setError] = useState(null);

    // Use useQuery directly in the component
    const { data: temperatureData, isLoading: temperatureLoading, error: temperatureError } = useQuery(
        ['getAllTemperatures'],
        getAllTemperatures
    );

    // Mock API calls for now until just to see the dashboard in action
    const fetchPlantTypes = async () => {
        await delay(300);
        return ['Tomato', 'Bell Pepper', 'Chestnut'];
    };

    const fetchNotifications = async () => {
        await delay(400);
        return [
            { id: 1, message: "Water pump level low. Refill soon." },
            { id: 2, message: "Optimal conditions maintained for the last 24 hours." } // this is just a mock  for the modal , real data would come from API call
        ];
    };

    const fetchSensorData = async (type) => {
        await delay(500);
        return mockSensorData[type] || null;
    };

    const updateIrrigationStatus = async (status) => {
        await delay(200);
        console.log(`Irrigation status updated to: ${status}`);
        return { success: true, message: `Irrigation ${status ? 'activated' : 'deactivated'}` };
    };

    useEffect(() => {
        const fetchInitialData = async () => {
            setError(null);
            try {
                const [plantTypesData, notificationsData] = await Promise.all([
                    fetchPlantTypes(),
                    fetchNotifications()
                ]);
                setPlantTypes(plantTypesData);
                setNotifications(notificationsData);

                // We'll update temperature data separately using the useGetAllTemperatures hook
                const sensorTypes = ['humidity', 'light', 'soilMoisture'];
                const sensorDataPromises = sensorTypes.map(type => fetchSensorData(type));
                const sensorDataResults = await Promise.all(sensorDataPromises);
                
                const newSensorData = {};
                sensorTypes.forEach((type, index) => {
                    newSensorData[type] = sensorDataResults[index];
                });
                setSensorData(newSensorData);
            } catch (error) {
                console.error('Error fetching initial data:', error);
                setError('Failed to load dashboard data. Please try again later.');
                setIsOnline(false);
            }
        };

        fetchInitialData();
    }, []);

    // Update sensorData when temperatureData changes
    useEffect(() => {
        if (temperatureData) {
            setSensorData(prevData => ({
                ...prevData,
                temperature: {
                    labels: temperatureData.map(t => t.timestamp), // Adjust based on your API response structure
                    values: temperatureData.map(t => t.value)
                }
            }));
        }
    }, [temperatureData]);

    if (temperatureLoading) {
        return <div className="loading">Loading dashboard data...</div>;
    }

    if (error || temperatureError) {
        return <div className="error">{error || temperatureError.message}</div>;
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
            </header>
            <div className="dashboard-content">
                <div className="connection-status">
                    Status: <span className={isOnline ? 'status-online' : 'status-offline'}>
                        {isOnline ? 'Online' : 'Offline'}
                    </span>
                </div>
                <div className="plant-type">
                    <label>Plant Type: </label>
                    <select value={plantType} onChange={(e) => setPlantType(e.target.value)}>
                        {plantTypes.map(type => (
                            <option key={type} value={type}>{type}</option>
                        ))}
                    </select>
                </div>
                <div className="sensor-cards">
                    <SensorCard label="Temperature" value={`${sensorData.temperature?.values.slice(-1)[0] || 'N/A'}°C`} icon="🌡️" />
                    <SensorCard label="Light Intensity" value={`${sensorData.light?.values.slice(-1)[0] || 'N/A'} Lux`} icon="☀️" />
                    <SensorCard label="Air Humidity" value={`${sensorData.humidity?.values.slice(-1)[0] || 'N/A'}%`} icon="💨" />
                    <SensorCard label="Soil Moisture" value={`${sensorData.soilMoisture?.values.slice(-1)[0] || 'N/A'}%`} icon="🌱" />
                    <SensorCard label="Water Pump Level" value="70%" icon="🚰" />
                </div>

                <div className="charts">
                    <ChartPanel title="Temperature (24h)" data={sensorData.temperature} />
                    <ChartPanel title="Humidity (24h)" data={sensorData.humidity} />
                </div>

                <InsightsPanel />

                <div className="controls">
                    <h2>Irrigation Control</h2>
                    <button onClick={() => handleIrrigationControl(true)}>Activate Irrigation</button>
                    <button onClick={() => handleIrrigationControl(false)}>Deactivate Irrigation</button>
                </div>
            </div>
        </div>
    );
}