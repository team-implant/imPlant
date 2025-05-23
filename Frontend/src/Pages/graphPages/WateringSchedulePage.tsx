import React from 'react';
import { Link } from 'react-router-dom';
import WateringScheduleGraph from '../../components/graphs/WateringScheduleGraph';
import { useGetMLSoilHumidityPredictions } from '../../Hooks/ml/useMLSoilHumidity';
import '../../styles/GraphPages.css';

const WateringSchedulePage: React.FC = () => {
    const { data, isLoading, error } = useGetMLSoilHumidityPredictions();

    const wateringScheduleData = React.useMemo(() => {
        return data?.map(item => ({
            timestamp: item.timestamp,
            wateringAmount: item.soilHumidity,
            prediction: item.prediction ?? 0
        })) || [];
    }, [data]);

    return (
        <div className="graph-page watering-schedule-page">
            <h1>Watering Schedule</h1>
            <div className="graph-container">
                {isLoading && <div className="loading">Loading data...</div>}
                {error && <div className="error">Error: {error.message}</div>}
                {!isLoading && !error && <WateringScheduleGraph data={wateringScheduleData} />}
            </div>
            <Link to="/ml-insights" className="back-link">Back to Insights</Link>
        </div>
    );
};

export default WateringSchedulePage;