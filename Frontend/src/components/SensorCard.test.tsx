import React from "react";
import { render, screen } from "@testing-library/react";
import { describe, it, expect } from "vitest";
import SensorCard from "./SensorCard";

describe("SensorCard", () => {
  const defaultProps = {
    label: "Temperature",
    value: "24°C",
    icon: <span data-testid="sensor-icon">🌡️</span>,
  };

  it("renders label and value correctly", () => {
    render(<SensorCard {...defaultProps} />);
    expect(screen.getByText("Temperature")).toBeInTheDocument();
    expect(screen.getByText("24°C")).toBeInTheDocument();
  });

  it("renders the icon", () => {
    render(<SensorCard {...defaultProps} />);
    expect(screen.getByTestId("sensor-icon")).toBeInTheDocument();
  });

  it("applies custom className", () => {
    const { container } = render(
      <SensorCard {...defaultProps} className="custom-style" />
    );
    expect(container.firstChild).toHaveClass("custom-style");
  });

  it("renders children when provided", () => {
    render(
      <SensorCard {...defaultProps}>
        <div data-testid="child-element">Extra Info</div>
      </SensorCard>
    );
    expect(screen.getByTestId("child-element")).toBeInTheDocument();
    expect(screen.getByText("Extra Info")).toBeInTheDocument();
  });

  it("does not render children div if no children are provided", () => {
    const { container } = render(<SensorCard {...defaultProps} />);
    const extra = container.querySelector(".extra");
    expect(extra).toBeNull();
  });
});
