import React from "react";
import { Link } from "react-router-dom";
import LightExposureGraph from "../../components/graphs/LightExposureGraph";
import { useGetMLLightIntensityPredictions } from "../../Hooks/ml/useMLLightIntensity";
import { useGetAllLightIntensity } from "../../Hooks/useGetLightIntensity";
import "../../styles/GraphPages.css";

const LightExposurePage: React.FC = () => {
  const {
    data: predictionData,
    isLoading: predictionLoading,
    error: predictionError,
  } = useGetMLLightIntensityPredictions();

  const {
    data: currentData,
    isLoading: currentLoading,
    error: currentError,
  } = useGetAllLightIntensity();

  const actualSeries =
    currentData?.map((item) => ({
      timestamp: new Date(item.timestamp).toISOString(),
      value: item.lightIntensity ?? 0,
    })) ?? [];

  const predictedSeries =
    predictionData?.map((item) => ({
      timestamp: new Date(item.Timestamp).toISOString(),
      value: item.LightIntensity,
    })) ?? [];

  const isLoading = predictionLoading || currentLoading;
  const error = predictionError || currentError;

  return (
    <div className="graph-page light-exposure-page">
      <h1>Light Exposure: Actual vs Predicted</h1>
      <div className="graph-container">
        {isLoading && <div className="loading">Loading data...</div>}
        {error && <div className="error">Error: {error.message}</div>}
        {actualSeries.length > 0 || predictedSeries.length > 0 ? (
          <LightExposureGraph
            actual={actualSeries}
            predicted={predictedSeries}
          />
        ) : (
          <div>No light exposure data available</div>
        )}
      </div>
      <Link to="/ml-insights" className="back-link">
        Back to Insights
      </Link>
    </div>
  );
};

export default LightExposurePage;
