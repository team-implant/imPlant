import React from "react";
import { render } from "@testing-library/react";
import { describe, it, expect, vi } from "vitest";
import LightExposureGraph from "./LightExposureGraph";

// Mock recharts to avoid rendering actual charts in tests
vi.mock("recharts", () => ({
  ResponsiveContainer: ({ children }: { children: React.ReactNode }) => (
    <div>{children}</div>
  ),
  LineChart: ({ children }: any) => (
    <div data-testid="line-chart">{children}</div>
  ),
  Line: () => <div data-testid="line" />,
  XAxis: () => <div data-testid="x-axis" />,
  YAxis: () => <div data-testid="y-axis" />,
  CartesianGrid: () => <div data-testid="cartesian-grid" />,
  Tooltip: () => <div data-testid="tooltip" />,
  Legend: () => <div data-testid="legend" />,
}));

describe("LightExposureGraph", () => {
  const mockActualData: DataPoint[] = [
    { timestamp: "2023-01-01T12:00:00Z", value: 200 },
    { timestamp: "2023-01-01T12:01:00Z", value: 210 },
  ];

  const mockPredictedData: DataPoint[] = [
    { timestamp: "2023-01-01T12:00:00Z", value: 220 },
    { timestamp: "2023-01-01T12:02:00Z", value: 230 },
  ];

  it("renders without crashing", () => {
    render(
      <LightExposureGraph
        actual={mockActualData}
        predicted={mockPredictedData}
      />
    );
  });

  it("renders all chart components", () => {
    const { getByTestId } = render(
      <LightExposureGraph
        actual={mockActualData}
        predicted={mockPredictedData}
      />
    );

    expect(getByTestId("line-chart")).toBeInTheDocument();
    expect(getByTestId("x-axis")).toBeInTheDocument();
    expect(getByTestId("y-axis")).toBeInTheDocument();
    expect(getByTestId("cartesian-grid")).toBeInTheDocument();
    expect(getByTestId("tooltip")).toBeInTheDocument();
    expect(getByTestId("legend")).toBeInTheDocument();
  });

  it("renders two Line components (actual and predicted)", () => {
    const { getAllByTestId } = render(
      <LightExposureGraph
        actual={mockActualData}
        predicted={mockPredictedData}
      />
    );

    const lines = getAllByTestId("line");
    expect(lines.length).toBe(2);
  });

  it("handles empty data arrays", () => {
    const { getByTestId } = render(
      <LightExposureGraph actual={[]} predicted={[]} />
    );

    const chart = getByTestId("line-chart");
    expect(chart).toBeInTheDocument();
  });

  it("handles missing data points", () => {
    const actualWithGap = [
      { timestamp: "2023-01-01T12:00:00Z", value: 190 },
      { timestamp: "2023-01-01T12:02:00Z", value: 195 },
    ];

    const predictedWithGap = [
      { timestamp: "2023-01-01T12:01:00Z", value: 200 },
      { timestamp: "2023-01-01T12:02:00Z", value: 210 },
    ];

    const { getByTestId } = render(
      <LightExposureGraph actual={actualWithGap} predicted={predictedWithGap} />
    );

    expect(getByTestId("line-chart")).toBeInTheDocument();
  });
});

// Helper type for test
interface DataPoint {
  timestamp: string;
  value: number;
}
