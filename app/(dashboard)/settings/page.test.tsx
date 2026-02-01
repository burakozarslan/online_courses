import { describe, it, expect, vi } from "vitest";
import { render, screen } from "@testing-library/react";
import SettingsPage from "./page";

// Mock server action
const mockGetSubscriptionDetails = vi.fn();
vi.mock("@/actions/subscription", () => ({
  getSubscriptionDetails: () => mockGetSubscriptionDetails(),
}));

// Mock Client Component
vi.mock("./SettingsClientPage", () => ({
  default: () => <div>Settings Client Page Mock</div>,
}));

describe("SettingsPage (Server)", () => {
  it("renders with subscription details", async () => {
    mockGetSubscriptionDetails.mockResolvedValue({
      membership: "FREE",
      stripeCurrentPeriodEnd: new Date(),
    });

    const component = await SettingsPage();
    render(component);

    expect(screen.getByText("Settings Client Page Mock")).toBeInTheDocument();
  });
});
