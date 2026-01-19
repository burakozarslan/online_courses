import { describe, it, expect } from "vitest";
import { render, screen } from "@testing-library/react";
import Hero from "./Hero";

describe("Hero", () => {
  it("renders hero section with main heading", () => {
    render(<Hero />);

    expect(screen.getByText("Compile Your Future.")).toBeInTheDocument();
    expect(screen.getByText("One Commit at a Time.")).toBeInTheDocument();
  });

  it("renders new course badge", () => {
    render(<Hero />);

    expect(screen.getByText("NEW: System Design Course")).toBeInTheDocument();
  });

  it("renders description text", () => {
    render(<Hero />);

    expect(
      screen.getByText(
        /Project-based learning for developers who want to ship/
      )
    ).toBeInTheDocument();
  });

  it("renders call-to-action buttons", () => {
    render(<Hero />);

    expect(screen.getByText("Browse Catalog")).toBeInTheDocument();
    expect(screen.getByText("View Roadmap")).toBeInTheDocument();
  });

  it("renders community stats", () => {
    render(<Hero />);

    expect(screen.getByText("Joined by 10,000+ developers")).toBeInTheDocument();
  });

  it("renders code example in technical graphic", () => {
    render(<Hero />);

    expect(screen.getByText("server.ts")).toBeInTheDocument();
    expect(screen.getByText(/Initialize payment subscription/)).toBeInTheDocument();
    expect(screen.getByText(/Update user status in NeonDB/)).toBeInTheDocument();
  });

  it("renders production ready badge", () => {
    render(<Hero />);

    expect(screen.getByText("Production Ready")).toBeInTheDocument();
    expect(screen.getByText("Best practices only")).toBeInTheDocument();
  });

  it("renders with correct styling classes", () => {
    const { container } = render(<Hero />);

    const section = container.querySelector("section");
    expect(section).toHaveClass("relative", "bg-grid");
  });
});
