import React, { useState, useEffect } from 'react';
import SensorCard from '../components/SensorCard';
import ChartPanel from '../components/ChartPanel';
import InsightsPanel from '../components/InsightsPanel';
import TopBar from '../components/TopBar';
import '../styles/dashboard.css';
import { useGetAirHumidity } from '../Hooks/useAirHumidity';
import { useGetAllTemperatures } from "../Hooks/useGetTemperature";
import { useGetSoilHumidity } from '../Hooks/useSoilHumidity';
import { useGetAllLightIntensities } from '../Hooks/useGetLightIntensity';

const delay = (ms) => new Promise(resolve => setTimeout(resolve, ms));
// dummy data kept here so if there's no data the app still loads
const mockSensorData = {
    temperature: { labels: ['00:00', '04:00', '08:00', '12:00', '16:00', '20:00'], values: [20, 22, 25, 28, 26, 23] },
    humidity: { labels: ['00:00', '04:00', '08:00', '12:00', '16:00', '20:00'], values: [60, 62, 65, 63, 68, 65] },
    light: { labels: ['00:00', '04:00', '08:00', '12:00', '16:00', '20:00'], values: [0, 100, 500, 800, 600, 200] },
    soilMoisture: { labels: ['00:00', '04:00', '08:00', '12:00', '16:00', '20:00'], values: [40, 38, 42, 45, 43, 41] }
};
// for managing dashboard data and UI

const Dashboard = () => {
    const [isOnline, setIsOnline] = useState(true);
    const [selectedPlant, setSelectedPlant] = useState({ id: 1, name: 'Tomato' });
    const [plantTypes, setPlantTypes] = useState([]);
    const [notifications, setNotifications] = useState([]);
    const [sensorData, setSensorData] = useState({});
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState(null);
    const [enlargedChart, setEnlargedChart] = useState(null);

    //  hooks for fetching sensor data
    const { data: airHumidityData } = useGetAirHumidity(selectedPlant.id);
    const { data: temperatureData, loading: temperatureLoading, error: temperatureError } = useGetAllTemperatures(selectedPlant.id);
    const { data: soilHumidityData, isLoading: soilHumidityLoading, error: soilHumidityError } = useGetSoilHumidity(selectedPlant.id);
    const { data: lightIntensityData, loading: lightIntensityLoading, error: lightIntensityError } = useGetAllLightIntensities(selectedPlant.id);

    // for fetching initial dashboard data
    useEffect(() => {
        const fetchInitialData = async () => {
            try {
                setIsLoading(true);
                const [plants, notifs] = await Promise.all([
                    fetchPlantTypes(),
                    fetchNotifications()
                ]);
                setPlantTypes(plants);
                setSelectedPlant(plants[0]);
                setNotifications(notifs);

                // Fetch sensor data for each type
                const types = ['temperature', 'humidity', 'light', 'soilMoisture'];
                const promises = types.map(type => fetchSensorData(type));
                const results = await Promise.all(promises);

                const structuredData = {};
                types.forEach((type, index) => structuredData[type] = results[index]);
                setSensorData(structuredData);
            } catch (err) {
                setError('Failed to load dashboard data. Please try again later.');
                setIsOnline(false);
            } finally {
                setIsLoading(false);
            }
        };
        fetchInitialData();
    }, []);
// for errors
    useEffect(() => {
        if (temperatureError) console.error('Temperature error:', temperatureError);
        if (lightIntensityError) console.error('Light error:', lightIntensityError);
        if (soilHumidityError) console.error('Soil error:', soilHumidityError);
        if (airHumidityData?.error) console.error('Air humidity error:', airHumidityData.error);
    }, [temperatureError, lightIntensityError, soilHumidityError, airHumidityData]);
// for irrigation control
    const handleIrrigationControl = async (activate) => {
        try {
            const res = await updateIrrigationStatus(activate);
            console.log(res.message);
        } catch (err) {
            console.error('Irrigation error:', err);
        }
    };
// for the chart data to enlarge
    const handleChartClick = (title) => {
        setEnlargedChart(enlargedChart === title ? null : title);
    };

    if (isLoading) return <div className="loading">Loading dashboard data...</div>;
    if (error) return <div className="error">{error}</div>;
// main dashboard stuff
    return (
        <div className="dashboard-container">
            <TopBar notifications={notifications} />
            <header className="dashboard-header">
                <h1>Welcome back</h1>
            </header>

            <div className="dashboard-content">
                <div className="connection-status">
                    Status: <span className={isOnline ? 'status-online' : 'status-offline'}>
                        {isOnline ? 'Online' : 'Offline'}
                    </span>
                </div>

                <div className="plant-type">
                    <label>Plant Type: </label>
                    <select value={selectedPlant.id} onChange={(e) => {
                        const plant = plantTypes.find(p => p.id === Number(e.target.value));
                        setSelectedPlant(plant);
                    }}>
                        {plantTypes.map(type => (
                            <option key={type.id} value={type.id}>{type.name}</option>
                        ))}
                    </select>
                </div>

                <div className="sensor-cards">
                    <SensorCard label="Temperature" value={`${temperatureData?.at(-1)?.temperature ?? 'N/A'}°C`} icon="🌡️" />
                    <SensorCard label="Light Intensity" value={`${lightIntensityData?.at(-1)?.value ?? 'N/A'} Lux`} icon="☀️" />
                    <SensorCard label="Air Humidity" value={`${airHumidityData?.apiData.at(-1)?.airHumidity ?? 'N/A'}%`} icon="💨" />
                    <SensorCard label="Soil Moisture" value={`${soilHumidityData?.at(-1)?.soilHumidity ?? 'N/A'}%`} icon="🌱" />
                    <SensorCard label="Water Pump Level" value="70%" icon="🚰" />
                </div>

                <div className="charts">
                    <ChartPanel
                        title={`Temperature (24h) - ${selectedPlant.name}`}
                        data={temperatureData ? {
                            labels: temperatureData.map(d => new Date(d.timestamp).toLocaleTimeString()),
                            values: temperatureData.map(d => d.temperature)
                        } : sensorData.temperature}
                        onClick={() => handleChartClick("Temperature (24h)")}
                        isEnlarged={enlargedChart === "Temperature (24h)"}
                    />
                    <ChartPanel
                        title={`Humidity (24h) - ${selectedPlant.name}`}
                        data={airHumidityData?.chartData || sensorData.humidity}
                        onClick={() => handleChartClick("Humidity (24h)")}
                        isEnlarged={enlargedChart === "Humidity (24h)"}
                    />
                    <ChartPanel
                        title={`Soil Moisture (24h) - ${selectedPlant.name}`}
                        data={soilHumidityData ? {
                            labels: soilHumidityData.map(d => new Date(d.timestamp).toLocaleTimeString()),
                            values: soilHumidityData.map(d => d.soilHumidity)
                        } : sensorData.soilMoisture}
                        onClick={() => handleChartClick("Soil Moisture (24h)")}
                        isEnlarged={enlargedChart === "Soil Moisture (24h)"}
                    />
                </div>

                <InsightsPanel />

                <div className="controls">
                    <h2>Irrigation Control</h2>
                    <button onClick={() => handleIrrigationControl(true)}>Activate Irrigation</button>
                    <button onClick={() => handleIrrigationControl(false)}>Deactivate Irrigation</button>
                </div>
            </div>

            {enlargedChart && (
                <div className="enlarged-chart-overlay">
                    <div className="enlarged-chart-container">
                        <button className="close-button" onClick={() => setEnlargedChart(null)}>Close</button>
                        <ChartPanel
                            title={enlargedChart}
                            data={getEnlargedChartData(enlargedChart, temperatureData, airHumidityData, soilHumidityData, lightIntensityData, sensorData)}
                            isEnlarged={true}
                        />
                    </div>
                </div>
            )}
        </div>
    );
};

// Helper functions could be moved later to separate files ?
const fetchPlantTypes = async () => {
    await delay(300);
    return [
        { id: 1, name: 'Tomato' },
        { id: 2, name: 'Bell Pepper' },
        { id: 3, name: 'Chestnut' },
    ];
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
    return { success: true, message: `Irrigation ${status ? 'activated' : 'deactivated'}` };
};
// to get data for the large chart
const getEnlargedChartData = (title, temperature, humidity, soil, light, fallback) => {
    switch (title) {
        case "Temperature (24h)":
            return temperature ? {
                labels: temperature.map(d => new Date(d.timestamp).toLocaleTimeString()),
                values: temperature.map(d => d.temperature)
            } : fallback.temperature;
        case "Humidity (24h)":
            return humidity?.chartData || fallback.humidity;
        case "Soil Moisture (24h)":
            return soil ? {
                labels: soil.map(d => new Date(d.timestamp).toLocaleTimeString()),
                values: soil.map(d => d.soilHumidity)
            } : fallback.soilMoisture;
        case "Light Intensity (24h)":
            return light ? {
                labels: light.map(d => new Date(d.timestamp).toLocaleTimeString()),
                values: light.map(d => d.value)
            } : fallback.light;
        default:
            return null;
    }
};

export default Dashboard;
