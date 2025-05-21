import React from 'react';
import { Link } from 'react-router-dom';
import LightExposureGraph from '../../components/graphs/LightExposureGraph';
import { useGetMLLightIntensityPredictions } from '../../Hooks/ml/useMLLightIntensity';
import '../../styles/GraphPages.css';

const LightExposurePage: React.FC = () => {
    const { data, isLoading, error } = useGetMLLightIntensityPredictions();

    return (
        <div className="graph-page light-exposure-page">
            <h1>Light Exposure</h1>
            <div className="graph-container">
                {isLoading && <div className="loading">Loading data...</div>}
                {error && <div className="error">Error: {error.message}</div>}
                {data && <LightExposureGraph data={[]}/>}
            </div>
            <Link to="/ml-insights" className="back-link">Back to Insights</Link>
        </div>
    );
};

export default LightExposurePage;