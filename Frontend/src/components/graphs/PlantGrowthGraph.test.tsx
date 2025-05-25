import React from "react";
import { render } from "@testing-library/react";
import { describe, it, expect, vi } from "vitest";
import PlantGrowthGraph from "./PlantGrowthGraph";

// Mock Recharts to isolate component behavior in tests
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

describe("PlantGrowthGraph", () => {
  const sampleData = [
    { timestamp: "2025-05-24T10:00:00Z", growth: 10, prediction: 12 },
    { timestamp: "2025-05-24T10:05:00Z", growth: 15, prediction: 14 },
  ];

  it("renders without crashing", () => {
    render(<PlantGrowthGraph data={sampleData} />);
  });

  it("renders all recharts components", () => {
    const { getByTestId } = render(<PlantGrowthGraph data={sampleData} />);
    expect(getByTestId("line-chart")).toBeInTheDocument();
    expect(getByTestId("x-axis")).toBeInTheDocument();
    expect(getByTestId("y-axis")).toBeInTheDocument();
    expect(getByTestId("cartesian-grid")).toBeInTheDocument();
    expect(getByTestId("tooltip")).toBeInTheDocument();
    expect(getByTestId("legend")).toBeInTheDocument();
  });

  it("renders two Line components", () => {
    const { getAllByTestId } = render(<PlantGrowthGraph data={sampleData} />);
    const lines = getAllByTestId("line");
    expect(lines.length).toBe(2);
  });

  it("handles empty data gracefully", () => {
    const { getByTestId } = render(<PlantGrowthGraph data={[]} />);
    expect(getByTestId("line-chart")).toBeInTheDocument();
  });
});
