import React from "react";
import { describe, it, expect, vi, beforeEach } from "vitest";
import { fireEvent, render, screen } from "@testing-library/react";
import CustomizeThresholds from "./CustomizeThresholds";
import { MemoryRouter } from "react-router-dom";

beforeEach(() => {
  localStorage.clear();
  vi.restoreAllMocks();
});

describe("CustomizeThresholds", () => {
  it("renders default thresholds for Bell Pepper", () => {
    render(
      <MemoryRouter>
        <CustomizeThresholds />
      </MemoryRouter>
    );
    expect(screen.getByText("temperature")).toBeInTheDocument();
    expect(screen.getByDisplayValue("20")).toBeInTheDocument(); // min
    expect(screen.getByDisplayValue("35")).toBeInTheDocument(); // max
  });

  it("switches plant and loads corresponding thresholds", () => {
    render(
      <MemoryRouter>
        <CustomizeThresholds />
      </MemoryRouter>
    );
    fireEvent.change(screen.getByLabelText("Select Plant:"), {
      target: { value: "2" },
    });

    expect(screen.getByDisplayValue("21")).toBeInTheDocument(); // min temp for Chestnut
    expect(screen.getByDisplayValue("30")).toBeInTheDocument(); // max temp for Chestnut
  });

  it("allows user to change min and max values", () => {
    render(
      <MemoryRouter>
        <CustomizeThresholds />
      </MemoryRouter>
    );
    const minInput = screen.getAllByPlaceholderText("Min")[0];
    const maxInput = screen.getAllByPlaceholderText("Max")[0];

    fireEvent.change(minInput, { target: { value: "10" } });
    fireEvent.change(maxInput, { target: { value: "50" } });

    expect((minInput as HTMLInputElement).value).toBe("10");
    expect((maxInput as HTMLInputElement).value).toBe("50");
  });

  it("saves thresholds to localStorage", () => {
    const setItemSpy = vi.spyOn(localStorage.__proto__, "setItem");
    render(
      <MemoryRouter>
        <CustomizeThresholds />
      </MemoryRouter>
    );
    fireEvent.click(screen.getByText("Save Thresholds"));
    expect(setItemSpy).toHaveBeenCalledWith(
      "thresholds",
      expect.stringContaining('"temperature":')
    );
  });

  it("loads thresholds from localStorage if available", () => {
    localStorage.setItem(
      "thresholds",
      JSON.stringify({
        1: {
          temperature: { min: 15, max: 25 },
          humidity: { min: 30, max: 60 },
          soilMoisture: { min: 20, max: 50 },
          lightIntensity: { min: 100, max: 500 },
        },
      })
    );

    render(
      <MemoryRouter>
        <CustomizeThresholds />
      </MemoryRouter>
    );
    expect(screen.getByDisplayValue("15")).toBeInTheDocument(); // overridden min
    expect(screen.getByDisplayValue("25")).toBeInTheDocument(); // overridden max
  });
});
