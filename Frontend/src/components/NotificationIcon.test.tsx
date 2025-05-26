import React from "react";
import { render, screen, fireEvent } from "@testing-library/react";
import { describe, it, expect, vi, beforeEach, afterEach } from "vitest";
import NotificationIcon from "./NotificationIcon";

describe("NotificationIcon", () => {
  const mockNotifications = [
    { id: 1, message: "Water pump is low." },
    { id: 2, message: "Humidity is below threshold." },
  ];

  beforeEach(() => {
    vi.useFakeTimers();
  });

  it("does not render when there are no notifications", () => {
    const { container } = render(<NotificationIcon notifications={[]} />);
    expect(container.firstChild).toBeNull();
  });

  it("renders with the correct notification count", () => {
    render(<NotificationIcon notifications={mockNotifications} />);
    expect(screen.getByText("2")).toBeInTheDocument();
  });

  it("shows modal with notifications when icon is clicked", () => {
    render(<NotificationIcon notifications={mockNotifications} />);

    // Click the notification button
    const button = screen.getByRole("button");
    fireEvent.click(button);

    // Check modal content
    expect(screen.getByText("Notifications")).toBeInTheDocument();
    expect(screen.getByText("Water pump is low.")).toBeInTheDocument();
    expect(
      screen.getByText("Humidity is below threshold.")
    ).toBeInTheDocument();
  });

  it("closes modal when close button is clicked", () => {
    render(<NotificationIcon notifications={mockNotifications} />);

    // Open modal
    fireEvent.click(screen.getByRole("button"));

    // Close modal
    fireEvent.click(screen.getByText("Close"));

    expect(screen.queryByText("Notifications")).not.toBeInTheDocument();
  });

  it("sets pulse class when new notifications arrive", () => {
    const { rerender } = render(<NotificationIcon notifications={[]} />);

    rerender(<NotificationIcon notifications={mockNotifications} />);
    const button = screen.getByRole("button");
    expect(button.className).toContain("pulse");
  });

  afterEach(() => {
    vi.useRealTimers();
  });
});
