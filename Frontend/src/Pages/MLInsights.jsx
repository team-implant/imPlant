import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import '../styles/MLInsights.css';
import TopBar from '../components/TopBar';
import { useGetMLTemperature } from '../Hooks/ml/useMLTemperature';
import { useGetMLSoilHumidity } from '../Hooks/ml/useMLSoilHumidity';
import { useGetMLLightIntensity } from '../Hooks/ml/useMLLightIntensity';
import { useGetMLWaterPumps } from '../Hooks/ml/useMLWaterPump';

export default function MLInsights() {
    const [notifications, setNotifications] = useState([]);
    const { data: temperatureData } = useGetMLTemperature();
    const { data: soilHumidityData } = useGetMLSoilHumidity();
    const { data: lightIntensityData } = useGetMLLightIntensity();
    const { data: waterPumpData } = useGetMLWaterPumps();

    const latestTemperature = temperatureData?.[0];
    const latestSoilHumidity = soilHumidityData?.[0];
    const latestLightIntensity = lightIntensityData?.[0];
    const latestWaterPump = waterPumpData?.[0];

    return (
        <div className="ml-insights-page">
            <TopBar notifications={notifications} />
            <div className="ml-insights-content">
                <h1>ML Insights</h1>

                <div className="insights-container">
                    <Link to="/graphs/plant-growth" className="insight-card">
                        <h2>🌱 Plant Growth Prediction</h2>
                        <p>Based on current conditions, your plants are expected to grow {latestTemperature?.prediction || '2.5cm'} next week.</p>
                        {latestTemperature?.anomaly && <p>Anomaly detected: {latestTemperature.recommendation}</p>}
                    </Link>

                    <Link to="/graphs/watering-schedule" className="insight-card">
                        <h2>💧 Watering Schedule Optimisation</h2>
                        <p>Recommended next watering: {latestSoilHumidity?.recommendation || 'Tomorrow at 9:00 AM'}</p>
                        <p>Current soil humidity: {latestSoilHumidity?.soilHumidity || 'Loading...'}</p>
                        {latestSoilHumidity?.anomaly && <p>Anomaly detected: Adjust watering schedule</p>}
                    </Link>

                    <Link to="/graphs/temperature" className="insight-card">
                        <h2>🌡️ Temperature Trend </h2>
                        <p>Current temperature: {latestTemperature?.temperature || 'Loading...'}</p>
                        <p>Predicted temperature: {latestTemperature?.prediction || 'No prediction available'}</p>
                        <p>{latestTemperature?.anomaly ? 'Anomaly detected!' : 'No significant anomalies expected.'}</p>
                    </Link>

                    <Link to="/graphs/light-exposure" className="insight-card">
                        <h2>☀️ Light Exposure </h2>
                        <p>Current light intensity: {latestLightIntensity?.lightIntensity || 'Loading...'}</p>
                        <p>{latestLightIntensity?.recommendation || 'Your plants received optimal light exposure today. Consider rotating pots for even growth.'}</p>
                        {latestLightIntensity?.anomaly && <p>Anomaly detected: Adjust light exposure</p>}
                    </Link>

                    <Link to="/graphs/humidity" className="insight-card">
                        <h2>💦 Humidity Trend </h2>
                        <p>Current soil humidity: {latestSoilHumidity?.soilHumidity || 'Loading...'}</p>
                        <p>Predicted humidity: {latestSoilHumidity?.prediction || 'No prediction available'}</p>
                        <p>Recommendation: {latestSoilHumidity?.recommendation || 'No action needed, levels are optimal.'}</p>
                    </Link>

                    <Link to="/graphs/water-pump" className="insight-card">
                        <h2>🚰 Water Pump Level Prediction</h2>
                        <p>Current level: {latestWaterPump?.level || 'Loading...'}</p>
                        <p>Prediction: {latestWaterPump?.prediction || 'No prediction available'}</p>
                        <p>{latestWaterPump?.recommendation || 'No action needed at this time.'}</p>
                    </Link>
                </div>
            </div>
        </div>
    );
}