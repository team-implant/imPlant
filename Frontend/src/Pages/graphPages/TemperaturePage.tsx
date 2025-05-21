import React from 'react';
import { Link } from 'react-router-dom';
import TemperatureGraph from '../../components/graphs/TemperatureGraph';
import { useGetMLTemperaturePredictions } from '../../Hooks/ml/useMLTemperature';
import '../../styles/GraphPages.css';

const TemperaturePage: React.FC = () => {
    const { data, isLoading, error } = useGetMLTemperaturePredictions();

    return (
        <div className="graph-page temperature-page">
            <h1>Temperature Prediction</h1>
            <div className="graph-container">
                {isLoading && <div className="loading">Loading data...</div>}
                {error && <div className="error">Error: {error.message}</div>}
                {data && <TemperatureGraph data={[]}/>}
            </div>
            <Link to="/ml-insights" className="back-link">Back to Insights</Link>
        </div>
    );
};

export default TemperaturePage;