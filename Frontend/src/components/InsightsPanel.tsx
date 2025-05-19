import React, { useEffect, useState } from 'react';
import '../styles/InsightsPanel.css';
import { useGetMLTemperature } from '../Hooks/ml/useMLTemperature';
import { useGetMLSoilHumidity } from '../Hooks/ml/useMLSoilHumidity';
import { useGetMLLightIntensity } from '../Hooks/ml/useMLLightIntensity';
import { useGetMLWaterPumps } from '../Hooks/ml/useMLWaterPump';

export default function InsightsPanel() {
    const { data: temperatureData } = useGetMLTemperature();
    const { data: soilHumidityData } = useGetMLSoilHumidity();
    const { data: lightIntensityData } = useGetMLLightIntensity();
    const { data: waterPumpData } = useGetMLWaterPumps();
    const [loadingDots, setLoadingDots] = useState('');
    const [error, setError] = useState(false);
    const [showData, setShowData] = useState(false);

    const isLoading = !temperatureData || !soilHumidityData || !lightIntensityData || waterPumpData?.length === 0;

    useEffect(() => {
        if (isLoading) {
            const dotsInterval = setInterval(() => {
                setLoadingDots(prev => (prev.length >= 3 ? '' : prev + '.'));
            }, 500);

            const errorTimeout = setTimeout(() => {
                setError(true);
            }, 10000); // Show error after 10 seconds

            return () => {
                clearInterval(dotsInterval);
                clearTimeout(errorTimeout);
            };
        } else {
            setShowData(true);
        }
    }, [isLoading]);

    const LoadingText = () => <span className="loading-text">Loading{loadingDots}</span>;
    const ErrorText = () => <span className="error-text">Failed to load data. Please try again.</span>;

    const latestTemperature = temperatureData?.[0];
    const latestSoilHumidity = soilHumidityData?.[0];
    const latestLightIntensity = lightIntensityData?.[0];
    const latestWaterPump = waterPumpData?.[0];

    return (
        <div className={`insights-panel ${showData ? 'show' : ''}`}>
            <h3>Real-time Insights</h3>
            {isLoading ? (
                error ? <ErrorText /> : <LoadingText />
            ) : (
                <ul className="insights-list">
                    <li>
                        🌡️ Temperature: {latestTemperature?.temperature ?? 'N/A'}
                        {latestTemperature?.anomaly && <span className="anomaly"> (Anomaly detected!)</span>}
                        {latestTemperature?.prediction && <span className="prediction"> Predicted: {latestTemperature.prediction}</span>}
                        {latestTemperature?.recommendation && <p className="recommendation">{latestTemperature.recommendation}</p>}
                    </li>
                    <li>
                        💧 Soil moisture: {latestSoilHumidity?.soilHumidity ?? 'N/A'}
                        {latestSoilHumidity?.anomaly && <span className="anomaly"> (Anomaly detected!)</span>}
                        {latestSoilHumidity?.prediction && <span className="prediction"> Predicted: {latestSoilHumidity.prediction}</span>}
                        {latestSoilHumidity?.recommendation && <p className="recommendation">{latestSoilHumidity.recommendation}</p>}
                    </li>
                    <li>
                        ☀️ Light intensity: {latestLightIntensity?.lightIntensity ?? 'N/A'}
                        {latestLightIntensity?.anomaly && <span className="anomaly"> (Anomaly detected!)</span>}
                        {latestLightIntensity?.prediction && <span className="prediction"> Predicted: {latestLightIntensity.prediction}</span>}
                        {latestLightIntensity?.recommendation && <p className="recommendation">{latestLightIntensity.recommendation}</p>}
                    </li>
                    <li>
                        🚰 Water pump level: {latestWaterPump?.level ?? 'N/A'}
                        {latestWaterPump?.anomaly && <span className="anomaly"> (Anomaly detected!)</span>}
                        {latestWaterPump?.prediction && <span className="prediction"> Predicted: {latestWaterPump.prediction}</span>}
                        {latestWaterPump?.recommendation && <p className="recommendation">{latestWaterPump.recommendation}</p>}
                    </li>
                </ul>
            )}
        </div>
    );
}