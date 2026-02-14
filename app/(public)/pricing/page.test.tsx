import { describe, it, expect, vi } from "vitest";
import { render, screen } from "@testing-library/react";
import PricingPage from "./page";

// Mock buttons
vi.mock("../../../components/ui/FreeAccessButton", () => ({ default: () => <button>Free Access Button</button> }));
vi.mock("../../../components/ui/ProUpgradeButton", () => ({ default: () => <button>Pro Upgrade Button</button> }));

describe("PricingPage", () => {
  it("renders pricing plans", () => {
    render(<PricingPage />);

    expect(screen.getByText("Simple Pricing")).toBeInTheDocument();
    expect(screen.getByText("Free Access")).toBeInTheDocument();
    expect(screen.getByText("Pro Subscription")).toBeInTheDocument();
    
    expect(screen.getByText("Free Access Button")).toBeInTheDocument();
    expect(screen.getByText("Pro Upgrade Button")).toBeInTheDocument();
  });
});
