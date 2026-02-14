import { describe, it, expect, vi } from "vitest";
import { render, screen } from "@testing-library/react";
import BillingPage from "./page";

// Mock server action
const mockGetSubscriptionDetails = vi.fn();
vi.mock("@/actions/subscription", () => ({
  getSubscriptionDetails: () => mockGetSubscriptionDetails(),
}));

// Mock Client Component
vi.mock("./BillingClientPage", () => ({
  default: () => <div>Billing Client Page Mock</div>,
}));

describe("BillingPage (Server)", () => {
  it("renders with subscription details", async () => {
    mockGetSubscriptionDetails.mockResolvedValue({
      membership: "FREE",
      stripeCurrentPeriodEnd: new Date(),
    });

    const component = await BillingPage();
    render(component);

    expect(screen.getByText("Billing Client Page Mock")).toBeInTheDocument();
  });
});
