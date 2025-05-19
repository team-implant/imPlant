import React, {useEffect,useState} from 'react';
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
    const isLoading = !temperatureData || !soilHumidityData || !lightIntensityData ||waterPumpData?.length === 0;

        useEffect(() => {
        if (isLoading) {
            const interval = setInterval(() => {
                setLoadingDots(prev => (prev.length >= 3 ? '' : prev + '.'));
            }, 500);
            return () => clearInterval(interval);
        }
    }, [isLoading]);

    const LoadingText = () => <span className="loading-text">Loading{loadingDots}</span>;






    const latestTemperature = temperatureData?.[0];
    const latestSoilHumidity = soilHumidityData?.[0];
    const latestLightIntensity = lightIntensityData?.[0];
    const latestWaterPump = waterPumpData?.[0];



    return (
        <div className="insights-panel">
            <h3>Real-time Insights</h3>
            {isLoading ? (
                    <LoadingText />
                ) : (

            <ul>
                <li>
                    🌡️ Temperature: {latestTemperature?.temperature ?? 'Loading...'}
                    {latestTemperature?.anomaly && <span> (Anomaly detected!)</span>}
                    {latestTemperature?.prediction && <span> Predicted: {latestTemperature.prediction}</span>}
                    {latestTemperature?.recommendation && <p>{latestTemperature.recommendation}</p>}
                </li>
                <li>
                    💧 Soil moisture: {latestSoilHumidity?.soilHumidity ?? 'Loading...'}
                    {latestSoilHumidity?.anomaly && <span> (Anomaly detected!)</span>}
                    {latestSoilHumidity?.prediction && <span> Predicted: {latestSoilHumidity.prediction}</span>}
                    {latestSoilHumidity?.recommendation && <p>{latestSoilHumidity.recommendation}</p>}
                </li>
                <li>
                    ☀️ Light intensity: {latestLightIntensity?.lightIntensity ?? 'Loading...'}
                    {latestLightIntensity?.anomaly && <span> (Anomaly detected!)</span>}
                    {latestLightIntensity?.prediction && <span> Predicted: {latestLightIntensity.prediction}</span>}
                    {latestLightIntensity?.recommendation && <p>{latestLightIntensity.recommendation}</p>}
                </li>
                <li>
                    🚰 Water pump level: {latestWaterPump?.level ?? 'Loading...'}
                    {latestWaterPump?.anomaly && <span> (Anomaly detected!)</span>}
                    {latestWaterPump?.prediction && <span> Predicted: {latestWaterPump.prediction}</span>}
                    {latestWaterPump?.recommendation && <p>{latestWaterPump.recommendation}</p>}
                </li>
            </ul>)}
        </div>
    );
}
