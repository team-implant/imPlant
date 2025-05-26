import React from "react";
import { render, screen, fireEvent } from "@testing-library/react";
import { describe, it, expect, vi } from "vitest";
import ChartPanel from "./ChartPanel";

// Mock react-chartjs-2 Line component
vi.mock("react-chartjs-2", () => ({
  Line: ({ data, options }: any) => (
    <div data-testid="line-chart">
      <span data-testid="mock-title">{options?.plugins?.title?.text}</span>
      <span data-testid="mock-dataset">
        Dataset length: {data.datasets[0].data.length}
      </span>
    </div>
  ),
}));

describe("ChartPanel", () => {
  const mockData = {
    labels: ["10:00", "10:10", "10:20"],
    values: [23, 45, 67],
  };

  const title = "Test Chart";

  it("renders chart title in <h3>", () => {
    render(<ChartPanel title={title} data={mockData} />);
    const heading = screen.getByRole("heading", { level: 3, name: title });
    expect(heading).toBeInTheDocument();
  });

  it("renders Line chart", () => {
    render(<ChartPanel title={title} data={mockData} />);
    expect(screen.getByTestId("line-chart")).toBeInTheDocument();
  });

  it("adds enlarged class when isEnlarged is true", () => {
    const { container } = render(
      <ChartPanel title={title} data={mockData} isEnlarged />
    );
    expect(container.firstChild).toHaveClass("chart-panel enlarged");
  });

  it("calls onClick when chart is clicked", () => {
    const handleClick = vi.fn();
    render(<ChartPanel title={title} data={mockData} onClick={handleClick} />);
    const heading = screen.getByRole("heading", { level: 3 });
    fireEvent.click(heading);
    expect(handleClick).toHaveBeenCalled();
  });

  it("renders mock chart with correct data length", () => {
    render(<ChartPanel title={title} data={mockData} />);
    expect(screen.getByTestId("mock-dataset")).toHaveTextContent(
      "Dataset length: 3"
    );
  });
});
