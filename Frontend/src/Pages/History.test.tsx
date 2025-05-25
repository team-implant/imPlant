import React from "react";
import { describe, it, expect, vi, beforeEach } from "vitest";
import { fireEvent, render, screen } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";
import History from "./History";

// Mocks
vi.mock("../components/TopBar", () => ({
  default: () => <div data-testid="mock-topbar" />,
}));

vi.mock("../components/ChartPanel", () => ({
  default: ({ title }: { title: string }) => <div>{title}</div>,
}));

vi.mock("../Hooks/useGetTemperature", () => ({
  useGetAllTemperatures: () => ({ data: [], isLoading: true }),
}));

vi.mock("../Hooks/useGetLightIntensity", () => ({
  useGetAllLightIntensity: () => ({ data: [], isLoading: true }),
}));

vi.mock("../Hooks/useAirHumidity", () => ({
  useGetAllAirHumidity: () => ({ data: [], isLoading: true }),
}));

vi.mock("../Hooks/useSoilHumidity", () => ({
  useGetAllSoilHumidity: () => ({ data: [], isLoading: true }),
}));

describe("History Page", () => {
  beforeEach(() => {
    vi.restoreAllMocks();
  });

  it("renders heading and UI elements", () => {
    render(
      <MemoryRouter>
        <History />
      </MemoryRouter>
    );

    expect(screen.getByText(/Sensor Data History/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/Select a Date/i)).toBeInTheDocument();
    expect(
      screen.getByRole("button", { name: /apply|loading/i })
    ).toBeInTheDocument();
  });

  it("disables Apply button while loading", () => {
    render(
      <MemoryRouter>
        <History />
      </MemoryRouter>
    );

    const applyButton = screen.getByRole("button", { name: /apply|loading/i });
    expect(applyButton).toBeDisabled();
  });

  it("keeps Apply disabled if no date is selected", () => {
    render(
      <MemoryRouter>
        <History />
      </MemoryRouter>
    );

    const applyButton = screen.getByRole("button", { name: /apply|loading/i });
    expect(applyButton).toBeDisabled();
  });
});
