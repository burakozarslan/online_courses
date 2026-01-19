import { describe, it, expect, vi } from "vitest";
import { render, screen } from "@testing-library/react";
import FeaturedCourses from "./FeaturedCourses";

// Mock CourseCard component
vi.mock("../ui/CourseCard", () => ({
  default: ({
    title,
    description,
    modules,
    duration,
    category,
    difficulty,
    isPro,
  }: {
    title: string;
    description: string;
    modules: number;
    duration: string;
    category: string;
    difficulty: number;
    isPro?: boolean;
  }) => (
    <div data-testid="course-card">
      <h3>{title}</h3>
      <p>{description}</p>
      <span>{modules} modules</span>
      <span>{duration}</span>
      <span>{category}</span>
      <span>Difficulty: {difficulty}</span>
      {isPro && <span>PRO</span>}
    </div>
  ),
}));

describe("FeaturedCourses", () => {
  it("renders section heading and description", () => {
    render(<FeaturedCourses />);

    expect(screen.getByText("Latest Curriculums")).toBeInTheDocument();
    expect(
      screen.getByText(
        "Structured learning paths designed for engineering excellence."
      )
    ).toBeInTheDocument();
  });

  it("renders view all tracks link", () => {
    render(<FeaturedCourses />);

    const link = screen.getByText("View All Tracks");
    expect(link).toBeInTheDocument();
    expect(link.closest("a")).toHaveAttribute("href", "/courses");
  });

  it("renders three course cards", () => {
    render(<FeaturedCourses />);

    const courseCards = screen.getAllByTestId("course-card");
    expect(courseCards).toHaveLength(3);
  });

  it("renders course cards with correct content", () => {
    render(<FeaturedCourses />);

    expect(screen.getByText("Next.js & Shopify Integration")).toBeInTheDocument();
    expect(screen.getByText("Serverless Postgres with Neon")).toBeInTheDocument();
    expect(screen.getByText("Advanced Auth Patterns")).toBeInTheDocument();
  });

  it("renders pro badge on first course card", () => {
    render(<FeaturedCourses />);

    const proBadges = screen.getAllByText("PRO");
    expect(proBadges.length).toBeGreaterThan(0);
  });

  it("renders with correct grid layout", () => {
    const { container } = render(<FeaturedCourses />);

    const grid = container.querySelector(".grid");
    expect(grid).toHaveClass("md:grid-cols-3");
  });
});
