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
import WaterLevelIndicator from '../components/waterpump/WaterLevelIndicator';
import { useWaterPumpData } from '../Hooks/waterpump/useWaterPump';


const Dashboard = () => {
    const [isOnline, setIsOnline] = useState(false);
    const [selectedPlant, setSelectedPlant] = useState({id: 1, name: 'Tomato'});
    const [plantTypes, setPlantTypes] = useState([]);
    const [notifications, setNotifications] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState(null);
    const [enlargedChart, setEnlargedChart] = useState(null);
    const [waterLevel, setWaterLevel] = useState(15); // Mock percentage


    // Hooks for fetching sensor data 
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

    const { data: waterPumpData, 
            loading: waterPumpLoading,
             error: waterPumpError 
            } = useWaterPumpData();

    // Fetch initial dashboard data
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
            } catch (err) {
                setError('Failed to load dashboard data. Please try again later.');
                setIsOnline(false);
            } finally {
                setIsLoading(false);
            }
        };
        fetchInitialData();
    }, []);
  // check if the greenhouse is online
    useEffect(() => {
        const hasData = airHumidityData || temperatureData || soilHumidityData || lightIntensityData;
        setIsOnline(!!hasData);
    }, [airHumidityData, temperatureData, soilHumidityData, lightIntensityData]);


    // Handle errors
    useEffect(() => {
        if (temperatureError) console.error('Temperature error:', temperatureError);
        if (lightIntensityError) console.error('Light error:', lightIntensityError);
        if (soilHumidityError) console.error('Soil error:', soilHumidityError);
        if (airHumidityData?.error) console.error('Air humidity error:', airHumidityData.error);
    }, [temperatureError, lightIntensityError, soilHumidityError, airHumidityData]);

    // Irrigation control
    const handleIrrigationControl = async (activate) => {
        try {
            const res = await updateIrrigationStatus(activate);
            console.log(res.message);
        } catch (err) {
            console.error('Irrigation error:', err);
        }
    };

    // Handle chart enlargement
    const handleChartClick = (title) => {
        setEnlargedChart(enlargedChart === title ? null : title);
    };

    if (isLoading) return <div className="loading">Loading dashboard
        data...</div>;
    if (error) return <div className="error">{error}</div>;

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
                    <select value={selectedPlant.id} onChange={(e) => {
                        const plant = plantTypes.find(p => p.id === Number(e.target.value));
                        setSelectedPlant(plant);
                    }}>
                        {plantTypes.map(type => (
                            <option key={type.id}
                                    value={type.id}>{type.name}</option>
                        ))}
                    </select>
                </div>

                <div className="sensor-cards">
                    <SensorCard label="Temperature"
                                value={`${temperatureData?.at(-1)?.temperature ?? '--'}°C`}
                                icon="🌡️"/>
                    <SensorCard label="Light Intensity"
                                value={`${lightIntensityData?.at(-1)?.value ?? '--'} Lux`}
                                icon="☀️"/>
                    <SensorCard label="Air Humidity"
                                value={`${airHumidityData?.apiData?.at(-1)?.airHumidity ?? '--'}%`}
                                icon="💨"/>
                    <SensorCard label="Soil Moisture"
                                value={`${soilHumidityData?.at(-1)?.soilHumidity ?? '--'}%`}
                                icon="🌱"/>
                    <SensorCard
                        label="Water Pump Level"
                        value={`${waterLevel}%`}
                        icon="🚰"
                        className="water-pump-card">
                        <WaterLevelIndicator level={waterLevel} />
                    </SensorCard>


                </div>

                <div style={{ display: 'flex', justifyContent: 'center', marginTop: '10px' }}></div> 

                <div className="charts">
                    <ChartPanel
                        title={`Temperature (24h) - ${selectedPlant.name}`}
                        data={temperatureData ? {
                            labels: temperatureData.map(d => new Date(d.timestamp).toLocaleTimeString()),
                            values: temperatureData.map(d => d.temperature)
                        } : {labels: [], values: []}}
                        onClick={() => handleChartClick("Temperature (24h)")}
                        isEnlarged={enlargedChart === "Temperature (24h)"}
                    />
                    <ChartPanel
                        title={`Humidity (24h) - ${selectedPlant.name}`}
                        data={airHumidityData?.chartData || {
                            labels: [],
                            values: []
                        }}
                        onClick={() => handleChartClick("Humidity (24h)")}
                        isEnlarged={enlargedChart === "Humidity (24h)"}
                    />
                    <ChartPanel
                        title={`Soil Moisture (24h) - ${selectedPlant.name}`}
                        data={soilHumidityData ? {
                            labels: soilHumidityData.map(d => new Date(d.timestamp).toLocaleTimeString()),
                            values: soilHumidityData.map(d => d.soilHumidity)
                        } : {labels: [], values: []}}
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
                <div className="enlarged-chart-overlay">
                    <div className="enlarged-chart-container">
                        <button className="close-button"
                                onClick={() => setEnlargedChart(null)}>Close
                        </button>
                        <ChartPanel
                            title={enlargedChart}
                            data={getEnlargedChartData(enlargedChart, temperatureData, airHumidityData, soilHumidityData, lightIntensityData)}
                            isEnlarged={true}
                        />
                    </div>
                </div>
            )}
        </div>
    );
};

// Helper functions
const fetchPlantTypes = async () => {
    // Replace with actual API call
    return [
        {id: 1, name: 'Tomato'},
        {id: 2, name: 'Bell Pepper'},
        {id: 3, name: 'Chestnut'},
    ];
};

const fetchNotifications = async () => {
    // Replace with actual API call
    return [
        {id: 1, message: "Water pump level low. Refill soon."},
        {id: 2, message: "Optimal conditions maintained for the last 24 hours."}
    ];
};

const updateIrrigationStatus = async (status) => {
    // Replace with actual API call
    return {
        success: true,
        message: `Irrigation ${status ? 'activated' : 'deactivated'}`
    };
};

const getEnlargedChartData = (title, temperature, humidity, soil, light) => {
    switch (title) {
        case "Temperature (24h)":
            return temperature ? {
                labels: temperature.map(d => new Date(d.timestamp).toLocaleTimeString()),
                values: temperature.map(d => d.temperature)
            } : {labels: [], values: []};
        case "Humidity (24h)":
            return humidity?.chartData || {labels: [], values: []};
        case "Soil Moisture (24h)":
            return soil ? {
                labels: soil.map(d => new Date(d.timestamp).toLocaleTimeString()),
                values: soil.map(d => d.soilHumidity)
            } : {labels: [], values: []};
        case "Light Intensity (24h)":
            return light ? {
                labels: light.map(d => new Date(d.timestamp).toLocaleTimeString()),
                values: light.map(d => d.value)
            } : {labels: [], values: []};
        default:
            return {labels: [], values: []};
    }
}; 
 
export default Dashboard;