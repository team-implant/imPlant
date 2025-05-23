import React from 'react';
import { Link } from 'react-router-dom';
import LightExposureGraph from '../../components/graphs/LightExposureGraph';
import { useGetMLLightIntensityPredictions } from '../../Hooks/ml/useMLLightIntensity';
import '../../styles/GraphPages.css';

const LightExposurePage: React.FC = () => {
    const { data, isLoading, error } = useGetMLLightIntensityPredictions();

    const formattedData = React.useMemo(() => {
        return data?.filter(item => item.prediction !== undefined)
            .map(item => ({
                ...item,
                prediction: item.prediction as number
            })) || [];
    }, [data]);

    return (
        <div className="graph-page light-exposure-page">
            <h1>Light Exposure</h1>
            <div className="graph-container">
                {isLoading && <div className="loading">Loading data...</div>}
                {error && <div className="error">Error: {error.message}</div>}
                {formattedData.length > 0 && <LightExposureGraph data={formattedData} />}
                {data && data.length === 0 && <div>No light exposure data available</div>}
            </div>
            <Link to="/ml-insights" className="back-link">Back to Insights</Link>
        </div>
    );
};

export default LightExposurePage;