import { describe, it, expect } from "vitest";
import { render, screen } from "@testing-library/react";
import StatsBar from "./StatsBar";

describe("StatsBar", () => {
  it("renders all statistics", () => {
    render(<StatsBar />);

    expect(screen.getByText("50+")).toBeInTheDocument();
    expect(screen.getByText("Courses")).toBeInTheDocument();
    expect(screen.getByText("40h")).toBeInTheDocument();
    expect(screen.getByText("Video Content")).toBeInTheDocument();
    expect(screen.getByText("Zero")).toBeInTheDocument();
    expect(screen.getByText("Fluff")).toBeInTheDocument();
    expect(screen.getByText("24/7")).toBeInTheDocument();
    expect(screen.getByText("Access")).toBeInTheDocument();
  });

  it("renders with correct styling classes", () => {
    const { container } = render(<StatsBar />);

    const section = container.querySelector("section");
    expect(section).toHaveClass("border-b", "border-neutral-border", "bg-neutral-50");
  });

  it("displays statistics in a grid layout", () => {
    const { container } = render(<StatsBar />);

    const grid = container.querySelector(".grid");
    expect(grid).toHaveClass("grid-cols-2", "md:grid-cols-4");
  });
});
