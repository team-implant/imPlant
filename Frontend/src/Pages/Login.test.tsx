import React from "react";
import { describe, it, expect, vi, beforeEach } from "vitest";
import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";
import Login from "./Login";

// Mock useNavigate from react-router-dom
vi.mock("react-router-dom", async () => {
  const actual = await vi.importActual("react-router-dom");
  return {
    ...actual,
    useNavigate: () => vi.fn(),
  };
});

// Mock login mutation
const mockMutateAsync = vi.fn();
vi.mock("../api/auth", () => ({
  useLogin: () => ({
    mutateAsync: mockMutateAsync,
    isLoading: false,
  }),
}));

describe("Login", () => {
  beforeEach(() => {
    mockMutateAsync.mockReset();
    localStorage.clear();
  });

  it("renders form inputs and login button", () => {
    render(
      <MemoryRouter>
        <Login />
      </MemoryRouter>
    );

    expect(screen.getByLabelText(/Username/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/Password/i)).toBeInTheDocument();
    expect(screen.getByRole("button", { name: /Login/i })).toBeInTheDocument();
    expect(screen.getByText(/Forgot password/i)).toBeInTheDocument();
  });

  it("displays error message on failed login", async () => {
    mockMutateAsync.mockRejectedValueOnce(new Error("Invalid credentials"));

    render(
      <MemoryRouter>
        <Login />
      </MemoryRouter>
    );

    fireEvent.change(screen.getByLabelText(/Username/i), {
      target: { value: "user" },
    });
    fireEvent.change(screen.getByLabelText(/Password/i), {
      target: { value: "wrongpass" },
    });

    fireEvent.click(screen.getByRole("button", { name: /Login/i }));

    await waitFor(() =>
      expect(screen.getByRole("alert")).toHaveTextContent("Invalid credentials")
    );
  });

  it("stores token in localStorage if remember me is checked", async () => {
    mockMutateAsync.mockResolvedValueOnce({ token: "test-token" });

    render(
      <MemoryRouter>
        <Login />
      </MemoryRouter>
    );

    fireEvent.change(screen.getByLabelText(/Username/i), {
      target: { value: "user" },
    });
    fireEvent.change(screen.getByLabelText(/Password/i), {
      target: { value: "password" },
    });
    fireEvent.click(screen.getByLabelText(/Remember Me/i));
    fireEvent.click(screen.getByRole("button", { name: /Login/i }));

    await waitFor(() =>
      expect(localStorage.getItem("token")).toBe("test-token")
    );
  });

  it("does not store token if remember me is unchecked", async () => {
    mockMutateAsync.mockResolvedValueOnce({ token: "no-store-token" });

    render(
      <MemoryRouter>
        <Login />
      </MemoryRouter>
    );

    fireEvent.change(screen.getByLabelText(/Username/i), {
      target: { value: "user" },
    });
    fireEvent.change(screen.getByLabelText(/Password/i), {
      target: { value: "password" },
    });

    fireEvent.click(screen.getByRole("button", { name: /Login/i }));

    await waitFor(() => expect(localStorage.getItem("token")).toBe(null));
  });
});
