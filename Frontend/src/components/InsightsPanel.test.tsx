import React from "react";
import { render, screen, waitFor } from "@testing-library/react";
import { describe, it, vi, expect, beforeEach, afterEach } from "vitest";
import InsightsPanel from "./InsightsPanel";

// ✅ Scenario 1: Fully mock data — used to test rendered values
vi.mock("../Hooks/ml/useMLTemperature", () => ({
  useGetMLTemperaturePredictions: () => ({ data: [{ Temperature: 25 }] }),
}));
vi.mock("../Hooks/ml/useMLSoilHumidity", () => ({
  useGetMLSoilHumidityPredictions: () => ({ data: [{ SoilHumidity: 55 }] }),
}));
vi.mock("../Hooks/ml/useMLLightIntensity", () => ({
  useGetMLLightIntensityPredictions: () => ({
    data: [{ LightIntensity: 500 }],
  }),
}));
vi.mock("../Hooks/ml/useMLWaterPump", () => ({
  useGetMLWaterPumpPredictions: () => ({
    data: [
      { prediction: 60, anomaly: false, recommendation: "Maintain level" },
    ],
  }),
}));

vi.mock("../Hooks/useGetTemperature", () => ({
  useGetAllTemperatures: () => ({ data: [{ temperature: 23 }] }),
}));
vi.mock("../Hooks/useSoilHumidity", () => ({
  useGetAllSoilHumidity: () => ({ data: [{ soilHumidity: 52 }] }),
}));
vi.mock("../Hooks/useGetLightIntensity", () => ({
  useGetAllLightIntensity: () => ({ data: [{ lightIntensity: 400 }] }),
}));

describe("InsightsPanel", () => {
  beforeEach(() => {
    vi.useFakeTimers();
  });

  it("renders current and predicted values", async () => {
    render(<InsightsPanel />);
    await waitFor(() => {
      expect(screen.getByText("🌡️ Temperature: 23")).toBeInTheDocument();
      expect(screen.getByText(/Predicted: 25/)).toBeInTheDocument();
      expect(screen.getByText("💧 Soil moisture: 52")).toBeInTheDocument();
      expect(screen.getByText(/Predicted: 55/)).toBeInTheDocument();
      expect(screen.getByText("☀️ Light intensity: 400")).toBeInTheDocument();
      expect(screen.getByText(/Predicted: 500/)).toBeInTheDocument();
      expect(screen.getByText("Maintain level")).toBeInTheDocument();
    });
  });

  afterEach(() => {
    vi.clearAllMocks();
    vi.useRealTimers();
  });
});
