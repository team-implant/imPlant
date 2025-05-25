import React from "react";
import { Link } from "react-router-dom";
import WaterPumpGraph from "../../components/graphs/WaterPumpGraph";
import {
  useGetMLWaterPumpPredictions,
  MLWaterPumpData,
} from "../../Hooks/ml/useMLWaterPump";
import "../../styles/GraphPages.css";

const WaterPumpPage: React.FC = () => {
  const { data, isLoading, error } = useGetMLWaterPumpPredictions();

  const filteredData = React.useMemo(() => {
    return (
      data?.filter(
        (item): item is MLWaterPumpData => item.prediction !== undefined
      ) || []
    );
  }, [data]);

  return (
    <div className="graph-page water-pump-page">
      <h1>Water Pump Level Prediction</h1>
      <div className="graph-container">
        {isLoading && <div className="loading">Loading data...</div>}
        {error && <div className="error">Error: {error.message}</div>}
        {filteredData.length > 0 && <WaterPumpGraph data={filteredData} />}
      </div>
      <Link to="/ml-insights" className="back-link">
        Back to Insights
      </Link>
    </div>
  );
};

export default WaterPumpPage;
