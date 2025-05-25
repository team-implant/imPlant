import React, { useEffect, useState } from "react";
import "../styles/InsightsPanel.css";
import { useGetMLTemperaturePredictions } from "../Hooks/ml/useMLTemperature";
import { useGetMLSoilHumidityPredictions } from "../Hooks/ml/useMLSoilHumidity";
import { useGetMLLightIntensityPredictions } from "../Hooks/ml/useMLLightIntensity";
import { useGetMLWaterPumpPredictions } from "../Hooks/ml/useMLWaterPump";

import { useGetAllTemperatures } from "../Hooks/useGetTemperature";
import { useGetAllSoilHumidity } from "../Hooks/useSoilHumidity";
import { useGetAllLightIntensity } from "../Hooks/useGetLightIntensity";
import { useWaterPumpData } from "../Hooks/waterpump/useWaterPump";

export default function InsightsPanel() {
  const { data: temperaturePredictionData } = useGetMLTemperaturePredictions();
  const { data: soilPredictionData } = useGetMLSoilHumidityPredictions();
  const { data: lightPredictionData } = useGetMLLightIntensityPredictions();
  const { data: waterPumpPredictionData } = useGetMLWaterPumpPredictions();

  const { data: currentTemperatureData } = useGetAllTemperatures();
  const { data: currentSoilData } = useGetAllSoilHumidity();
  const { data: currentLightData } = useGetAllLightIntensity();

  const [loadingDots, setLoadingDots] = useState("");
  const [error, setError] = useState(false);
  const [showData, setShowData] = useState(false);

  const isLoading =
    !temperaturePredictionData ||
    !soilPredictionData ||
    !lightPredictionData ||
    !waterPumpPredictionData ||
    !currentTemperatureData ||
    !currentSoilData ||
    !currentLightData;

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

  const latestCurrentTemp = currentTemperatureData?.[0];
  const latestCurrentSoil = currentSoilData?.[0];
  const latestCurrentLight = currentLightData?.[0];

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
            🌡️ Temperature: {latestCurrentTemp?.temperature ?? "N/A"}
            {latestPredictedTemp?.Temperature && (
              <span className="prediction">
                {" "}
                Predicted: {latestPredictedTemp.Temperature}
              </span>
            )}
          </li>
          <li>
            💧 Soil moisture: {latestCurrentSoil?.soilHumidity ?? "N/A"}
            {latestPredictedSoil?.SoilHumidity && (
              <span className="prediction">
                {" "}
                Predicted: {latestPredictedSoil.SoilHumidity}
              </span>
            )}
          </li>
          <li>
            ☀️ Light intensity: {latestCurrentLight?.lightIntensity ?? "N/A"}
            {latestPredictedLight?.LightIntensity && (
              <span className="prediction">
                {" "}
                Predicted: {latestPredictedLight.LightIntensity}
              </span>
            )}
          </li>
          <li>
            🚰 Water pump level: {"N/A"}
            {latestPredictedPump?.prediction && (
              <span className="prediction">
                {" "}
                Predicted: {latestPredictedPump.prediction}
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
