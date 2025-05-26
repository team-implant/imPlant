import { render, screen, waitFor } from "@testing-library/react";
import { describe, it, expect, vi, beforeEach, afterEach } from "vitest";
import InsightsPanel from "./InsightsPanel";
import { useMeasurements } from "../Hooks/useMeasurement";
import { useGetMLTemperaturePredictions } from "../Hooks/ml/useMLTemperature";
import { useGetMLSoilHumidityPredictions } from "../Hooks/ml/useMLSoilHumidity";
import { useGetMLLightIntensityPredictions } from "../Hooks/ml/useMLLightIntensity";
import { useGetMLWaterPumpPredictions } from "../Hooks/ml/useMLWaterPump";
import { MeasurementData } from "../Hooks/useMeasurement";

// Mock the hooks
vi.mock("../Hooks/useMeasurement");
vi.mock("../Hooks/ml/useMLTemperature");
vi.mock("../Hooks/ml/useMLSoilHumidity");
vi.mock("../Hooks/ml/useMLLightIntensity");
vi.mock("../Hooks/ml/useMLWaterPump");

const mockUseMeasurements = vi.mocked(useMeasurements);
const mockUseGetMLTemperaturePredictions = vi.mocked(
  useGetMLTemperaturePredictions
);
const mockUseGetMLSoilHumidityPredictions = vi.mocked(
  useGetMLSoilHumidityPredictions
);
const mockUseGetMLLightIntensityPredictions = vi.mocked(
  useGetMLLightIntensityPredictions
);
const mockUseGetMLWaterPumpPredictions = vi.mocked(
  useGetMLWaterPumpPredictions
);

describe("InsightsPanel", () => {
  beforeEach(() => {
    // Clear all mocks before each test
    vi.clearAllMocks();

    // Set default mock implementations with proper types
    mockUseMeasurements.mockReturnValue({
      data: undefined,
      isLoading: true,
      error: null,
      isError: false,
    } as any);

    mockUseGetMLTemperaturePredictions.mockReturnValue({
      data: undefined,
      isLoading: true,
      error: null,
      isError: false,
    } as any);

    mockUseGetMLSoilHumidityPredictions.mockReturnValue({
      data: undefined,
      isLoading: true,
      error: null,
      isError: false,
    } as any);

    mockUseGetMLLightIntensityPredictions.mockReturnValue({
      data: undefined,
      isLoading: true,
      error: null,
      isError: false,
    } as any);

    mockUseGetMLWaterPumpPredictions.mockReturnValue({
      data: undefined,
      isLoading: true,
      error: null,
      isError: false,
    } as any);
  });

  afterEach(() => {
    // Cleanup
    vi.useRealTimers();
  });

  it("renders loading state initially", () => {
    render(<InsightsPanel />);
    expect(screen.getByText(/Loading/i)).toBeInTheDocument();
  });

  it("shows loading dots animation", async () => {
    vi.useFakeTimers();
    render(<InsightsPanel />);

    expect(screen.getByText("Loading")).toBeInTheDocument();

    await vi.advanceTimersByTimeAsync(500);
    expect(screen.getByText("Loading.")).toBeInTheDocument();

    await vi.advanceTimersByTimeAsync(500);
    expect(screen.getByText("Loading..")).toBeInTheDocument();

    await vi.advanceTimersByTimeAsync(500);
    expect(screen.getByText("Loading...")).toBeInTheDocument();

    await vi.advanceTimersByTimeAsync(500);
    expect(screen.getByText("Loading")).toBeInTheDocument(); // Resets after 3 dots
  });

  it("shows error message after 10 seconds if data doesn't load", async () => {
    vi.useFakeTimers();
    render(<InsightsPanel />);

    expect(screen.queryByText(/Failed to load data/i)).not.toBeInTheDocument();

    await vi.advanceTimersByTimeAsync(10000);
    expect(screen.getByText(/Failed to load data/i)).toBeInTheDocument();
  });

  it("shows data when all hooks return data", async () => {
    const mockMeasurements: MeasurementData[] = [
      {
        temperature: 25,
        soilHumidity: 60,
        lightIntensity: 800,
        tankFillLevel: 75,
        id: 1,
        timestamp: new Date().toISOString(),
        airHumidity: 50,
        plantId: null,
        plant: null,
      },
    ];

    const mockTempPrediction = [{ Temperature: 26 }];
    const mockSoilPrediction = [{ SoilHumidity: 58 }];
    const mockLightPrediction = [{ LightIntensity: 820 }];
    const mockPumpPrediction = [{ WaterPump: 70 }];

    mockUseMeasurements.mockReturnValue({
      data: mockMeasurements,
      isLoading: false,
      error: null,
      isError: false,
    } as any);

    mockUseGetMLTemperaturePredictions.mockReturnValue({
      data: mockTempPrediction,
      isLoading: false,
      error: null,
      isError: false,
    } as any);

    mockUseGetMLSoilHumidityPredictions.mockReturnValue({
      data: mockSoilPrediction,
      isLoading: false,
      error: null,
      isError: false,
    } as any);

    mockUseGetMLLightIntensityPredictions.mockReturnValue({
      data: mockLightPrediction,
      isLoading: false,
      error: null,
      isError: false,
    } as any);

    mockUseGetMLWaterPumpPredictions.mockReturnValue({
      data: mockPumpPrediction,
      isLoading: false,
      error: null,
      isError: false,
    } as any);

    render(<InsightsPanel />);

    await waitFor(() => {
      expect(screen.getByText("🌡️ Temperature: 25")).toBeInTheDocument();
      expect(screen.getByText("Predicted: 26")).toBeInTheDocument();

      expect(screen.getByText("💧 Soil moisture: 60")).toBeInTheDocument();
      expect(screen.getByText("Predicted: 58")).toBeInTheDocument();

      expect(screen.getByText("☀️ Light intensity: 800")).toBeInTheDocument();
      expect(screen.getByText("Predicted: 820")).toBeInTheDocument();

      expect(screen.getByText("🚰 Water pump level: 75")).toBeInTheDocument();
      expect(screen.getByText("Predicted: 70")).toBeInTheDocument();
    });
  });
});
