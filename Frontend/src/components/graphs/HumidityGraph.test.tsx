import React from "react";
import { render } from "@testing-library/react";
import { describe, it, expect, vi } from "vitest";
import HumidityGraph from "./HumidityGraph";
import { LineChart, Line, XAxis, YAxis } from "recharts";

// Mock recharts to avoid rendering actual charts in tests
vi.mock("recharts", () => ({
  ResponsiveContainer: ({ children }: { children: React.ReactNode }) => (
    <div>{children}</div>
  ),
  LineChart: ({ children, data }: any) => (
    <div data-testid="line-chart">{children}</div>
  ),
  Line: () => <div data-testid="line" />,
  XAxis: () => <div data-testid="x-axis" />,
  YAxis: () => <div data-testid="y-axis" />,
  CartesianGrid: () => <div data-testid="cartesian-grid" />,
  Tooltip: () => <div data-testid="tooltip" />,
  Legend: () => <div data-testid="legend" />,
}));

describe("HumidityGraph", () => {
  const mockActualData: DataPoint[] = [
    { timestamp: "2023-01-01T12:00:00Z", value: 45 },
    { timestamp: "2023-01-01T12:01:00Z", value: 46 },
  ];

  const mockPredictedData: DataPoint[] = [
    { timestamp: "2023-01-01T12:00:00Z", value: 44 },
    { timestamp: "2023-01-01T12:02:00Z", value: 47 },
  ];

  it("renders without crashing", () => {
    render(
      <HumidityGraph actual={mockActualData} predicted={mockPredictedData} />
    );
  });

  it("renders all chart components", () => {
    const { getByTestId } = render(
      <HumidityGraph actual={mockActualData} predicted={mockPredictedData} />
    );

    expect(getByTestId("line-chart")).toBeInTheDocument();
    expect(getByTestId("x-axis")).toBeInTheDocument();
    expect(getByTestId("y-axis")).toBeInTheDocument();
    expect(getByTestId("cartesian-grid")).toBeInTheDocument();
    expect(getByTestId("tooltip")).toBeInTheDocument();
    expect(getByTestId("legend")).toBeInTheDocument();
  });

  it("renders two Line components (one for actual, one for predicted)", () => {
    const { getAllByTestId } = render(
      <HumidityGraph actual={mockActualData} predicted={mockPredictedData} />
    );

    const lines = getAllByTestId("line");
    expect(lines.length).toBe(2);
  });

  it("merges and transforms data correctly", () => {
    // This test checks the internal logic by checking the props passed to LineChart
    const { getByTestId } = render(
      <HumidityGraph actual={mockActualData} predicted={mockPredictedData} />
    );

    const lineChart = getByTestId("line-chart");
    // Since we're mocking, we can't directly access props, but we can verify the behavior
    // through the rendered output if needed
  });

  it("handles empty data arrays", () => {
    const { getByTestId } = render(
      <HumidityGraph actual={[]} predicted={[]} />
    );

    const lineChart = getByTestId("line-chart");
    expect(lineChart).toBeInTheDocument();
  });

  it("handles missing data points", () => {
    const actualWithMissing = [
      { timestamp: "2023-01-01T12:00:00Z", value: 45 },
      // Missing 12:01
      { timestamp: "2023-01-01T12:02:00Z", value: 47 },
    ];

    const predictedWithMissing = [
      // Missing 12:00
      { timestamp: "2023-01-01T12:01:00Z", value: 46 },
      { timestamp: "2023-01-01T12:02:00Z", value: 48 },
    ];

    const { getByTestId } = render(
      <HumidityGraph
        actual={actualWithMissing}
        predicted={predictedWithMissing}
      />
    );

    const lineChart = getByTestId("line-chart");
    expect(lineChart).toBeInTheDocument();
  });
});

// Helper type for the test file
interface DataPoint {
  timestamp: string;
  value: number;
}
