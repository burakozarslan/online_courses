import { describe, it, expect, vi, beforeEach } from "vitest";
import { render, screen } from "@testing-library/react";
import CourseDetailPage from "./page";

// Mock server actions
// Mock server actions
const { mockGetCourseBySlug, mockCheckEnrollment } = vi.hoisted(() => {
  return {
    mockGetCourseBySlug: vi.fn(),
    mockCheckEnrollment: vi.fn(),
  };
});

vi.mock("../../../../actions/getCourseBySlug", () => ({
  getCourseBySlug: mockGetCourseBySlug,
}));

vi.mock("../../../../actions/checkEnrollment", () => ({
  checkEnrollment: mockCheckEnrollment,
}));

const mockGetServerSession = vi.fn();
vi.mock("next-auth", () => ({
  getServerSession: () => mockGetServerSession(),
}));

// Mock EnrollButton
vi.mock("./EnrollButton", () => ({
  default: () => <button>Enroll Now</button>,
}));

// Mock notFound
vi.mock("next/navigation", () => ({
  notFound: vi.fn(() => { throw new Error("NEXT_NOT_FOUND"); }),
  useRouter: () => ({ push: vi.fn() }), 
}));
import { notFound } from "next/navigation";

describe("CourseDetailPage", () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it("calls notFound if course does not exist", async () => {
    mockGetCourseBySlug.mockResolvedValue(null);
    mockGetServerSession.mockResolvedValue(null);

    try {
        await CourseDetailPage({
            params: Promise.resolve({ courseSlug: "invalid-course" }),
        });
    } catch (e: any) {
        expect(e.message).toBe("NEXT_NOT_FOUND");
    }
    
    expect(notFound).toHaveBeenCalled();
  });

  it("renders course details for guest", async () => {
    const mockCourse = {
      title: "Guest Course",
      slug: "guest-course",
      description: "Description",
      isFree: true,
      difficulty: "BEGINNER",
      instructor: { title: "Dev", user: { name: "John" } },
      modules: [],
    };
    mockGetCourseBySlug.mockResolvedValue(mockCourse);
    mockGetServerSession.mockResolvedValue(null);

    const component = await CourseDetailPage({
      params: Promise.resolve({ courseSlug: "guest-course" }),
    });
    render(component);

    expect(screen.getByText("Guest Course")).toBeInTheDocument();
    expect(screen.getByText("FREE COURSE")).toBeInTheDocument();
    expect(screen.getByText("Enroll Now")).toBeInTheDocument();
  });

  it("renders continue learning if enrolled", async () => {
    const mockCourse = {
      title: "Enrolled Course",
      slug: "enrolled-course",
      description: "Description",
      isFree: false,
      difficulty: "ADVANCED",
      instructor: { title: "Dev", user: { name: "John" } },
      modules: [],
    };
    mockGetCourseBySlug.mockResolvedValue(mockCourse);
    mockGetServerSession.mockResolvedValue({ user: { id: "u1" } });
    mockCheckEnrollment.mockResolvedValue({ id: "e1" }); // Enrolled

    const component = await CourseDetailPage({
      params: Promise.resolve({ courseSlug: "enrolled-course" }),
    });
    render(component);

    expect(screen.getByText("Continue Learning")).toBeInTheDocument();
  });
});
