import React from "react";
import { Link } from "react-router-dom";
import TemperatureGraph from "../../components/graphs/TemperatureGraph";
import { useGetMLTemperaturePredictions } from "../../Hooks/ml/useMLTemperature";
import { useGetAllTemperatures } from "../../Hooks/useGetTemperature";
import "../../styles/GraphPages.css";

const TemperaturePage: React.FC = () => {
  const {
    data: predictionData,
    isLoading: predictionLoading,
    error: predictionError,
  } = useGetMLTemperaturePredictions();

  const {
    data: currentData,
    isLoading: currentLoading,
    error: currentError,
  } = useGetAllTemperatures();

  const actualSeries =
    currentData?.map((item) => ({
      timestamp: new Date(item.timestamp).toISOString(),
      value: item.temperature,
    })) ?? [];

  const predictedSeries =
    predictionData?.map((item) => ({
      timestamp: new Date(item.Timestamp).toISOString(),
      value: item.Temperature,
    })) ?? [];

  const isLoading = predictionLoading || currentLoading;
  const error = predictionError || currentError;

  return (
    <div className="graph-page temperature-page">
      <h1>Temperature: Actual vs Predicted</h1>
      <div className="graph-container">
        {isLoading && <div className="loading">Loading data...</div>}
        {error && <div className="error">Error: {error.message}</div>}
        {(actualSeries.length > 0 || predictedSeries.length > 0) && (
          <TemperatureGraph actual={actualSeries} predicted={predictedSeries} />
        )}
      </div>
      <Link to="/ml-insights" className="back-link">
        Back to Insights
      </Link>
    </div>
  );
};

export default TemperaturePage;
