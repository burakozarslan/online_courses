import { describe, it, expect, vi, beforeEach } from "vitest";
import { render, screen, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import SettingsClientPage from "./SettingsClientPage";

// Mock next-auth/react
vi.mock("next-auth/react", () => ({
  useSession: () => ({
    data: { user: { name: "Test User" } },
  }),
}));

// Mock server actions
const { mockUpdatePassword } = vi.hoisted(() => {
  return {
    mockUpdatePassword: vi.fn(),
  };
});

vi.mock("../../../actions/settings", () => ({
  updatePassword: mockUpdatePassword,
}));

describe("SettingsClientPage", () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it("renders the settings page", () => {
    render(<SettingsClientPage />);

    expect(screen.getByText("Account Settings")).toBeInTheDocument();
    expect(screen.getByText("Change Password")).toBeInTheDocument();
  });

  describe("Password Update", () => {
    it("validates empty fields", async () => {
      const user = userEvent.setup();
      render(<SettingsClientPage />);

      const submitBtn = screen.getByRole("button", { name: /Update Password/i });
      await user.click(submitBtn);

      expect(screen.getByText("All fields are required")).toBeInTheDocument();
    });

    it("validates password mismatch", async () => {
      const user = userEvent.setup();
      render(<SettingsClientPage />);

      await user.type(screen.getByLabelText("Current Password"), "oldpass");
      await user.type(screen.getByLabelText("New Password"), "newpass");
      await user.type(screen.getByLabelText("Confirm New Password"), "mismatch");

      await user.click(screen.getByRole("button", { name: /Update Password/i }));

      expect(screen.getByText("New passwords do not match")).toBeInTheDocument();
    });

    it("validates password length", async () => {
      const user = userEvent.setup();
      render(<SettingsClientPage />);

      await user.type(screen.getByLabelText("Current Password"), "oldpass");
      await user.type(screen.getByLabelText("New Password"), "123");
      await user.type(screen.getByLabelText("Confirm New Password"), "123");

      await user.click(screen.getByRole("button", { name: /Update Password/i }));

      expect(screen.getByText("New password must be at least 6 characters")).toBeInTheDocument();
    });

    it("successfully updates password", async () => {
      const user = userEvent.setup();
      mockUpdatePassword.mockResolvedValue({ success: "Password updated successfully" });
      
      render(<SettingsClientPage />);

      await user.type(screen.getByLabelText("Current Password"), "oldpass");
      await user.type(screen.getByLabelText("New Password"), "newpass123");
      await user.type(screen.getByLabelText("Confirm New Password"), "newpass123");

      await user.click(screen.getByRole("button", { name: /Update Password/i }));

      await waitFor(() => {
        expect(mockUpdatePassword).toHaveBeenCalled();
        expect(screen.getByText("Password updated successfully")).toBeInTheDocument();
      });
      
      // Form should be reset
      expect(screen.getByLabelText("Current Password")).toHaveValue("");
    });

    it("handles password update error", async () => {
      const user = userEvent.setup();
      mockUpdatePassword.mockResolvedValue({ error: "Incorrect current password" });
      
      render(<SettingsClientPage />);

      await user.type(screen.getByLabelText("Current Password"), "wrongpass");
      await user.type(screen.getByLabelText("New Password"), "newpass123");
      await user.type(screen.getByLabelText("Confirm New Password"), "newpass123");

      await user.click(screen.getByRole("button", { name: /Update Password/i }));

      await waitFor(() => {
        expect(screen.getByText("Incorrect current password")).toBeInTheDocument();
      });
    });
  });
});
