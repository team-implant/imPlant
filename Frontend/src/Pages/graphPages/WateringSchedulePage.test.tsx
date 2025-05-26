import React from "react";
import { describe, it, expect, vi, beforeEach } from "vitest";
import { render, screen } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";
import WateringSchedulePage from "./WateringSchedulePage";
import { useGetMLSoilHumidityPredictions } from "../../Hooks/ml/useMLSoilHumidity";
import { useGetAllSoilHumidity } from "../../Hooks/useSoilHumidity";

// Mock the hooks
vi.mock("../../Hooks/ml/useMLSoilHumidity", () => ({
  useGetMLSoilHumidityPredictions: vi.fn(),
}));

vi.mock("../../Hooks/useSoilHumidity", () => ({
  useGetAllSoilHumidity: vi.fn(),
}));

// Mock the graph component to simplify DOM testing
vi.mock("../../components/graphs/WateringScheduleGraph", () => ({
  default: () => <div data-testid="watering-schedule-graph" />,
}));

describe("WateringSchedulePage", () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it("renders the graph with actual and predicted data", () => {
    (useGetMLSoilHumidityPredictions as any).mockReturnValue({
      data: [{ Timestamp: "2025-05-24T10:00:00Z", SoilHumidity: 50 }],
      isLoading: false,
      error: null,
    });

    (useGetAllSoilHumidity as any).mockReturnValue({
      data: [{ timestamp: "2025-05-24T10:00:00Z", soilHumidity: 45 }],
      isLoading: false,
      error: null,
    });

    render(<WateringSchedulePage />, { wrapper: MemoryRouter });

    expect(
      screen.getByText("Soil Moisture: Actual vs Predicted")
    ).toBeInTheDocument();
    expect(screen.getByTestId("watering-schedule-graph")).toBeInTheDocument();
  });

  it("shows loading state", () => {
    (useGetMLSoilHumidityPredictions as any).mockReturnValue({
      data: null,
      isLoading: true,
      error: null,
    });

    (useGetAllSoilHumidity as any).mockReturnValue({
      data: null,
      isLoading: true,
      error: null,
    });

    render(<WateringSchedulePage />, { wrapper: MemoryRouter });

    expect(screen.getByText(/Loading data.../i)).toBeInTheDocument();
  });

  it("does not render graph if no data", () => {
    (useGetMLSoilHumidityPredictions as any).mockReturnValue({
      data: [],
      isLoading: false,
      error: null,
    });

    (useGetAllSoilHumidity as any).mockReturnValue({
      data: [],
      isLoading: false,
      error: null,
    });

    render(<WateringSchedulePage />, { wrapper: MemoryRouter });

    expect(
      screen.queryByTestId("watering-schedule-graph")
    ).not.toBeInTheDocument();
    expect(
      screen.queryByText("No watering data available")
    ).not.toBeInTheDocument();
  });
});
