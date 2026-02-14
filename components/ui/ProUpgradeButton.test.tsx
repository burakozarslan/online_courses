import { describe, it, expect, vi, beforeEach } from "vitest";
import { render, screen, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import ProUpgradeButton from "./ProUpgradeButton";

// Mock next-auth
vi.mock("next-auth/react", () => ({
  useSession: vi.fn(),
}));

// Mock Next.js navigation
const mockPush = vi.fn();
vi.mock("next/navigation", () => ({
  useRouter: () => ({
    push: mockPush,
  }),
}));

// Mock config
vi.mock("../../config", () => ({
  proMembershipPriceId: "price_test_123",
}));

import { useSession } from "next-auth/react";

describe("ProUpgradeButton", () => {
  beforeEach(() => {
    vi.clearAllMocks();
    global.fetch = vi.fn();
  });

  describe("Button text and state", () => {
    it("shows 'Upgrade to Pro' for non-pro authenticated user", () => {
      vi.mocked(useSession).mockReturnValue({
        data: { user: { email: "test@example.com", isPro: false } } as any,
        status: "authenticated",
        update: vi.fn(),
      });

      render(<ProUpgradeButton />);

      expect(
        screen.getByText(/Upgrade to Pro for £9.99\/month/)
      ).toBeInTheDocument();
    });

    it("shows 'Already Pro' for pro user", () => {
      vi.mocked(useSession).mockReturnValue({
        data: { user: { email: "test@example.com", isPro: true } } as any,
        status: "authenticated",
        update: vi.fn(),
      });

      render(<ProUpgradeButton />);

      expect(
        screen.getByText("Already Pro - Go to Dashboard")
      ).toBeInTheDocument();
    });

    it("shows 'Upgrade to Pro' for unauthenticated user", () => {
      vi.mocked(useSession).mockReturnValue({
        data: null,
        status: "unauthenticated",
        update: vi.fn(),
      });

      render(<ProUpgradeButton />);

      expect(
        screen.getByText(/Upgrade to Pro for £9.99\/month/)
      ).toBeInTheDocument();
    });
  });

  describe("Button interactions", () => {
    it("redirects to login page when unauthenticated user clicks", async () => {
      vi.mocked(useSession).mockReturnValue({
        data: null,
        status: "unauthenticated",
        update: vi.fn(),
      });

      render(<ProUpgradeButton />);

      const button = screen.getByRole("button");
      await userEvent.click(button);

      expect(mockPush).toHaveBeenCalledWith("/login?callbackUrl=/pricing");
    });

    it("redirects to overview when pro user clicks", async () => {
      vi.mocked(useSession).mockReturnValue({
        data: { user: { email: "test@example.com", isPro: true } } as any,
        status: "authenticated",
        update: vi.fn(),
      });

      render(<ProUpgradeButton />);

      const button = screen.getByRole("button");
      await userEvent.click(button);

      expect(mockPush).toHaveBeenCalledWith("/overview");
    });

    it("initiates checkout for non-pro authenticated user", async () => {
      vi.mocked(useSession).mockReturnValue({
        data: { user: { email: "test@example.com", isPro: false } } as any,
        status: "authenticated",
        update: vi.fn(),
      });

      const checkoutUrl = "https://checkout.stripe.com/test";
      vi.mocked(global.fetch).mockResolvedValueOnce({
        ok: true,
        json: async () => ({ url: checkoutUrl }),
      } as Response);

      // Mock window.location.href
      delete (window as any).location;
      window.location = { href: "" } as any;

      render(<ProUpgradeButton />);

      const button = screen.getByRole("button");
      await userEvent.click(button);

      await waitFor(() => {
        expect(global.fetch).toHaveBeenCalledWith("/api/checkout", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            priceId: "price_test_123",
          }),
        });
      });
    });
  });

  describe("Loading state", () => {
    it("shows loading text and disables button during checkout", async () => {
      vi.mocked(useSession).mockReturnValue({
        data: { user: { email: "test@example.com", isPro: false } } as any,
        status: "authenticated",
        update: vi.fn(),
      });

      // Mock a slow fetch to test loading state
      vi.mocked(global.fetch).mockImplementationOnce(
        () =>
          new Promise((resolve) =>
            setTimeout(
              () =>
                resolve({
                  ok: true,
                  json: async () => ({ url: "https://checkout.stripe.com" }),
                } as Response),
              100
            )
          )
      );

      render(<ProUpgradeButton />);

      const button = screen.getByRole("button");
      await userEvent.click(button);

      // Check loading state
      expect(screen.getByText("Redirecting to checkout...")).toBeInTheDocument();
      expect(button).toBeDisabled();
    });
  });

  describe("Error handling", () => {
    it("displays error message when checkout fails", async () => {
      vi.mocked(useSession).mockReturnValue({
        data: { user: { email: "test@example.com", isPro: false } } as any,
        status: "authenticated",
        update: vi.fn(),
      });

      const errorMessage = "Payment service unavailable";
      vi.mocked(global.fetch).mockResolvedValueOnce({
        ok: false,
        json: async () => ({ error: errorMessage }),
      } as Response);

      render(<ProUpgradeButton />);

      const button = screen.getByRole("button");
      await userEvent.click(button);

      await waitFor(() => {
        expect(screen.getByText(errorMessage)).toBeInTheDocument();
      });
    });

    it("displays generic error when no error message provided", async () => {
      vi.mocked(useSession).mockReturnValue({
        data: { user: { email: "test@example.com", isPro: false } } as any,
        status: "authenticated",
        update: vi.fn(),
      });

      vi.mocked(global.fetch).mockResolvedValueOnce({
        ok: false,
        json: async () => ({}),
      } as Response);

      render(<ProUpgradeButton />);

      const button = screen.getByRole("button");
      await userEvent.click(button);

      await waitFor(() => {
        expect(
          screen.getByText("Failed to create checkout session")
        ).toBeInTheDocument();
      });
    });

    it("handles error when no checkout URL is returned", async () => {
      vi.mocked(useSession).mockReturnValue({
        data: { user: { email: "test@example.com", isPro: false } } as any,
        status: "authenticated",
        update: vi.fn(),
      });

      vi.mocked(global.fetch).mockResolvedValueOnce({
        ok: true,
        json: async () => ({}),
      } as Response);

      render(<ProUpgradeButton />);

      const button = screen.getByRole("button");
      await userEvent.click(button);

      await waitFor(() => {
        expect(
          screen.getByText("No checkout URL returned")
        ).toBeInTheDocument();
      });
    });
  });

  describe("Custom styling", () => {
    it("applies custom className when provided", () => {
      vi.mocked(useSession).mockReturnValue({
        data: null,
        status: "unauthenticated",
        update: vi.fn(),
      });

      const customClass = "custom-pro-button";
      render(<ProUpgradeButton className={customClass} />);

      const button = screen.getByRole("button");
      expect(button).toHaveClass(customClass);
    });

    it("applies default className when none provided", () => {
      vi.mocked(useSession).mockReturnValue({
        data: null,
        status: "unauthenticated",
        update: vi.fn(),
      });

      render(<ProUpgradeButton />);

      const button = screen.getByRole("button");
      expect(button).toHaveClass("bg-brand-600");
    });
  });
});
