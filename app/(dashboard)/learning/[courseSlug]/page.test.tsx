import { describe, it, expect, vi, beforeEach } from "vitest";
import { render, screen } from "@testing-library/react";
import CourseDetails from "./page";

// Mock CourseProvider
// The component calls useCourse()
const mockUseCourse = vi.fn();
vi.mock("@/components/provider/CourseProvider", () => ({
  useCourse: () => mockUseCourse(),
}));

// Mock other components to simplify test
vi.mock("@/components/ui/VideoPlayer", () => ({
  default: () => <div data-testid="video-player">Video Player</div>,
}));

vi.mock("@/components/layout/CourseModule", () => ({
  default: ({ module }: any) => <div data-testid="course-module">{module.title}</div>,
}));

describe("CourseDetails Page", () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it("renders loading state when course is missing", () => {
    mockUseCourse.mockReturnValue({ course: null });
    render(<CourseDetails />);
    expect(screen.getByText("Loading...")).toBeInTheDocument();
  });

  it("renders course details", () => {
    const mockCourse = {
      title: "Mastering Next.js",
      description: "Deep dive into Next.js",
      difficulty: "ADVANCED",
      modules: [
        {
          id: "m1",
          title: "Intro",
          lessons: [
            { duration: 60, userProgress: [{ timePlayed: 60 }] }
          ]
        }
      ]
    };
    mockUseCourse.mockReturnValue({ course: mockCourse });

    render(<CourseDetails />);

    expect(screen.getByText("Mastering Next.js")).toBeInTheDocument();
    expect(screen.getByText("Deep dive into Next.js")).toBeInTheDocument();
    expect(screen.getByText("Advanced")).toBeInTheDocument();
    expect(screen.getByTestId("video-player")).toBeInTheDocument();
    expect(screen.getByText("Intro")).toBeInTheDocument();
  });
});
