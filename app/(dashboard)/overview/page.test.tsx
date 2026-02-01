import { describe, it, expect, vi, beforeEach } from "vitest";
import { render, screen } from "@testing-library/react";
import DashboardPage from "./page";

// Mock server actions and auth
const mockGetAllEnrollments = vi.fn();
vi.mock("@/actions/getAllEnrollments", () => ({
  getAllEnrollments: () => mockGetAllEnrollments(),
}));

const mockGetServerSession = vi.fn();
vi.mock("next-auth", () => ({
  getServerSession: () => mockGetServerSession(),
}));

// Mock authOptions (needed for getServerSession in real app, mocked here)
vi.mock("@/lib/auth", () => ({
  authOptions: {},
}));

describe("DashboardPage (Overview)", () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it("renders dashboard with no enrollments", async () => {
    mockGetServerSession.mockResolvedValue({ user: { id: "1", isPro: false } });
    mockGetAllEnrollments.mockResolvedValue([]);

    const component = await DashboardPage();
    render(component);

    expect(screen.getByText("Overview")).toBeInTheDocument();
    expect(screen.getByText("FREE PLAN")).toBeInTheDocument();
    expect(screen.getByText("No courses in progress yet.")).toBeInTheDocument();
    
    // Stats should be 0
    const zeroStats = screen.getAllByText("0");
    // We expect 2 zeros (InProgress and Completed)
    expect(zeroStats.length).toBeGreaterThanOrEqual(2);
  });

  it("renders dashboard with enrollments and stats", async () => {
    mockGetServerSession.mockResolvedValue({ user: { id: "1", isPro: true } });
    const mockEnrollments = [
      {
        id: "1",
        progressPercentage: 50,
        totalDuration: 120,
        updatedAt: new Date().toISOString(),
        course: {
          title: "Course 1",
          slug: "course-1",
          description: "Desc 1",
          _count: { modules: 5 },
          modules: []
        }
      },
      {
        id: "2",
        progressPercentage: 100, // Completed
        totalDuration: 60,
        updatedAt: new Date().toISOString(),
        course: {
          title: "Course 2",
          slug: "course-2",
          description: "Desc 2",
          _count: { modules: 2 },
          modules: []
        }
      }
    ];
    mockGetAllEnrollments.mockResolvedValue(mockEnrollments);

    const component = await DashboardPage();
    render(component);

    expect(screen.getByText("PRO PLAN")).toBeInTheDocument();
    
    // Check specific stat cards using test IDs or nearby text if possible, but simplest is to check within sections
    // Or just check that the numbers exist
    const stats = screen.getAllByText("1"); 
    expect(stats.length).toBeGreaterThanOrEqual(1); // At least one "1" for the stats
    
    // More precise check:
    expect(screen.getByText("IN PROGRESS").parentElement).toHaveTextContent("1");
    
    // Completed should be 1
    // Total hours: (120 + 60) / 60 = 3h
    expect(screen.getByText("TOTAL HOURS").parentElement).toHaveTextContent("3h");
    
    // Check continue learning section
    expect(screen.getByText("Continue Learning")).toBeInTheDocument();
    // Course 1 might appear in multiple places (Hero + Grid), so getAllByText
    expect(screen.getAllByText("Course 1").length).toBeGreaterThan(0);
  });
});
