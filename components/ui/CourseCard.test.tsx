import { describe, it, expect } from "vitest";
import { render, screen } from "@testing-library/react";
import CourseCard from "./CourseCard";

describe("CourseCard", () => {
  const defaultProps = {
    title: "Learn React Basics",
    description: "Master the fundamentals of React development",
    modules: 5,
    duration: "10h 30m",
    category: "Frontend",
    difficulty: 2 as const,
  };

  it("renders course card with all required props", () => {
    render(<CourseCard {...defaultProps} />);

    expect(screen.getByText("Learn React Basics")).toBeInTheDocument();
    expect(
      screen.getByText("Master the fundamentals of React development")
    ).toBeInTheDocument();
    expect(screen.getByText("5 Modules")).toBeInTheDocument();
    expect(screen.getByText("10h 30m")).toBeInTheDocument();
    expect(screen.getByText("Frontend")).toBeInTheDocument();
  });

  it("does not display PRO badge when isPro is false", () => {
    render(<CourseCard {...defaultProps} isPro={false} />);

    expect(screen.queryByText("PRO")).not.toBeInTheDocument();
  });

  it("displays PRO badge when isPro is true", () => {
    render(<CourseCard {...defaultProps} isPro={true} />);

    expect(screen.getByText("PRO")).toBeInTheDocument();
  });

  it("defaults isPro to false when not provided", () => {
    render(<CourseCard {...defaultProps} />);

    expect(screen.queryByText("PRO")).not.toBeInTheDocument();
  });

  describe("difficulty indicators", () => {
    it("renders correct difficulty level 1 (beginner)", () => {
      const { container } = render(
        <CourseCard {...defaultProps} difficulty={1} />
      );

      const difficultyDots = container.querySelectorAll(
        ".bg-neutral-800, .bg-neutral-300"
      );
      expect(difficultyDots).toHaveLength(3);

      // First dot should be filled (dark)
      expect(difficultyDots[0]).toHaveClass("bg-neutral-800");
      // Other dots should be empty (light)
      expect(difficultyDots[1]).toHaveClass("bg-neutral-300");
      expect(difficultyDots[2]).toHaveClass("bg-neutral-300");
    });

    it("renders correct difficulty level 2 (intermediate)", () => {
      const { container } = render(
        <CourseCard {...defaultProps} difficulty={2} />
      );

      const darkDots = container.querySelectorAll(".bg-neutral-800");
      expect(darkDots).toHaveLength(2);
    });

    it("renders correct difficulty level 3 (advanced)", () => {
      const { container } = render(
        <CourseCard {...defaultProps} difficulty={3} />
      );

      const darkDots = container.querySelectorAll(".bg-neutral-800");
      expect(darkDots).toHaveLength(3);
    });
  });

  it("renders category badge with correct styling", () => {
    render(<CourseCard {...defaultProps} category="Backend" />);

    const categoryBadge = screen.getByText("Backend");
    expect(categoryBadge).toBeInTheDocument();
    expect(categoryBadge).toHaveClass("text-brand-600");
  });

  it("handles different module counts", () => {
    render(<CourseCard {...defaultProps} modules={10} />);

    expect(screen.getByText("10 Modules")).toBeInTheDocument();
  });

  it("handles different duration formats", () => {
    render(<CourseCard {...defaultProps} duration="2h 15m" />);

    expect(screen.getByText("2h 15m")).toBeInTheDocument();
  });
});
