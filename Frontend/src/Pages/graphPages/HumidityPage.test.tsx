import React from "react";
import { describe, it, expect, vi, beforeEach } from "vitest";
import { render, screen } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";
import HumidityPage from "./HumidityPage";

vi.mock("../../Hooks/ml/useMLAirHumidity", () => ({
  useGetMLAirHumidity: vi.fn(),
}));

vi.mock("../../Hooks/useAirHumidity", () => ({
  useGetAllAirHumidity: vi.fn(),
}));

vi.mock("../../components/graphs/HumidityGraph", () => ({
  __esModule: true,
  default: ({ actual, predicted }: any) => (
    <div data-testid="humidity-graph">
      Graph rendered with {actual.length} actual and {predicted.length}{" "}
      predicted
    </div>
  ),
}));

import { useGetMLAirHumidity } from "../../Hooks/ml/useMLAirHumidity";
import { useGetAllAirHumidity } from "../../Hooks/useAirHumidity";

describe("HumidityPage", () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it("shows loading when fetching data", () => {
    (useGetMLAirHumidity as any).mockReturnValue({
      data: null,
      isLoading: true,
    });
    (useGetAllAirHumidity as any).mockReturnValue({
      data: null,
      isLoading: true,
    });

    render(<HumidityPage />, { wrapper: MemoryRouter });

    expect(screen.getByText(/Loading data/i)).toBeInTheDocument();
  });

  it("shows error when fetch fails", () => {
    (useGetMLAirHumidity as any).mockReturnValue({
      data: null,
      isLoading: false,
      error: { message: "Prediction failed" },
    });
    (useGetAllAirHumidity as any).mockReturnValue({
      data: null,
      isLoading: false,
      error: null,
    });

    render(<HumidityPage />, { wrapper: MemoryRouter });

    expect(screen.getByText(/Error: Prediction failed/i)).toBeInTheDocument();
  });

  it("shows 'no data' fallback when both series are empty", () => {
    (useGetMLAirHumidity as any).mockReturnValue({
      data: [],
      isLoading: false,
      error: null,
    });
    (useGetAllAirHumidity as any).mockReturnValue({
      data: [],
      isLoading: false,
      error: null,
    });

    render(<HumidityPage />, { wrapper: MemoryRouter });

    expect(screen.getByText(/No humidity data available/i)).toBeInTheDocument();
  });

  it("renders graph with actual and predicted data", () => {
    (useGetMLAirHumidity as any).mockReturnValue({
      data: [{ Timestamp: "2025-05-24T10:00:00Z", AirHumidity: 50 }],
      isLoading: false,
      error: null,
    });

    (useGetAllAirHumidity as any).mockReturnValue({
      data: [{ timestamp: "2025-05-24T10:00:00Z", airHumidity: 45 }],
      isLoading: false,
      error: null,
    });

    render(<HumidityPage />, { wrapper: MemoryRouter });

    expect(screen.getByTestId("humidity-graph")).toHaveTextContent(
      /Graph rendered with 1 actual and 1 predicted/i
    );
  });

  it("renders 'Back to Insights' link", () => {
    (useGetMLAirHumidity as any).mockReturnValue({
      data: [],
      isLoading: false,
      error: null,
    });
    (useGetAllAirHumidity as any).mockReturnValue({
      data: [],
      isLoading: false,
      error: null,
    });

    render(<HumidityPage />, { wrapper: MemoryRouter });

    expect(
      screen.getByRole("link", { name: /Back to Insights/i })
    ).toBeInTheDocument();
  });
});
