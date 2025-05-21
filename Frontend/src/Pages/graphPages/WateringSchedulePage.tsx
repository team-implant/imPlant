import React from 'react';
import { Link } from 'react-router-dom';
import WateringScheduleGraph from '../../components/graphs/WateringScheduleGraph';
import '../../styles/GraphPages.css';

const WateringSchedulePage: React.FC = () => {
    return (
        <div className="graph-page watering-schedule-page">
            <h1>Watering Schedule</h1>
            <div className="graph-container">
                <WateringScheduleGraph data={[]} />
            </div>
            <Link to="/ml-insights" className="back-link">Back to Insights</Link>
        </div>
    );
};

export default WateringSchedulePage;