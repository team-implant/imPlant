import React, { useState } from "react";
import { Link } from "react-router-dom";
import "../styles/MLInsights.css";
import TopBar from "../components/TopBar";

// ML prediction hooks
import { useGetMLTemperaturePredictions } from "../Hooks/ml/useMLTemperature";
import { useGetMLSoilHumidityPredictions } from "../Hooks/ml/useMLSoilHumidity";
import { useGetMLWaterPumpPredictions } from "../Hooks/ml/useMLWaterPump";
import { useGetMLLightIntensityPredictions } from "../Hooks/ml/useMLLightIntensity";
import { useGetMLAirHumidity } from "../Hooks/ml/useMLAirHumidity";

// Real-time sensor data hooks
import { useGetAllTemperatures } from "../Hooks/useGetTemperature";
import { useGetAllSoilHumidity } from "../Hooks/useSoilHumidity";
import { useGetAllLightIntensity } from "../Hooks/useGetLightIntensity";
import { useGetAllAirHumidity } from "../Hooks/useAirHumidity";
import { useMeasurements } from "../Hooks/useMeasurement";

export default function MLInsights() {
  const [notifications, setNotifications] = useState([]);

  // Fetch current data
  const { data: currentTemperatureData, isLoading: currentTempLoading } =
    useGetAllTemperatures();
  const { data: currentSoilHumidityData, isLoading: currentSoilLoading } =
    useGetAllSoilHumidity();
  const { data: currentLightIntensityData, isLoading: currentLightLoading } =
    useGetAllLightIntensity();
  const { data: currentAirHumidityData, isLoading: currentAirLoading } =
    useGetAllAirHumidity();

  const { data: currentWaterPumpData, isLoading: currentPumpLoading } =
    useMeasurements();

  // Fetch predictions
  const { data: temperaturePredictionData, isLoading: tempPredictionLoading } =
    useGetMLTemperaturePredictions();
  const { data: soilHumidityPredictionData, isLoading: soilPredictionLoading } =
    useGetMLSoilHumidityPredictions();
  const {
    data: lightIntensityPredictionData,
    isLoading: lightPredictionLoading,
  } = useGetMLLightIntensityPredictions();
  const { data: airHumidityPredictionData, isLoading: airPredictionLoading } =
    useGetMLAirHumidity();
  const { data: waterPumpPredictionData, isLoading: pumpPredictionLoading } =
    useGetMLWaterPumpPredictions();

  // Extract latest data
  const latestCurrentTemperature = currentTemperatureData?.[0];
  const latestCurrentSoilHumidity = currentSoilHumidityData?.[0];
  const latestCurrentLightIntensity = currentLightIntensityData?.[0];
  const latestCurrentAirHumidity = currentAirHumidityData?.[0];
  const latestCurrentWaterPump = currentWaterPumpData?.at(-1).tankFillLevel;

  const latestTemperaturePrediction = temperaturePredictionData?.[0];
  const latestSoilHumidityPrediction = soilHumidityPredictionData?.[0];
  const latestLightIntensityPrediction = lightIntensityPredictionData?.[0];
  const latestAirHumidityPrediction = airHumidityPredictionData?.[0];
  const latestWaterPumpPrediction = waterPumpPredictionData?.[0];

  const renderInsightCard = (title, to, content) => (
    <Link to={to} className="insight-card">
      <h2>{title}</h2>
      {content}
    </Link>
  );

  return (
    <div className="ml-insights-page">
      <TopBar notifications={notifications} />
      <div className="ml-insights-content">
        <h1>ML Insights</h1>

        <div className="insights-container">
          {renderInsightCard(
            "💧 Soil Moisture",
            "/graphs/watering-schedule",
            <>
              <p>
                Current soil humidity:{" "}
                {currentSoilLoading
                  ? "Loading..."
                  : latestCurrentSoilHumidity?.soilHumidity ??
                    "Data unavailable"}
              </p>
              <p>
                Predicted humidity:{" "}
                {soilPredictionLoading
                  ? "Loading..."
                  : latestSoilHumidityPrediction?.SoilHumidity ??
                    "No prediction"}
              </p>
              {latestSoilHumidityPrediction?.anomaly && (
                <p>Anomaly detected!</p>
              )}
            </>
          )}

          {renderInsightCard(
            "🌡️ Temperature",
            "/graphs/temperature",
            <>
              <p>
                Current temperature:{" "}
                {currentTempLoading
                  ? "Loading..."
                  : latestCurrentTemperature?.temperature ?? "Data unavailable"}
              </p>
              <p>
                Predicted temperature:{" "}
                {tempPredictionLoading
                  ? "Loading..."
                  : latestTemperaturePrediction?.Temperature ?? "No prediction"}
              </p>
              {latestTemperaturePrediction?.anomaly && <p>Anomaly detected!</p>}
            </>
          )}

          {renderInsightCard(
            "☀️ Light Exposure",
            "/graphs/light-exposure",
            <>
              <p>
                Current light intensity:{" "}
                {currentLightLoading
                  ? "Loading..."
                  : latestCurrentLightIntensity?.lightIntensity ??
                    "Data unavailable"}
              </p>
              <p>
                Predicted light intensity:{" "}
                {lightPredictionLoading
                  ? "Loading..."
                  : latestLightIntensityPrediction?.LightIntensity ??
                    "No prediction"}
              </p>
              {latestLightIntensityPrediction?.anomaly && (
                <p>Anomaly detected!</p>
              )}
            </>
          )}

          {renderInsightCard(
            "💨 Air Humidity",
            "/graphs/humidity",
            <>
              <p>
                Current air humidity:{" "}
                {currentAirLoading
                  ? "Loading..."
                  : latestCurrentAirHumidity?.airHumidity ?? "Data unavailable"}
              </p>
              <p>
                Predicted air humidity:{" "}
                {airPredictionLoading
                  ? "Loading..."
                  : latestAirHumidityPrediction?.AirHumidity ?? "No prediction"}
              </p>
              {latestAirHumidityPrediction?.anomaly && <p>Anomaly detected!</p>}
            </>
          )}

          {renderInsightCard(
            "🚰 Water Pump",
            "/graphs/water-pump",
            <>
              <p>
                Current level:{" "}
                {currentPumpLoading
                  ? "Loading..."
                  : latestCurrentWaterPump ?? "Data unavailable"}
              </p>
              <p>
                Predicted level:{" "}
                {pumpPredictionLoading
                  ? "Loading..."
                  : latestWaterPumpPrediction?.WaterPump ?? "No prediction"}
              </p>
              {latestWaterPumpPrediction?.anomaly && <p>Anomaly detected!</p>}
            </>
          )}
        </div>

        <p>Please click on a card to view detailed graphs.</p>
      </div>
    </div>
  );
}
