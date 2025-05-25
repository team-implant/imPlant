import React from "react";
import { Link } from "react-router-dom";
import HumidityGraph from "../../components/graphs/HumidityGraph";
import { useGetMLAirHumidity } from "../../Hooks/ml/useMLAirHumidity";
import { useGetAllAirHumidity } from "../../Hooks/useAirHumidity";
import "../../styles/GraphPages.css";

const HumidityPage: React.FC = () => {
  const {
    data: predictionData,
    isLoading: predictionLoading,
    error: predictionError,
  } = useGetMLAirHumidity();
  console.log("Prediction Data:", predictionData);

  const {
    data: currentData,
    isLoading: currentLoading,
    error: currentError,
  } = useGetAllAirHumidity();

  const actualSeries =
    currentData?.map((item) => ({
      timestamp: new Date(item.timestamp).toISOString(),
      value: item.airHumidity,
    })) ?? [];

  const predictedSeries =
    predictionData?.map((item) => ({
      timestamp: new Date(item.Timestamp).toISOString(),
      value: item.AirHumidity,
    })) ?? [];

  const isLoading = predictionLoading || currentLoading;
  const error = predictionError || currentError;

  return (
    <div className="graph-page humidity-page">
      <h1>Humidity: Actual vs Predicted</h1>
      <div className="graph-container">
        {isLoading && <div className="loading">Loading data...</div>}
        {error && <div className="error">Error: {error.message}</div>}
        {actualSeries.length > 0 || predictedSeries.length > 0 ? (
          <HumidityGraph actual={actualSeries} predicted={predictedSeries} />
        ) : (
          <div>No humidity data available</div>
        )}
      </div>
      <Link to="/ml-insights" className="back-link">
        Back to Insights
      </Link>
    </div>
  );
};

export default HumidityPage;
