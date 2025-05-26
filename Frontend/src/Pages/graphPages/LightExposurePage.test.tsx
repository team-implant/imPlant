import React from "react";
import { describe, it, expect, vi, beforeEach } from "vitest";
import { render, screen } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";
import LightExposurePage from "./LightExposurePage";

// Mock hooks and component
vi.mock("../../Hooks/ml/useMLLightIntensity", () => ({
  useGetMLLightIntensityPredictions: vi.fn(),
}));

vi.mock("../../Hooks/useGetLightIntensity", () => ({
  useGetAllLightIntensity: vi.fn(),
}));

vi.mock("../../components/graphs/LightExposureGraph", () => ({
  __esModule: true,
  default: ({ actual, predicted }: any) => (
    <div data-testid="light-graph">
      Graph rendered with {actual.length} actual and {predicted.length}{" "}
      predicted
    </div>
  ),
}));

import { useGetMLLightIntensityPredictions } from "../../Hooks/ml/useMLLightIntensity";
import { useGetAllLightIntensity } from "../../Hooks/useGetLightIntensity";

describe("LightExposurePage", () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it("shows loading state", () => {
    (useGetMLLightIntensityPredictions as any).mockReturnValue({
      data: null,
      isLoading: true,
    });
    (useGetAllLightIntensity as any).mockReturnValue({
      data: null,
      isLoading: true,
    });

    render(<LightExposurePage />, { wrapper: MemoryRouter });
    expect(screen.getByText(/Loading data/i)).toBeInTheDocument();
  });

  it("shows error state", () => {
    (useGetMLLightIntensityPredictions as any).mockReturnValue({
      data: null,
      isLoading: false,
      error: { message: "Prediction error" },
    });
    (useGetAllLightIntensity as any).mockReturnValue({
      data: null,
      isLoading: false,
      error: null,
    });

    render(<LightExposurePage />, { wrapper: MemoryRouter });
    expect(screen.getByText(/Error: Prediction error/i)).toBeInTheDocument();
  });

  it("renders fallback when no data", () => {
    (useGetMLLightIntensityPredictions as any).mockReturnValue({
      data: [],
      isLoading: false,
      error: null,
    });
    (useGetAllLightIntensity as any).mockReturnValue({
      data: [],
      isLoading: false,
      error: null,
    });

    render(<LightExposurePage />, { wrapper: MemoryRouter });
    expect(
      screen.getByText(/No light exposure data available/i)
    ).toBeInTheDocument();
  });

  it("renders graph with actual and predicted data", () => {
    (useGetMLLightIntensityPredictions as any).mockReturnValue({
      data: [{ Timestamp: "2025-05-24T10:00:00Z", LightIntensity: 500 }],
      isLoading: false,
      error: null,
    });
    (useGetAllLightIntensity as any).mockReturnValue({
      data: [{ timestamp: "2025-05-24T10:00:00Z", lightIntensity: 450 }],
      isLoading: false,
      error: null,
    });

    render(<LightExposurePage />, { wrapper: MemoryRouter });
    expect(screen.getByTestId("light-graph")).toHaveTextContent(
      /Graph rendered with 1 actual and 1 predicted/i
    );
  });

  it("renders 'Back to Insights' link", () => {
    (useGetMLLightIntensityPredictions as any).mockReturnValue({
      data: [],
      isLoading: false,
      error: null,
    });
    (useGetAllLightIntensity as any).mockReturnValue({
      data: [],
      isLoading: false,
      error: null,
    });

    render(<LightExposurePage />, { wrapper: MemoryRouter });
    expect(
      screen.getByRole("link", { name: /Back to Insights/i })
    ).toBeInTheDocument();
  });
});
