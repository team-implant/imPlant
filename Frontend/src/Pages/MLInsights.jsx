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
    const { data: temperatureData, isLoading: tempLoading } = useGetMLTemperature();
    const { data: soilHumidityData, isLoading: soilLoading } = useGetMLSoilHumidity();
    const { data: lightIntensityData, isLoading: lightLoading } = useGetMLLightIntensity();
    const { data: waterPumpData, isLoading: pumpLoading } = useGetMLWaterPumps();

    const latestTemperature = temperatureData?.[0];
    const latestSoilHumidity = soilHumidityData?.[0];
    const latestLightIntensity = lightIntensityData?.[0];
    const latestWaterPump = waterPumpData?.[0];

    const renderInsightCard = (title, to, content) => (
        <Link to={to} className="insight-card">
            <h2>{title}</h2>
            {content}
        </Link>
    );

    return (
        <div className="ml-insights-page">
            <TopBar notifications={notifications} />
            <div className="ml-insights-content">
                <h1>ML Insights</h1>

                <div className="insights-container">
                    {renderInsightCard("🌱 Plant Growth Prediction", "/graphs/plant-growth", (
                        <>
                            <p>Predicted growth: {tempLoading ? 'Loading...' : (latestTemperature?.prediction || 'No prediction available')}</p>
                            {latestTemperature?.anomaly && <p>Anomaly detected: {latestTemperature.recommendation}</p>}
                        </>
                    ))}

                    {renderInsightCard("💧 Watering Schedule", "/graphs/watering-schedule", (
                        <>
                            <p>Current soil humidity: {soilLoading ? 'Loading...' : (latestSoilHumidity?.soilHumidity || 'Data unavailable')}</p>
                            <p>Recommendation: {soilLoading ? 'Loading...' : (latestSoilHumidity?.recommendation || 'No recommendation available')}</p>
                            {latestSoilHumidity?.anomaly && <p>Anomaly detected: Adjust watering schedule</p>}
                        </>
                    ))}

                    {renderInsightCard("🌡️ Temperature", "/graphs/temperature", (
                        <>
                            <p>Current temperature: {tempLoading ? 'Loading...' : (latestTemperature?.temperature || 'Data unavailable')}</p>
                            <p>Predicted temperature: {tempLoading ? 'Loading...' : (latestTemperature?.prediction || 'No prediction available')}</p>
                            {latestTemperature?.anomaly && <p>Anomaly detected!</p>}
                        </>
                    ))}

                    {renderInsightCard("☀️ Light Exposure", "/graphs/light-exposure", (
                        <>
                            <p>Current light intensity: {lightLoading ? 'Loading...' : (latestLightIntensity?.lightIntensity || 'Data unavailable')}</p>
                            <p>Recommendation: {lightLoading ? 'Loading...' : (latestLightIntensity?.recommendation || 'No recommendation available')}</p>
                            {latestLightIntensity?.anomaly && <p>Anomaly detected: Adjust light exposure</p>}
                        </>
                    ))}

                    {renderInsightCard("💦 Humidity Trend", "/graphs/humidity", (
                        <>
                            <p>Current soil humidity: {soilLoading ? 'Loading...' : (latestSoilHumidity?.soilHumidity || 'Data unavailable')}</p>
                            <p>Predicted humidity: {soilLoading ? 'Loading...' : (latestSoilHumidity?.prediction || 'No prediction available')}</p>
                            <p>Recommendation: {soilLoading ? 'Loading...' : (latestSoilHumidity?.recommendation || 'No recommendation available')}</p>
                        </>
                    ))}

                    {renderInsightCard("🚰 Water Pump Level Prediction", "/graphs/water-pump", (
                        <>
                            <p>Current level: {pumpLoading ? 'Loading...' : (latestWaterPump?.level || 'Data unavailable')}</p>
                            <p>Prediction: {pumpLoading ? 'Loading...' : (latestWaterPump?.prediction || 'No prediction available')}</p>
                            <p>Recommendation: {pumpLoading ? 'Loading...' : (latestWaterPump?.recommendation || 'No recommendation available')}</p>
                        </>
                    ))}
                </div>
            </div>
        </div>
    );
}