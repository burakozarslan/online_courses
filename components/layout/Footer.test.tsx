import { describe, it, expect } from "vitest";
import { render, screen } from "@testing-library/react";
import Footer from "./Footer";

describe("Footer", () => {
  it("renders footer with branding", () => {
    render(<Footer />);

    expect(screen.getByText("DEV_PLATFORM")).toBeInTheDocument();
    expect(
      screen.getByText(
        "Empowering developers to build the future. Join our community and start shipping."
      )
    ).toBeInTheDocument();
  });

  it("renders platform links", () => {
    render(<Footer />);

    expect(screen.getByText("Platform")).toBeInTheDocument();
    expect(screen.getByText("All Courses")).toBeInTheDocument();
    expect(screen.getByText("Pricing")).toBeInTheDocument();
    expect(screen.getByText("Login")).toBeInTheDocument();
    expect(screen.getByText("Sign Up")).toBeInTheDocument();
  });

  it("renders legal links", () => {
    render(<Footer />);

    expect(screen.getByText("Legal")).toBeInTheDocument();
    expect(screen.getByText("Privacy Policy")).toBeInTheDocument();
    expect(screen.getByText("Terms of Service")).toBeInTheDocument();
    expect(screen.getByText("Cookie Policy")).toBeInTheDocument();
  });

  it("renders copyright notice", () => {
    render(<Footer />);

    expect(
      screen.getByText("© 2025 DevPlatform Inc. All rights reserved.")
    ).toBeInTheDocument();
  });

  it("renders social media icons", () => {
    const { container } = render(<Footer />);

    const icons = container.querySelectorAll('[data-lucide]');
    expect(icons.length).toBeGreaterThan(0);
  });

  it("renders with correct styling classes", () => {
    const { container } = render(<Footer />);

    const footer = container.querySelector("footer");
    expect(footer).toHaveClass("bg-neutral-900", "text-neutral-400");
  });
});
