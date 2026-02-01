import { describe, it, expect, vi, beforeEach } from "vitest";
import { render, screen } from "@testing-library/react";
import CoursesPage from "./page";

// Mock server actions and db
const mockGetAllCourses = vi.fn();
vi.mock("@/actions/getAllCourses", () => ({
  getAllCourses: (page: number, limit: number) => mockGetAllCourses(page, limit),
}));

// Mock db
vi.mock("@/lib/prisma", () => ({
  db: {
    course: {
      count: vi.fn(),
    },
  },
}));

import { db } from "@/lib/prisma";

describe("CoursesPage", () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it("renders empty state", async () => {
    (db.course.count as any).mockResolvedValue(0);
    mockGetAllCourses.mockResolvedValue([]);

    const component = await CoursesPage({
      searchParams: Promise.resolve({ page: "1" }),
    });
    render(component);

    expect(screen.getByText("No courses available at the moment.")).toBeInTheDocument();
  });

  it("renders courses list", async () => {
    (db.course.count as any).mockResolvedValue(10);
    const mockCourses = [
      {
        id: "c1",
        title: "React Masterclass",
        slug: "react-masterclass",
        description: "Learn React",
        isFree: false,
        difficulty: "ADVANCED",
        categories: [{ name: "Frontend" }],
        modules: [
          { lessons: [{ duration: 3600 }] } // 1 hour
        ],
        _count: { modules: 1 }
      }
    ];
    mockGetAllCourses.mockResolvedValue(mockCourses);

    const component = await CoursesPage({
      searchParams: Promise.resolve({ page: "1" }),
    });
    render(component);

    expect(screen.getByText("React Masterclass")).toBeInTheDocument();
    expect(screen.getByText("PRO")).toBeInTheDocument();
    expect(screen.getByText("Frontend")).toBeInTheDocument();
    expect(screen.getByText("1h 0m")).toBeInTheDocument(); // Duration check
  });
});
