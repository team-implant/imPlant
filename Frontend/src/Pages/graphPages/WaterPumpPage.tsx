import React from "react";
import { Link } from "react-router-dom";
import WaterPumpGraph from "../../components/graphs/WaterPumpGraph";
import {
  useGetMLWaterPumpPredictions,
  MLWaterPumpData,
} from "../../Hooks/ml/useMLWaterPump";
import { useMeasurements } from "../../Hooks/useMeasurement";
import "../../styles/GraphPages.css";

const WaterPumpPage: React.FC = () => {
  const {
    data: predictionData,
    isLoading: predictionLoading,
    error: predictionError,
  } = useGetMLWaterPumpPredictions();

  const {
    data: measurementData,
    isLoading: currentLoading,
    error: currentError,
  } = useMeasurements();

  const actualSeries =
    measurementData?.map((item) => ({
      timestamp: new Date(item.timestamp).toISOString(),
      value: item.tankFillLevel,
    })) ?? [];

  const predictedSeries =
    predictionData?.map((item) => ({
      timestamp: new Date(item.Timestamp).toISOString(),
      value: item.prediction,
    })) ?? [];

  const isLoading = predictionLoading || currentLoading;
  const error = predictionError || currentError;

  return (
    <div className="graph-page water-pump-page">
      <h1>Water Pump Level: Actual vs Predicted</h1>
      <div className="graph-container">
        {isLoading && <div className="loading">Loading data...</div>}
        {error && <div className="error">Error: {error.message}</div>}
        {(actualSeries.length > 0 || predictedSeries.length > 0) && (
          <WaterPumpGraph actual={actualSeries} predicted={predictedSeries} />
        )}
      </div>
      <Link to="/ml-insights" className="back-link">
        Back to Insights
      </Link>
    </div>
  );
};

export default WaterPumpPage;
