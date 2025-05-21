import React from 'react';
import { Link } from 'react-router-dom';
import HumidityGraph from '../../components/graphs/HumidityGraph';
import { useGetMLAirHumidity } from '../../Hooks/ml/useMLAirHumidity';
import '../../styles/GraphPages.css';

const HumidityPage: React.FC = () => {
    const { data, isLoading, error } = useGetMLAirHumidity();

    return (
        <div className="graph-page humidity-page">
            <h1>Humidity Trend</h1>
            <div className="graph-container">
                {isLoading && <div className="loading">Loading data...</div>}
                {error && <div className="error">Error: {error.message}</div>}
                {data && <HumidityGraph data={[]}/>}
            </div>
            <Link to="/ml-insights" className="back-link">Back to Insights</Link>
        </div>
    );
};

export default HumidityPage;