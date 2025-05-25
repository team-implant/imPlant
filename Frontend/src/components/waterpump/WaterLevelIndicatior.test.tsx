import React from "react";
import { render, screen } from "@testing-library/react";
import { describe, it, expect } from "vitest";
import WaterLevelIndicator from "./WaterLevelIndicator";

describe("WaterLevelIndicator", () => {
  it("renders the water level percentage", () => {
    render(<WaterLevelIndicator level={50} />);
    expect(screen.getByText("50%")).toBeInTheDocument();
  });

  it("applies correct width style to the water fill", () => {
    const { container } = render(<WaterLevelIndicator level={40} />);
    const fill = container.querySelector(
      ".water-fill-horizontal"
    ) as HTMLElement;
    expect(fill.style.width).toBe("40%");
  });

  it("applies red color for level < 30", () => {
    const { container } = render(<WaterLevelIndicator level={25} />);
    const fill = container.querySelector(
      ".water-fill-horizontal"
    ) as HTMLElement;
    expect(fill.style.backgroundColor).toBe("red");
  });

  it("applies yellow color for level between 30 and 59", () => {
    const { container } = render(<WaterLevelIndicator level={45} />);
    const fill = container.querySelector(
      ".water-fill-horizontal"
    ) as HTMLElement;
    expect(fill.style.backgroundColor).toBe("yellow");
  });

  it("applies green color for level >= 60", () => {
    const { container } = render(<WaterLevelIndicator level={85} />);
    const fill = container.querySelector(
      ".water-fill-horizontal"
    ) as HTMLElement;
    expect(fill.style.backgroundColor).toBe("green");
  });
});
