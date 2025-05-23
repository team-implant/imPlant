import React from 'react';
import { Link } from 'react-router-dom';
import HumidityGraph from '../../components/graphs/HumidityGraph';
import { useGetMLAirHumidity } from '../../Hooks/ml/useMLAirHumidity';
import '../../styles/GraphPages.css';

const HumidityPage: React.FC = () => {
    const { data, isLoading, error } = useGetMLAirHumidity();

    const formattedData = React.useMemo(() => {
        return data?.map(item => ({
            timestamp: item.timestamp,
            humidity: item.airHumidity,
            prediction: item.airHumidity
        })) || [];
    }, [data]);

    return (
        <div className="graph-page humidity-page">
            <h1>Humidity Trend</h1>
            <div className="graph-container">
                {isLoading && <div className="loading">Loading data...</div>}
                {error && <div className="error">Error: {error.message}</div>}
                {formattedData.length > 0 && <HumidityGraph data={formattedData} />}
                {formattedData.length === 0 && <div>No humidity data available</div>}
            </div>
            <Link to="/ml-insights" className="back-link">Back to Insights</Link>
        </div>
    );
};

export default HumidityPage;