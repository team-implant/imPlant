import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import "../styles/CustomizeThresholds.css";
import TopBar from "../components/TopBar";

type ThresholdKey =
  | "temperature"
  | "humidity"
  | "soilMoisture"
  | "lightIntensity";

interface ThresholdRange {
  min: number;
  max: number;
}

type PlantThresholds = {
  [plantId: number]: {
    [key in ThresholdKey]: ThresholdRange;
  };
};

interface Notification {
  message: string;
}

const defaultThresholds: PlantThresholds = {
  1: {
    temperature: { min: 20, max: 35 },
    humidity: { min: 40, max: 70 },
    soilMoisture: { min: 30, max: 70 },
    lightIntensity: { min: 200, max: 800 },
  },
  2: {
    temperature: { min: 21, max: 30 },
    humidity: { min: 50, max: 80 },
    soilMoisture: { min: 40, max: 80 },
    lightIntensity: { min: 150, max: 600 },
  },
};

export default function CustomizeThresholds() {
  const [selectedPlantId, setSelectedPlantId] = useState<number>(1);
  const [thresholds, setThresholds] = useState<PlantThresholds>({
    ...defaultThresholds,
  });
  const [notifications, setNotifications] = useState<Notification[]>([]);

  useEffect(() => {
    const stored = localStorage.getItem("thresholds");
    if (stored) {
      try {
        const parsed = JSON.parse(stored);
        if (typeof parsed === "object" && parsed !== null) {
          setThresholds((prev) => ({ ...prev, ...parsed }));
        }
      } catch {
        console.warn(
          "Invalid threshold format in localStorage. Using defaults."
        );
      }
    }
  }, []);

  const handleChange = (
    key: ThresholdKey,
    field: keyof ThresholdRange,
    value: number
  ) => {
    setThresholds((prev) => ({
      ...prev,
      [selectedPlantId]: {
        ...prev[selectedPlantId],
        [key]: {
          ...prev[selectedPlantId][key],
          [field]: value,
        },
      },
    }));
  };

  const handleSave = () => {
    localStorage.setItem("thresholds", JSON.stringify(thresholds));
    setNotifications((prev) => [
      ...prev,
      { message: "Thresholds saved successfully" },
    ]);
  };

  const currentThresholds = thresholds[selectedPlantId];

  return (
    <div className="customize-thresholds-page">
      <TopBar notifications={notifications as any} />
      <div className="customize-thresholds-content">
        <h1>Customise Thresholds</h1>

        <div className="plant-selector">
          <label htmlFor="plant-select">Select Plant: </label>
          <select
            id="plant-select"
            value={selectedPlantId}
            onChange={(e) => setSelectedPlantId(Number(e.target.value))}
          >
            <option value={1}>Bell Pepper</option>
            <option value={2}>Chestnut</option>
          </select>
        </div>

        <div className="thresholds-form">
          {(
            Object.entries(currentThresholds) as [
              ThresholdKey,
              ThresholdRange
            ][]
          ).map(([key, range]) => (
            <div key={key} className="threshold-input block-label">
              <label
                style={{
                  fontWeight: "bold",
                  display: "block",
                  marginBottom: "5px",
                }}
              >
                {key}{" "}
                <span style={{ fontSize: "0.9rem", color: "#888" }}>
                  (min - max)
                </span>
              </label>
              <div style={{ display: "flex", gap: "10px" }}>
                <input
                  type="number"
                  value={range.min}
                  onChange={(e) =>
                    handleChange(key, "min", Number(e.target.value))
                  }
                  placeholder="Min"
                />
                <input
                  type="number"
                  value={range.max}
                  onChange={(e) =>
                    handleChange(key, "max", Number(e.target.value))
                  }
                  placeholder="Max"
                />
              </div>
            </div>
          ))}

          <button className="save-button" onClick={handleSave}>
            Save Thresholds
          </button>
        </div>
      </div>
    </div>
  );
}
