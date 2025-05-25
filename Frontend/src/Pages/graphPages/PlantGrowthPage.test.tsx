import React from "react";
import { describe, it, expect, vi, beforeEach } from "vitest";
import { render, screen } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";
import PlantGrowthPage from "./PlantGrowthPage";

// Mock the hook and component
vi.mock("../../Hooks/ml/useMLMeasurement", () => ({
  useGetMLMeasurements: vi.fn(),
}));

vi.mock("../../components/graphs/PlantGrowthGraph", () => ({
  __esModule: true,
  default: ({ data }: any) => (
    <div data-testid="growth-graph">Rendered with {data.length} points</div>
  ),
}));

import { useGetMLMeasurements } from "../../Hooks/ml/useMLMeasurement";

describe("PlantGrowthPage", () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it("displays loading state", () => {
    (useGetMLMeasurements as any).mockReturnValue({
      data: null,
      isLoading: true,
      error: null,
    });

    render(<PlantGrowthPage />, { wrapper: MemoryRouter });
    expect(screen.getByText(/Loading data/i)).toBeInTheDocument();
  });

  it("displays error message", () => {
    (useGetMLMeasurements as any).mockReturnValue({
      data: null,
      isLoading: false,
      error: { message: "Something went wrong" },
    });

    render(<PlantGrowthPage />, { wrapper: MemoryRouter });
    expect(
      screen.getByText(/Error: Something went wrong/i)
    ).toBeInTheDocument();
  });

  it("renders graph with plant growth data", () => {
    (useGetMLMeasurements as any).mockReturnValue({
      data: [
        {
          timestamp: "2025-05-24T10:00:00Z",
          temperature: 24,
          soilMoisture: 60,
          lightIntensity: 500,
        },
      ],
      isLoading: false,
      error: null,
    });

    render(<PlantGrowthPage />, { wrapper: MemoryRouter });
    expect(screen.getByTestId("growth-graph")).toHaveTextContent(
      "Rendered with 1 points"
    );
  });

  it("renders back link", () => {
    (useGetMLMeasurements as any).mockReturnValue({
      data: [],
      isLoading: false,
      error: null,
    });

    render(<PlantGrowthPage />, { wrapper: MemoryRouter });
    expect(
      screen.getByRole("link", { name: /Back to Insights/i })
    ).toBeInTheDocument();
  });
});
