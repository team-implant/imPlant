import React from 'react';
import { Link } from 'react-router-dom';
import PlantGrowthGraph from '../../components/graphs/PlantGrowthGraph';
import '../../styles/GraphPages.css';

const PlantGrowthPage: React.FC = () => {
    return (
        <div className="graph-page plant-growth-page">
            <h1>Plant Growth Prediction</h1>
            <div className="graph-container">
                <PlantGrowthGraph data={[]} />
            </div>
            <Link to="/ml-insights" className="back-link">Back to Insights</Link>
        </div>
    );
};

export default PlantGrowthPage;