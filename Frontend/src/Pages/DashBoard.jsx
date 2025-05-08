import React, {useState, useEffect} from 'react';
import SensorCard from '../components/SensorCard';
import ChartPanel from '../components/ChartPanel';
import InsightsPanel from '../components/InsightsPanel';
import TopBar from '../components/TopBar';
import '../styles/dashboard.css';
import {useGetAirHumidity} from '../Hooks/useAirHumidity';
import {useGetAllTemperatures} from "../Hooks/useGetTemperature";
import {useGetSoilHumidity} from '../Hooks/useSoilHumidity';
import {useGetAllLightIntensities} from '../Hooks/useGetLightIntensity';

const delay = (ms) => new Promise(resolve => setTimeout(resolve, ms));
//Mock data
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

const EnlargedChartView = ({title, data, onClose}) => (
    <div className="enlarged-chart-overlay">
        <div className="enlarged-chart-container">
            <button className="close-button" onClick={onClose}>Close</button>
            <ChartPanel title={title} data={data} isEnlarged={true}/>
        </div>
    </div>
);

export default function Dashboard() {
    const [isOnline, setIsOnline] = useState(true);
    const [selectedPlant, setSelectedPlant] = useState({id: 1, name: 'Tomato'});
    const [plantTypes, setPlantTypes] = useState([]);
    const [notifications, setNotifications] = useState([]);
    const [sensorData, setSensorData] = useState({});
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState(null);
    const [enlargedChart, setEnlargedChart] = useState(null);

    const {data: airHumidityData} = useGetAirHumidity(selectedPlant.id);
    const {
        data: temperatureData,
        loading: temperatureLoading,
        error: temperatureError
    } = useGetAllTemperatures(selectedPlant.id);
    const {
        data: soilHumidityData,
        isLoading: soilHumidityLoading,
        error: soilHumidityError
    } = useGetSoilHumidity(selectedPlant.id);
    const {
        data: lightIntensityData,
        loading: lightIntensityLoading,
        error: lightIntensityError
    } = useGetAllLightIntensities(selectedPlant.id);


    const fetchPlantTypes = async () => {
        await delay(300);
        return [
            {id: 1, name: 'Tomato'},
            {id: 2, name: 'Bell Pepper'},
            {id: 3, name: 'Chestnut'}
        ];
    };

    const fetchNotifications = async () => {
        await delay(400);
        return [
            {id: 1, message: "Water pump level low. Refill soon."},
            {
                id: 2,
                message: "Optimal conditions maintained for the last 24 hours."
            } // this is just a mock  for the modal
        ];
    };

    const fetchSensorData = async (type) => {
        await delay(500);
        return mockSensorData[type] || null;
    };

    const updateIrrigationStatus = async (status) => {
        await delay(200);
        console.log(`Irrigation status updated to: ${status}`);
        return {
            success: true,
            message: `Irrigation ${status ? 'activated' : 'deactivated'}`
        };

    };

    useEffect(() => {
        const fetchInitialData = async () => {
            setIsLoading(true);
            setError(null);
            try {
                const [plantTypesData, notificationsData] = await Promise.all([
                    fetchPlantTypes(),
                    fetchNotifications()
                ]);
                setPlantTypes(plantTypesData);
                setSelectedPlant(plantTypesData[0]); // Set the default selected plant
                setNotifications(notificationsData);

                const sensorTypes = ['temperature', 'humidity', 'light', 'soilMoisture'];
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
            } finally {
                setIsLoading(false);
            }
        };

        fetchInitialData();
    }, []);

    useEffect(() => {
        if (temperatureError) console.error('Error fetching temperature data:', temperatureError);
        if (lightIntensityError) console.error('Error fetching light intensity data:', lightIntensityError);
        if (soilHumidityError) console.error('Error fetching soil humidity data:', soilHumidityError);
        if (airHumidityData?.error) console.error('Error fetching air humidity data:', airHumidityData.error);
    }, [temperatureError, lightIntensityError, soilHumidityError, airHumidityData]);

    const handleIrrigationControl = async (activate) => {
        try {
            const result = await updateIrrigationStatus(activate);
            console.log(result.message);
            // You might want to update some state here or show a notification
        } catch (error) {
            console.error('Error updating irrigation status:', error);
        }
    };

    const handleChartClick = (chartTitle) => {
        setEnlargedChart(enlargedChart === chartTitle ? null : chartTitle);
    };

    if (isLoading) {
        return <div className="loading">Loading dashboard data...</div>;
    }

    if (error) {
        return <div className="error">{error}</div>;
    }

    return (
        <div className="dashboard-container">
            <TopBar notifications={notifications}/>
            <header className="dashboard-header">
                <h1>Welcome back</h1>
            </header>
            <div className="dashboard-content">
                <div className="connection-status">
                    Status: <span
                    className={isOnline ? 'status-online' : 'status-offline'}>
                        {isOnline ? 'Online' : 'Offline'}
                    </span>
                </div>
                <div className="plant-type">
                    <label>Plant Type: </label>
                    <select value={selectedPlant.id}
                            onChange={(e) => {
                                const plant = plantTypes.find(p => p.id === Number(e.target.value));
                                setSelectedPlant(plant);
                            }}>
                        {plantTypes.map(type => (
                            <option key={type.id} value={type.id}>{type.name}</option>
                        ))}
                    </select>
                </div>
                <div className="sensor-cards">
                    <SensorCard
                        label="Temperature"
                        value={`${temperatureData?.apiData[temperatureData.apiData.length - 1]?.temperature || 'N/A'}°C`}
                        icon="🌡️"
                    />
                    <SensorCard
                        label="Light Intensity"
                        value={`${lightIntensityData ? lightIntensityData[lightIntensityData.length - 1]?.value || 'N/A' : 'N/A'} Lux`}
                        icon="☀️"
                    />
                    <SensorCard
                        label="Air Humidity"
                        value={`${airHumidityData?.apiData[airHumidityData.apiData.length - 1]?.airHumidity || 'N/A'}%`}
                        icon="💨"
                    />
                    <SensorCard
                        label="Soil Moisture"
                        value={`${soilHumidityData ? soilHumidityData[soilHumidityData.length - 1]?.soilHumidity || 'N/A' : 'N/A'}%`}
                        icon="🌱"
                    />
                    <SensorCard label="Water Pump Level" value="70%" icon="🚰"/>
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

                <InsightsPanel/>

                <div className="controls">
                    <h2>Irrigation Control</h2>
                    <button
                        onClick={() => handleIrrigationControl(true)}>Activate
                        Irrigation
                    </button>
                    <button
                        onClick={() => handleIrrigationControl(false)}>Deactivate
                        Irrigation
                    </button>
                </div>
            </div>

            {enlargedChart && (
                <EnlargedChartView
                    title={enlargedChart}
                    data={
                        enlargedChart === "Temperature (24h)" ? (temperatureData ? {
                                labels: temperatureData.map(d => new Date(d.timestamp).toLocaleTimeString()),
                                values: temperatureData.map(d => d.temperature)
                            } : sensorData.temperature) :
                            enlargedChart === "Humidity (24h)" ? (airHumidityData?.chartData || sensorData.humidity) :
                                enlargedChart === "Soil Moisture (24h)" ? (soilHumidityData ? {
                                        labels: soilHumidityData.map(d => new Date(d.timestamp).toLocaleTimeString()),
                                        values: soilHumidityData.map(d => d.soilHumidity)
                                    } : sensorData.soilMoisture) :
                                    enlargedChart === "Light Intensity (24h)" ? (lightIntensityData ? {
                                            labels: lightIntensityData.map(d => new Date(d.timestamp).toLocaleTimeString()),
                                            values: lightIntensityData.map(d => d.value)
                                        } : sensorData.light) :
                                        null
                    }
                    onClose={() => setEnlargedChart(null)}
                />
            )}
        </div>
    );
}