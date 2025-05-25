import React from "react";
import { render } from "@testing-library/react";
import { describe, it, expect, vi } from "vitest";
import TemperatureGraph from "./TemperatureGraph";

// Mock recharts to isolate rendering
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

describe("TemperatureGraph", () => {
  const actualData = [
    { timestamp: "2025-05-24T10:00:00Z", value: 20 },
    { timestamp: "2025-05-24T10:01:00Z", value: 21 },
  ];

  const predictedData = [
    { timestamp: "2025-05-24T10:00:00Z", value: 22 },
    { timestamp: "2025-05-24T10:02:00Z", value: 23 },
  ];

  it("renders without crashing", () => {
    render(<TemperatureGraph actual={actualData} predicted={predictedData} />);
  });

  it("renders all chart elements", () => {
    const { getByTestId } = render(
      <TemperatureGraph actual={actualData} predicted={predictedData} />
    );

    expect(getByTestId("line-chart")).toBeInTheDocument();
    expect(getByTestId("x-axis")).toBeInTheDocument();
    expect(getByTestId("y-axis")).toBeInTheDocument();
    expect(getByTestId("cartesian-grid")).toBeInTheDocument();
    expect(getByTestId("tooltip")).toBeInTheDocument();
    expect(getByTestId("legend")).toBeInTheDocument();
  });

  it("renders exactly two line components", () => {
    const { getAllByTestId } = render(
      <TemperatureGraph actual={actualData} predicted={predictedData} />
    );

    const lines = getAllByTestId("line");
    expect(lines.length).toBe(2);
  });

  it("handles empty data without crashing", () => {
    const { getByTestId } = render(
      <TemperatureGraph actual={[]} predicted={[]} />
    );

    expect(getByTestId("line-chart")).toBeInTheDocument();
  });

  it("handles gaps in actual/predicted data", () => {
    const actualGap = [
      { timestamp: "2025-05-24T10:00:00Z", value: 20 },
      { timestamp: "2025-05-24T10:02:00Z", value: 22 },
    ];

    const predictedGap = [
      { timestamp: "2025-05-24T10:01:00Z", value: 21 },
      { timestamp: "2025-05-24T10:02:00Z", value: 23 },
    ];

    const { getByTestId } = render(
      <TemperatureGraph actual={actualGap} predicted={predictedGap} />
    );

    expect(getByTestId("line-chart")).toBeInTheDocument();
  });
});
