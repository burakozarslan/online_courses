import { describe, it, expect, vi, beforeEach } from "vitest";
import { render, screen, waitFor, fireEvent } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import SettingsClientPage from "./SettingsClientPage";

// Mock next-auth/react
const mockUpdate = vi.fn();
vi.mock("next-auth/react", () => ({
  useSession: () => ({
    data: { user: { name: "Test User" } },
    update: mockUpdate,
  }),
}));

// Mock next/navigation
const mockRefresh = vi.fn();
vi.mock("next/navigation", () => ({
  useRouter: () => ({
    refresh: mockRefresh,
  }),
}));

// Mock server actions
const mockUpdatePassword = vi.fn();
vi.mock("@/actions/settings", () => ({
  updatePassword: (...args: any[]) => mockUpdatePassword(...args),
}));

const mockManageMembership = vi.fn();
const mockCancelDowngrade = vi.fn();
vi.mock("@/actions/subscription", () => ({
  manageMembership: (...args: any[]) => mockManageMembership(...args),
  cancelDowngrade: (...args: any[]) => mockCancelDowngrade(...args),
}));

describe("SettingsClientPage", () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  const defaultSubscription = {
    membership: "FREE",
    stripeCurrentPeriodEnd: null,
    stripeCancelAtPeriodEnd: false,
  };

  it("renders the settings page with default free plan", () => {
    render(<SettingsClientPage subscription={defaultSubscription} />);

    expect(screen.getByText("Account Settings")).toBeInTheDocument();
    expect(screen.getByText("Change Password")).toBeInTheDocument();
    expect(screen.getByText("Membership Plan")).toBeInTheDocument();
    
    // Check current plan display
    expect(screen.getByText("Current plan:")).toBeInTheDocument();
    expect(screen.getByText("FREE")).toBeInTheDocument();
  });

  it("renders with PRO plan details", () => {
    render(<SettingsClientPage subscription={{ ...defaultSubscription, membership: "PRO" }} />);
    expect(screen.getByText("PRO")).toBeInTheDocument();
  });

  describe("Password Update", () => {
    it("validates empty fields", async () => {
      const user = userEvent.setup();
      render(<SettingsClientPage subscription={defaultSubscription} />);

      const submitBtn = screen.getByRole("button", { name: /Update Password/i });
      await user.click(submitBtn);

      expect(screen.getByText("All fields are required")).toBeInTheDocument();
    });

    it("validates password mismatch", async () => {
      const user = userEvent.setup();
      render(<SettingsClientPage subscription={defaultSubscription} />);

      await user.type(screen.getByLabelText("Current Password"), "oldpass");
      await user.type(screen.getByLabelText("New Password"), "newpass");
      await user.type(screen.getByLabelText("Confirm New Password"), "mismatch");

      await user.click(screen.getByRole("button", { name: /Update Password/i }));

      expect(screen.getByText("New passwords do not match")).toBeInTheDocument();
    });

    it("validates password length", async () => {
      const user = userEvent.setup();
      render(<SettingsClientPage subscription={defaultSubscription} />);

      await user.type(screen.getByLabelText("Current Password"), "oldpass");
      await user.type(screen.getByLabelText("New Password"), "123");
      await user.type(screen.getByLabelText("Confirm New Password"), "123");

      await user.click(screen.getByRole("button", { name: /Update Password/i }));

      expect(screen.getByText("New password must be at least 6 characters")).toBeInTheDocument();
    });

    it("successfully updates password", async () => {
      const user = userEvent.setup();
      mockUpdatePassword.mockResolvedValue({ success: "Password updated successfully" });
      
      render(<SettingsClientPage subscription={defaultSubscription} />);

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
      
      render(<SettingsClientPage subscription={defaultSubscription} />);

      await user.type(screen.getByLabelText("Current Password"), "wrongpass");
      await user.type(screen.getByLabelText("New Password"), "newpass123");
      await user.type(screen.getByLabelText("Confirm New Password"), "newpass123");

      await user.click(screen.getByRole("button", { name: /Update Password/i }));

      await waitFor(() => {
        expect(screen.getByText("Incorrect current password")).toBeInTheDocument();
      });
    });
  });

  describe("Membership Integration", () => {
    it("disables update button when same plan is selected", () => {
      render(<SettingsClientPage subscription={defaultSubscription} />);
      
      const select = screen.getByLabelText("Select Plan");
      expect(select).toHaveValue("FREE");
      
      const updateBtn = screen.getByRole("button", { name: /Update Membership/i });
      expect(updateBtn).toBeDisabled();
    });

    it("enables update button when different plan is selected", async () => {
      const user = userEvent.setup();
      render(<SettingsClientPage subscription={defaultSubscription} />);
      
      const select = screen.getByLabelText("Select Plan");
      await user.selectOptions(select, "PRO");
      
      const updateBtn = screen.getByRole("button", { name: /Update Membership/i });
      expect(updateBtn).not.toBeDisabled();
    });

    it("calls manageMembership when updating plan", async () => {
      const user = userEvent.setup();
      mockManageMembership.mockResolvedValue({ success: "Plan updated" });
      
      render(<SettingsClientPage subscription={defaultSubscription} />);
      
      const select = screen.getByLabelText("Select Plan");
      await user.selectOptions(select, "PRO");
      
      const updateBtn = screen.getByRole("button", { name: /Update Membership/i });
      await user.click(updateBtn);
      
      await waitFor(() => {
        expect(mockManageMembership).toHaveBeenCalled();
      });
      
      expect(mockUpdate).toHaveBeenCalled();
      expect(mockRefresh).toHaveBeenCalled();
    });

    it("displays error when manageMembership fails", async () => {
      const user = userEvent.setup();
      mockManageMembership.mockResolvedValue({ error: "Update failed" });
      
      render(<SettingsClientPage subscription={defaultSubscription} />);
      
      const select = screen.getByLabelText("Select Plan");
      await user.selectOptions(select, "PRO");
      
      const updateBtn = screen.getByRole("button", { name: /Update Membership/i });
      await user.click(updateBtn);
      
      await waitFor(() => {
        expect(screen.getByText("Update failed")).toBeInTheDocument();
      });
    });
  });

  describe("Cancellation Pending State", () => {
    const pendingSubscription = {
      membership: "PRO",
      stripeCurrentPeriodEnd: new Date("2024-12-31"),
      stripeCancelAtPeriodEnd: true,
    };

    it("displays cancellation warning and keep plan button", () => {
      render(<SettingsClientPage subscription={pendingSubscription} />);
      
      expect(screen.getByText(/Ends on/)).toBeInTheDocument();
      expect(screen.getByText(/account will downgrade/)).toBeInTheDocument();
      expect(screen.getByRole("button", { name: "Keep my Pro Plan" })).toBeInTheDocument();
      
      // Does not show select plan form
      expect(screen.queryByLabelText("Select Plan")).not.toBeInTheDocument();
    });

    it("calls cancelDowngrade when keeping plan", async () => {
      const user = userEvent.setup();
      mockCancelDowngrade.mockResolvedValue({ success: "Downgrade canceled" });
      
      render(<SettingsClientPage subscription={pendingSubscription} />);
      
      await user.click(screen.getByRole("button", { name: "Keep my Pro Plan" }));
      
      await waitFor(() => {
        expect(mockCancelDowngrade).toHaveBeenCalled();
      });
      
      expect(mockUpdate).toHaveBeenCalled();
      expect(mockRefresh).toHaveBeenCalled();
    });
  });
});
