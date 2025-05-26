import React from "react";
import { describe, it, expect, vi, beforeEach } from "vitest";
import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import Dashboard from "./DashBoard";
import { MemoryRouter } from "react-router-dom";

// Mock hooks and dependencies
vi.mock("../Hooks/useAirHumidity", () => ({
  useGetAllAirHumidity: vi.fn(() => ({
    data: [{ timestamp: new Date().toISOString(), airHumidity: 50 }],
  })),
}));
vi.mock("../Hooks/useGetTemperature", () => ({
  useGetAllTemperatures: vi.fn(() => ({
    data: [{ timestamp: new Date().toISOString(), temperature: 25 }],
    loading: false,
  })),
}));
vi.mock("../Hooks/useSoilHumidity", () => ({
  useGetAllSoilHumidity: vi.fn(() => ({
    data: [{ timestamp: new Date().toISOString(), soilHumidity: 500 }],
    isLoading: false,
  })),
}));
vi.mock("../Hooks/useGetLightIntensity", () => ({
  useGetAllLightIntensity: vi.fn(() => ({
    data: [{ timestamp: new Date().toISOString(), lightIntensity: 300 }],
    loading: false,
  })),
}));
vi.mock("../Hooks/useMeasurement", () => ({
  useMeasurements: vi.fn(() => ({
    data: [
      {
        tankFillLevel: 75,
        temperature: 25,
        soilHumidity: 500,
        lightIntensity: 300,
        airHumidity: 50,
        timestamp: new Date().toISOString(),
      },
    ],
    loading: false,
  })),
}));
vi.mock("react-hot-toast", () => ({
  __esModule: true,
  default: { success: vi.fn(), error: vi.fn() },
}));
vi.mock("../components/InsightsPanel", () => ({
  default: () => <div>InsightsPanel</div>,
}));
vi.mock("../components/TopBar", () => ({
  default: () => <div>TopBar</div>,
}));

// Suppress console errors from useEffect loggers
vi.spyOn(console, "error").mockImplementation(() => {});

describe("Dashboard", () => {
  beforeEach(() => {
    localStorage.clear();
  });

  it("renders without crashing and shows loading", () => {
    render(<Dashboard />, { wrapper: MemoryRouter });
    expect(screen.getByText("Loading dashboard data...")).toBeInTheDocument();
  });

  it("displays chart panels and sensor cards after loading", async () => {
    global.fetch = vi
      .fn()
      .mockResolvedValueOnce({
        ok: true,
        json: async () => [{ id: 1, name: "Bell Pepper" }],
      })
      .mockResolvedValueOnce({
        ok: true,
        json: async () => [],
      });

    render(<Dashboard />, { wrapper: MemoryRouter });

    await waitFor(() =>
      expect(screen.getByText("Welcome back")).toBeInTheDocument()
    );
    expect(screen.getByText(/Temperature \(24h\)/)).toBeInTheDocument();
    expect(screen.getByText(/Air Humidity/)).toBeInTheDocument();
    expect(screen.getByText("TopBar")).toBeInTheDocument();
    expect(screen.getByText("InsightsPanel")).toBeInTheDocument();
  });

  it("can toggle irrigation mode", async () => {
    global.fetch = vi.fn().mockResolvedValue({
      ok: true,
      json: async () => ({ message: "Irrigation updated" }),
    });

    render(<Dashboard />, { wrapper: MemoryRouter });

    await waitFor(() =>
      expect(screen.getByText("Activate Irrigation")).toBeInTheDocument()
    );

    const toggle = screen.getByLabelText(/Auto Mode|Manual Mode/);
    fireEvent.click(toggle);
    expect(toggle).toBeChecked();
  });
});
