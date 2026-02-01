import { describe, it, expect, vi, beforeEach } from "vitest";
import { render, screen } from "@testing-library/react";
import LearningPage from "./page";

// Mock server actions and auth
const mockGetAllEnrollments = vi.fn();
vi.mock("@/actions/getAllEnrollments", () => ({
  getAllEnrollments: () => mockGetAllEnrollments(),
}));

const mockGetServerSession = vi.fn();
vi.mock("next-auth", () => ({
  getServerSession: () => mockGetServerSession(),
}));

// Mock navigation
const mockRedirect = vi.fn();
vi.mock("next/navigation", () => ({
  redirect: (url: string) => mockRedirect(url),
}));

describe("LearningPage", () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it("redirects to login if no session", async () => {
    mockGetServerSession.mockResolvedValue(null);
    
    // Call the async component
    try {
        await LearningPage();
    } catch (e) {
        // redirect throws an error in Next.js, catch it
    }
    
    expect(mockRedirect).toHaveBeenCalledWith("/login");
  });

  it("renders empty state when no enrollments", async () => {
    mockGetServerSession.mockResolvedValue({ user: { id: "1" } });
    mockGetAllEnrollments.mockResolvedValue([]);

    const component = await LearningPage();
    render(component);

    expect(screen.getByText("No Enrolled Courses Yet")).toBeInTheDocument();
    expect(screen.getByText("Browse Courses")).toBeInTheDocument();
  });

  it("renders enrolled courses", async () => {
    mockGetServerSession.mockResolvedValue({ user: { id: "1" } });
    const mockEnrollments = [
      {
        id: "1",
        progressPercentage: 50,
        completedLessons: 5,
        totalLessons: 10,
        totalDuration: 120,
        course: {
          id: "c1",
          title: "React Basics",
          slug: "react-basics",
          description: "Learn React",
          isFree: true,
          difficulty: "BEGINNER",
          categories: [{ name: "Frontend" }],
          _count: { modules: 2 }
        }
      }
    ];
    mockGetAllEnrollments.mockResolvedValue(mockEnrollments);

    const component = await LearningPage();
    render(component);

    expect(screen.getByText("Enrolled Courses")).toBeInTheDocument();
    expect(screen.getByText("React Basics")).toBeInTheDocument();
    expect(screen.getByText("50%")).toBeInTheDocument();
    expect(screen.getByText("Frontend")).toBeInTheDocument();
  });
});
