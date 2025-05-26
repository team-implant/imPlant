import React from "react";
import { Link } from "react-router-dom";
import WateringScheduleGraph from "../../components/graphs/WateringScheduleGraph";
import { useGetMLSoilHumidityPredictions } from "../../Hooks/ml/useMLSoilHumidity";
import { useGetAllSoilHumidity } from "../../Hooks/useSoilHumidity";
import "../../styles/GraphPages.css";

const WateringSchedulePage: React.FC = () => {
  const {
    data: predictionData,
    isLoading: predictionLoading,
    error: predictionError,
  } = useGetMLSoilHumidityPredictions();

  const {
    data: currentData,
    isLoading: currentLoading,
    error: currentError,
  } = useGetAllSoilHumidity();

  const actualSeries =
    currentData?.map((item) => ({
      timestamp: new Date(item.timestamp).toISOString(),
      value: item.soilHumidity,
    })) ?? [];

  const predictedSeries =
    predictionData?.map((item) => ({
      timestamp: new Date(item.Timestamp).toISOString(),
      value: item.SoilHumidity,
    })) ?? [];

  const isLoading = predictionLoading || currentLoading;
  const error = predictionError || currentError;

  return (
    <div className="graph-page watering-schedule-page">
      <h1>Soil Moisture: Actual vs Predicted</h1>
      <div className="graph-container">
        {isLoading && <div className="loading">Loading data...</div>}
        {error && <div className="error">Error: {error.message}</div>}
        {(actualSeries.length > 0 || predictedSeries.length > 0) && (
          <WateringScheduleGraph
            actual={actualSeries}
            predicted={predictedSeries}
          />
        )}
      </div>
      <Link to="/ml-insights" className="back-link">
        Back to Insights
      </Link>
    </div>
  );
};

export default WateringSchedulePage;
