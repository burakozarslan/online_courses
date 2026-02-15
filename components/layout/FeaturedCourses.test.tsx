import { describe, it, expect, vi, beforeEach } from "vitest";
import { render, screen } from "@testing-library/react";
import FeaturedCourses from "./FeaturedCourses";

// Mock server actions
const { mockGetAllCourses } = vi.hoisted(() => {
  return {
    mockGetAllCourses: vi.fn(),
  };
});

vi.mock("../../actions/getAllCourses", () => ({
  getAllCourses: mockGetAllCourses,
}));

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
  }: any) => (
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
  beforeEach(() => {
      mockGetAllCourses.mockResolvedValue([
          {
              id: "1",
              title: "Next.js & Shopify Integration",
              description: "Build a store",
              isPro: true,
              _count: { modules: 10 },
              modules: [],
              categories: [{ name: "Ecommerce" }],
              difficulty: 1,
              slug: "nextjs-shopify"
          },
          {
              id: "2",
              title: "Serverless Postgres with Neon",
              description: "Database",
              isPro: false,
              _count: { modules: 5 },
              modules: [],
              categories: [{ name: "Backend" }],
              difficulty: 2,
              slug: "neon-postgres"
          },
          {
              id: "3",
              title: "Advanced Auth Patterns",
              description: "Auth",
              isPro: false,
              _count: { modules: 8 },
              modules: [],
              categories: [{ name: "Security" }],
              difficulty: 3,
              slug: "auth-patterns"
          }
      ]);
  });

  it("renders section heading and description", async () => {
    const component = await FeaturedCourses();
    render(component);

    expect(screen.getByText("Latest Curriculums")).toBeInTheDocument();
    expect(
      screen.getByText(
        "Structured learning paths designed for engineering excellence."
      )
    ).toBeInTheDocument();
  });

  it("renders view all tracks link", async () => {
    const component = await FeaturedCourses();
    render(component);

    const link = screen.getByText("View All Tracks");
    expect(link).toBeInTheDocument();
    expect(link.closest("a")).toHaveAttribute("href", "/courses");
  });

  it("renders three course cards", async () => {
    const component = await FeaturedCourses();
    render(component);

    const courseCards = screen.getAllByTestId("course-card");
    expect(courseCards).toHaveLength(3);
  });

  it("renders course cards with correct content", async () => {
    const component = await FeaturedCourses();
    render(component);

    expect(screen.getByText("Next.js & Shopify Integration")).toBeInTheDocument();
    expect(screen.getByText("Serverless Postgres with Neon")).toBeInTheDocument();
    expect(screen.getByText("Advanced Auth Patterns")).toBeInTheDocument();
  });

  it("renders pro badge on first course card", async () => {
    const component = await FeaturedCourses();
    render(component);

    const proBadges = screen.getAllByText("PRO");
    expect(proBadges.length).toBeGreaterThan(0);
  });

  it("renders with correct grid layout", async () => {
    const component = await FeaturedCourses();
    const { container } = render(component);

    // The grid might be inside the component structure
    const grid = container.querySelector(".grid");
    expect(grid).toHaveClass("md:grid-cols-3");
  });
});
