import { describe, it, expect, vi, beforeEach } from "vitest";
import { render, screen, waitFor, fireEvent } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import LoginPage from "./page";

// Mock next-auth/react
const mockSignIn = vi.fn();
vi.mock("next-auth/react", () => ({
  signIn: (...args: any[]) => mockSignIn(...args),
}));

// Mock next/navigation
const mockPush = vi.fn();
const mockRefresh = vi.fn();
vi.mock("next/navigation", () => ({
  useRouter: () => ({
    push: mockPush,
    refresh: mockRefresh,
  }),
  useSearchParams: () => ({
    get: (key: string) => (key === "callbackUrl" ? "/dashboard" : null),
  }),
}));

describe("LoginPage", () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it("renders the login form", () => {
    render(<LoginPage />);

    expect(screen.getByRole("heading", { name: /Login/i })).toBeInTheDocument();
    expect(screen.getByLabelText(/EMAIL_ADDRESS/i)).toBeInTheDocument();
    expect(screen.getByLabelText("PASSWORD")).toBeInTheDocument();
    expect(
      screen.getByRole("button", { name: /AUTHENTICATE/i })
    ).toBeInTheDocument();
  });

  it("handles successful login", async () => {
    const user = userEvent.setup();
    mockSignIn.mockResolvedValue({ error: null, url: "/dashboard" });

    render(<LoginPage />);

    await user.type(screen.getByLabelText(/EMAIL_ADDRESS/i), "test@example.com");
    await user.type(screen.getByLabelText("PASSWORD"), "password123");
    
    const submitBtn = screen.getByRole("button", { name: /AUTHENTICATE/i });
    await user.click(submitBtn);

    await waitFor(() => {
      expect(mockSignIn).toHaveBeenCalledWith("credentials", {
        email: "test@example.com",
        password: "password123",
        redirect: false,
        callbackUrl: "/dashboard",
      });
      expect(mockPush).toHaveBeenCalledWith("/dashboard");
      expect(mockRefresh).toHaveBeenCalled();
    });
  });

  it("handles login error", async () => {
    const user = userEvent.setup();
    mockSignIn.mockResolvedValue({ error: "Invalid credentials" });

    render(<LoginPage />);

    await user.type(screen.getByLabelText(/EMAIL_ADDRESS/i), "wrong@example.com");
    await user.type(screen.getByLabelText("PASSWORD"), "wrongpass");
    
    const submitBtn = screen.getByRole("button", { name: /AUTHENTICATE/i });
    await user.click(submitBtn);

    await waitFor(() => {
      expect(screen.getByText(/Invalid credentials/i)).toBeInTheDocument();
    });
    
    expect(mockPush).not.toHaveBeenCalled();
  });

  it("handles exception during login", async () => {
    const user = userEvent.setup();
    mockSignIn.mockRejectedValue(new Error("Network error"));

    render(<LoginPage />);

    await user.type(screen.getByLabelText(/EMAIL_ADDRESS/i), "test@example.com");
    await user.type(screen.getByLabelText("PASSWORD"), "password");
    
    const submitBtn = screen.getByRole("button", { name: /AUTHENTICATE/i });
    await user.click(submitBtn);

    await waitFor(() => {
      expect(screen.getByText(/An unexpected error occurred/i)).toBeInTheDocument();
    });
  });
});
