import { describe, it, expect, vi } from "vitest";
import { render, screen } from "@testing-library/react";
import Pricing from "./Pricing";

// Mock FreeAccessButton
vi.mock("../ui/FreeAccessButton", () => ({
  default: () => <button data-testid="free-access-button">Start Learning for Free</button>,
}));

// Mock ProUpgradeButton
vi.mock("../ui/ProUpgradeButton", () => ({
  default: () => <button data-testid="pro-upgrade-button">Upgrade to Pro</button>,
}));

describe("Pricing", () => {
  it("renders pricing section heading", () => {
    render(<Pricing />);

    expect(screen.getByText("Simple Pricing")).toBeInTheDocument();
    expect(
      screen.getByText(
        "One subscription, unlimited access. Stop buying individual courses. Start your career transformation today."
      )
    ).toBeInTheDocument();
  });

  it("renders free tier card", () => {
    render(<Pricing />);

    expect(screen.getByText("Free Access")).toBeInTheDocument();
    expect(screen.getByText("For those just exploring the tech.")).toBeInTheDocument();
    expect(screen.getByText("£0")).toBeInTheDocument();
    // /mo appears in both tiers, so we check it exists
    expect(screen.getAllByText("/mo").length).toBeGreaterThan(0);
  });

  it("renders free tier features", () => {
    render(<Pricing />);

    expect(screen.getByText("Access FREE courses")).toBeInTheDocument();
    expect(screen.getByText("Public Discord community")).toBeInTheDocument();
    expect(screen.getByText("Read-only code repositories")).toBeInTheDocument();
  });

  it("renders pro tier card", () => {
    render(<Pricing />);

    expect(screen.getByText("Pro Subscription")).toBeInTheDocument();
    expect(
      screen.getByText("Everything you need to become a senior engineer.")
    ).toBeInTheDocument();
    expect(screen.getByText("£9.99")).toBeInTheDocument();
  });

  it("renders recommended badge on pro tier", () => {
    render(<Pricing />);

    expect(screen.getByText("RECOMMENDED")).toBeInTheDocument();
  });

  it("renders pro tier features", () => {
    render(<Pricing />);

    // Text is split across elements, so we check for parts
    expect(screen.getByText("Unlimited access")).toBeInTheDocument();
    expect(screen.getByText("to all courses")).toBeInTheDocument();
    expect(screen.getByText("Source code downloads")).toBeInTheDocument();
    expect(screen.getByText("Private Discord channels")).toBeInTheDocument();
    expect(screen.getByText("Certificate of completion")).toBeInTheDocument();
  });

  it("renders action buttons", () => {
    render(<Pricing />);

    expect(screen.getByTestId("free-access-button")).toBeInTheDocument();
    expect(screen.getByTestId("pro-upgrade-button")).toBeInTheDocument();
  });

  it("renders with correct grid layout", () => {
    const { container } = render(<Pricing />);

    const grid = container.querySelector(".grid");
    expect(grid).toHaveClass("md:grid-cols-2");
  });

  it("applies recommended styling to pro tier", () => {
    const { container } = render(<Pricing />);

    const proCard = screen.getByText("Pro Subscription").closest("div");
    expect(proCard).toHaveClass("border-2", "border-brand-500");
  });
});
