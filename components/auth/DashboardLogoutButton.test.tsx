import { describe, it, expect, vi, beforeEach } from "vitest";
import { render, screen, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import DashboardLogoutButton from "./DashboardLogoutButton";

// Mock next-auth/react
const mockSignOut = vi.fn();
vi.mock("next-auth/react", () => ({
  signOut: (...args: unknown[]) => mockSignOut(...args),
}));

// Mock window.location.replace
const mockReplace = vi.fn();
Object.defineProperty(window, "location", {
  value: {
    replace: mockReplace,
  },
  writable: true,
});

describe("DashboardLogoutButton", () => {
  beforeEach(() => {
    vi.clearAllMocks();
    mockSignOut.mockResolvedValue(undefined);
  });

  it("renders logout button with correct text and icon", () => {
    render(<DashboardLogoutButton />);

    expect(screen.getByText("Log Out")).toBeInTheDocument();
    expect(screen.getByLabelText("Log out")).toBeInTheDocument();
    expect(screen.getByRole("button")).toBeInTheDocument();
  });

  it("calls signOut with correct options when clicked", async () => {
    const user = userEvent.setup();
    render(<DashboardLogoutButton />);

    const button = screen.getByRole("button");
    await user.click(button);

    await waitFor(() => {
      expect(mockSignOut).toHaveBeenCalledWith({ redirect: false });
    });
  });

  it("redirects to /login after successful signOut", async () => {
    const user = userEvent.setup();
    mockSignOut.mockResolvedValue(undefined);
    render(<DashboardLogoutButton />);

    const button = screen.getByRole("button");
    await user.click(button);

    await waitFor(() => {
      expect(mockReplace).toHaveBeenCalledWith("/login");
    });
  });

  it("shows loading state during logout", async () => {
    const user = userEvent.setup();
    // Make signOut take some time to resolve
    mockSignOut.mockImplementation(
      () => new Promise((resolve) => setTimeout(resolve, 100))
    );

    render(<DashboardLogoutButton />);

    const button = screen.getByRole("button");
    await user.click(button);

    // Check loading state appears
    await waitFor(() => {
      expect(screen.getByText("Logging out...")).toBeInTheDocument();
    });

    // Check button is disabled during loading
    expect(button).toBeDisabled();

    // Wait for logout to complete
    await waitFor(
      () => {
        expect(screen.queryByText("Logging out...")).not.toBeInTheDocument();
      },
      { timeout: 200 }
    );
  });

  it("redirects to /login even if signOut fails", async () => {
    const user = userEvent.setup();
    const consoleErrorSpy = vi.spyOn(console, "error").mockImplementation(() => {});
    mockSignOut.mockRejectedValue(new Error("Sign out failed"));

    render(<DashboardLogoutButton />);

    const button = screen.getByRole("button");
    await user.click(button);

    await waitFor(() => {
      expect(mockReplace).toHaveBeenCalledWith("/login");
      expect(consoleErrorSpy).toHaveBeenCalledWith(
        "Error during logout:",
        expect.any(Error)
      );
    });

    consoleErrorSpy.mockRestore();
  });

  it("applies correct styling classes", () => {
    const { container } = render(<DashboardLogoutButton />);

    const button = container.querySelector("button");
    expect(button).toHaveClass(
      "flex",
      "items-center",
      "gap-3",
      "px-3",
      "py-2",
      "text-neutral-500",
      "hover:text-error-500",
      "transition-colors",
      "cursor-pointer"
    );
  });

  it("disables button with correct styling when loading", async () => {
    const user = userEvent.setup();
    mockSignOut.mockImplementation(
      () => new Promise((resolve) => setTimeout(resolve, 100))
    );

    const { container } = render(<DashboardLogoutButton />);

    const button = screen.getByRole("button");
    await user.click(button);

    await waitFor(() => {
      const disabledButton = container.querySelector("button");
      expect(disabledButton).toBeDisabled();
      expect(disabledButton).toHaveClass(
        "disabled:opacity-50",
        "disabled:cursor-not-allowed"
      );
    });
  });

  it("has proper accessibility attributes", () => {
    render(<DashboardLogoutButton />);

    const button = screen.getByRole("button");
    expect(button).toHaveAttribute("aria-label", "Log out");
  });
});
