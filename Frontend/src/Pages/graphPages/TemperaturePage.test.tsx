import React from "react";
import { describe, it, expect, vi, beforeEach } from "vitest";
import { render, screen } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";
import TemperaturePage from "./TemperaturePage";

// Mock TemperatureGraph
vi.mock("../../components/graphs/TemperatureGraph", () => ({
  __esModule: true,
  default: ({ actual, predicted }: any) => (
    <div data-testid="temperature-graph">
      Actual: {actual.length}, Predicted: {predicted.length}
    </div>
  ),
}));

// Mock the data hooks
vi.mock("../../Hooks/ml/useMLTemperature", () => ({
  useGetMLTemperaturePredictions: vi.fn(),
}));

vi.mock("../../Hooks/useGetTemperature", () => ({
  useGetAllTemperatures: vi.fn(),
}));

import { useGetMLTemperaturePredictions } from "../../Hooks/ml/useMLTemperature";
import { useGetAllTemperatures } from "../../Hooks/useGetTemperature";

describe("TemperaturePage", () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it("shows loading state", () => {
    (useGetMLTemperaturePredictions as any).mockReturnValue({
      data: null,
      isLoading: true,
      error: null,
    });
    (useGetAllTemperatures as any).mockReturnValue({
      data: null,
      isLoading: true,
      error: null,
    });

    render(<TemperaturePage />, { wrapper: MemoryRouter });
    expect(screen.getByText(/Loading data/i)).toBeInTheDocument();
  });

  it("renders graph with merged data", () => {
    (useGetMLTemperaturePredictions as any).mockReturnValue({
      data: [
        { Timestamp: "2025-05-24T12:00:00Z", Temperature: 25 },
        { Timestamp: "2025-05-24T12:05:00Z", Temperature: 26 },
      ],
      isLoading: false,
      error: null,
    });

    (useGetAllTemperatures as any).mockReturnValue({
      data: [
        { timestamp: "2025-05-24T12:00:00Z", temperature: 23 },
        { timestamp: "2025-05-24T12:05:00Z", temperature: 24 },
      ],
      isLoading: false,
      error: null,
    });

    render(<TemperaturePage />, { wrapper: MemoryRouter });

    const graph = screen.getByTestId("temperature-graph");
    expect(graph).toHaveTextContent("Actual: 2, Predicted: 2");
  });

  it("renders back link", () => {
    (useGetMLTemperaturePredictions as any).mockReturnValue({
      data: [],
      isLoading: false,
      error: null,
    });

    (useGetAllTemperatures as any).mockReturnValue({
      data: [],
      isLoading: false,
      error: null,
    });

    render(<TemperaturePage />, { wrapper: MemoryRouter });

    expect(
      screen.getByRole("link", { name: /Back to Insights/i })
    ).toBeInTheDocument();
  });
});
