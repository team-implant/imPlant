import React from "react";
import { render, screen, fireEvent } from "@testing-library/react";
import { describe, it, expect, vi, beforeEach } from "vitest";
import { MemoryRouter, Route, Routes } from "react-router-dom";
import TopBar from "./TopBar";

const notifications = [{ id: 1, message: "New alert" }];

function renderWithRouter(initialPath: string) {
  return render(
    <MemoryRouter initialEntries={[initialPath]}>
      <Routes>
        <Route path="*" element={<TopBar notifications={notifications} />} />
      </Routes>
    </MemoryRouter>
  );
}

describe("TopBar", () => {
  beforeEach(() => {
    vi.useFakeTimers();
  });

  it("renders correctly", () => {
    renderWithRouter("/dashboard");
    expect(screen.getByText("Menu ▼")).toBeInTheDocument();
  });

  it("renders with dashboard class on root path", () => {
    const { container } = renderWithRouter("/");
    expect(container.querySelector(".top-bar")).toHaveClass("dashboard");
  });

  it("opens the menu when button is clicked", () => {
    renderWithRouter("/dashboard");
    fireEvent.click(screen.getByText("Menu ▼"));
    expect(screen.getByText("History")).toBeInTheDocument();
    expect(screen.getByText("Insights")).toBeInTheDocument();
  });

  it("closes the menu when overlay is clicked", () => {
    const { getByText, queryByTestId } = render(
      <MemoryRouter>
        <TopBar notifications={[{ id: 1, message: "Test" }]} />
      </MemoryRouter>
    );

    const toggleButton = getByText("Menu ▼");
    fireEvent.click(toggleButton);

    const overlay = queryByTestId("overlay");
    expect(overlay).toBeInTheDocument();

    fireEvent.click(overlay!);

    setTimeout(() => {
      expect(queryByTestId("overlay")).not.toBeInTheDocument();
    }, 350);
  });

  it("renders the NotificationIcon with notifications", () => {
    renderWithRouter("/dashboard");
    expect(screen.getByText("1")).toBeInTheDocument();
  });
});
