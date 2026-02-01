import { describe, it, expect, vi } from "vitest";
import { render, screen } from "@testing-library/react";
import LandingPage from "./page";

// Mock components
vi.mock("@/components/layout/Navbar", () => ({ default: () => <div>Navbar</div> }));
vi.mock("@/components/layout/Hero", () => ({ default: () => <div>Hero Section</div> }));
vi.mock("@/components/layout/Footer", () => ({ default: () => <div>Footer</div> }));
vi.mock("@/components/layout/Pricing", () => ({ default: () => <div>Pricing Section</div> }));
vi.mock("@/components/layout/FeaturedCourses", () => ({ default: () => <div>Featured Courses</div> }));
vi.mock("@/components/layout/StatsBar", () => ({ default: () => <div>Stats Bar</div> }));

describe("LandingPage", () => {
  it("renders all sections", () => {
    render(<LandingPage />);

    expect(screen.getByText("Hero Section")).toBeInTheDocument();
    expect(screen.getByText("Stats Bar")).toBeInTheDocument();
    expect(screen.getByText("Featured Courses")).toBeInTheDocument();
    expect(screen.getByText("Pricing Section")).toBeInTheDocument();
  });
});
