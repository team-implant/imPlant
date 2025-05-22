import React, { useMemo } from 'react';
import { Link } from 'react-router-dom';
import PlantGrowthGraph from '../../components/graphs/PlantGrowthGraph';
import { useGetMLMeasurements } from '../../Hooks/ml/useMLMeasurement';
import '../../styles/GraphPages.css';

const PlantGrowthPage: React.FC = () => {
    const { data, isLoading, error } = useGetMLMeasurements();

    const plantGrowthData = useMemo(() => {
        if (!data) return [];

        return data.map(item => {
            // Calculate a simple growth metric
            // This is a placeholder calculation and should be adjusted based on your specific requirements
            const growthMetric = (
                item.temperature * 0.3 +
                item.soilMoisture * 0.4 +
                item.lightIntensity * 0.3
            ) / 100; // Normalize to a 0-1 scale

            return {
                timestamp: item.timestamp,
                growth: growthMetric,
                temperature: item.temperature,
                soilMoisture: item.soilMoisture,
                lightIntensity: item.lightIntensity,
                prediction: growthMetric
            };
        });
    }, [data]);

    return (
        <div className="graph-page plant-growth-page">
            <h1>Plant Growth Prediction</h1>
            <div className="graph-container">
                {isLoading && <div className="loading">Loading data...</div>}
                {error && <div className="error">Error: {error.message}</div>}
                {!isLoading && !error && <PlantGrowthGraph data={plantGrowthData} />}
            </div>
            <Link to="/ml-insights" className="back-link">Back to Insights</Link>
        </div>
    );
};

export default PlantGrowthPage;