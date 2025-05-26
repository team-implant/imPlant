import React, { useEffect, useState } from "react";
import "../styles/InsightsPanel.css";

import { useGetMLTemperaturePredictions } from "../Hooks/ml/useMLTemperature";
import { useGetMLSoilHumidityPredictions } from "../Hooks/ml/useMLSoilHumidity";
import { useGetMLLightIntensityPredictions } from "../Hooks/ml/useMLLightIntensity";
import { useGetMLWaterPumpPredictions } from "../Hooks/ml/useMLWaterPump";
import { useMeasurements } from "../Hooks/useMeasurement";

export default function InsightsPanel() {
  const { data: measurements } = useMeasurements();

  const { data: temperaturePredictionData } = useGetMLTemperaturePredictions();
  const { data: soilPredictionData } = useGetMLSoilHumidityPredictions();
  const { data: lightPredictionData } = useGetMLLightIntensityPredictions();
  const { data: waterPumpPredictionData } = useGetMLWaterPumpPredictions();

  const [loadingDots, setLoadingDots] = useState("");
  const [error, setError] = useState(false);
  const [showData, setShowData] = useState(false);

  const isLoading =
    !measurements ||
    !temperaturePredictionData ||
    !soilPredictionData ||
    !lightPredictionData ||
    !waterPumpPredictionData;

  useEffect(() => {
    if (isLoading) {
      const dotsInterval = setInterval(() => {
        setLoadingDots((prev) => (prev.length >= 3 ? "" : prev + "."));
      }, 500);

      const errorTimeout = setTimeout(() => {
        setError(true);
      }, 10000);

      return () => {
        clearInterval(dotsInterval);
        clearTimeout(errorTimeout);
      };
    } else {
      setShowData(true);
    }
  }, [isLoading]);

  const LoadingText = () => (
    <span className="loading-text">Loading{loadingDots}</span>
  );
  const ErrorText = () => (
    <span className="error-text">Failed to load data. Please try again.</span>
  );

  const latestMeasurement = measurements?.at(-1);

  const latestPredictedTemp = temperaturePredictionData?.[0];
  const latestPredictedSoil = soilPredictionData?.[0];
  const latestPredictedLight = lightPredictionData?.[0];
  const latestPredictedPump = waterPumpPredictionData?.[0];

  return (
    <div className={`insights-panel ${showData ? "show" : ""}`}>
      <h3>Real-time Insights</h3>
      {isLoading ? (
        error ? (
          <ErrorText />
        ) : (
          <LoadingText />
        )
      ) : (
        <ul className="insights-list">
          <li>
            🌡️ Temperature: {latestMeasurement?.temperature ?? "N/A"}
            {latestPredictedTemp?.Temperature && (
              <span className="prediction">
                {" "}
                Predicted: {latestPredictedTemp.Temperature}
              </span>
            )}
          </li>
          <li>
            💧 Soil moisture: {latestMeasurement?.soilHumidity ?? "N/A"}
            {latestPredictedSoil?.SoilHumidity && (
              <span className="prediction">
                {" "}
                Predicted: {latestPredictedSoil.SoilHumidity}
              </span>
            )}
          </li>
          <li>
            ☀️ Light intensity: {latestMeasurement?.lightIntensity ?? "N/A"}
            {latestPredictedLight?.LightIntensity && (
              <span className="prediction">
                {" "}
                Predicted: {latestPredictedLight.LightIntensity}
              </span>
            )}
          </li>
          <li>
            🚰 Water pump level: {latestMeasurement?.tankFillLevel ?? "N/A"}
            {latestPredictedPump?.WaterPump && (
              <span className="prediction">
                {" "}
                Predicted: {latestPredictedPump.WaterPump}
              </span>
            )}
            {latestPredictedPump?.anomaly && (
              <span className="anomaly"> (Anomaly detected!)</span>
            )}
            {latestPredictedPump?.recommendation && (
              <p className="recommendation">
                {latestPredictedPump.recommendation}
              </p>
            )}
          </li>
        </ul>
      )}
    </div>
  );
}
