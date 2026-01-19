import { describe, it, expect, vi, beforeEach } from "vitest";
import { render, screen, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import ModuleLesson from "./ModuleLesson";
import type { LessonType } from "../provider/CourseProvider";

// Mock CourseProvider
const mockSetActiveLesson = vi.fn();
const mockUpdateLessonProgressInState = vi.fn();
const mockActiveLesson = null;

vi.mock("../provider/CourseProvider", () => ({
  useCourse: vi.fn(() => ({
    activeLesson: mockActiveLesson,
    setActiveLesson: mockSetActiveLesson,
    updateLessonProgressInState: mockUpdateLessonProgressInState,
    course: null,
    error: null,
    loading: false,
    setCourse: vi.fn(),
  })),
}));

// Mock actions
vi.mock("@/actions/progress", () => ({
  resetLessonProgress: vi.fn(),
}));

// Mock config
vi.mock("@/config", () => ({
  COMPLETION_THRESHOLD: 95,
}));

// Mock window.scrollTo
global.window.scrollTo = vi.fn();

import { useCourse } from "../provider/CourseProvider";
import { resetLessonProgress } from "@/actions/progress";

describe("ModuleLesson", () => {
  const createMockLesson = (overrides?: Partial<LessonType>): LessonType => ({
    id: "lesson-1",
    moduleId: "module-1",
    title: "Introduction to React",
    description: "Learn the basics of React",
    duration: 600, // 10 minutes
    videoUrl: "https://example.com/video.mp4",
    userProgress: [],
    createdAt: new Date(),
    updatedAt: new Date(),
    ...overrides,
  });

  beforeEach(() => {
    vi.clearAllMocks();
    vi.mocked(useCourse).mockReturnValue({
      activeLesson: null,
      setActiveLesson: mockSetActiveLesson,
      updateLessonProgressInState: mockUpdateLessonProgressInState,
      course: null,
      error: null,
      loading: false,
      setCourse: vi.fn(),
    });
    vi.mocked(resetLessonProgress).mockResolvedValue(undefined);
  });

  it("renders lesson with title and description", () => {
    const lesson = createMockLesson();
    render(<ModuleLesson lesson={lesson} />);

    expect(screen.getByText("Introduction to React")).toBeInTheDocument();
    expect(screen.getByText("Learn the basics of React")).toBeInTheDocument();
  });

  it("displays formatted duration", () => {
    const lesson = createMockLesson({ duration: 125 }); // 2:05
    render(<ModuleLesson lesson={lesson} />);

    expect(screen.getByText("2:05")).toBeInTheDocument();
  });

  it("shows Start button for new lesson", () => {
    const lesson = createMockLesson();
    render(<ModuleLesson lesson={lesson} />);

    expect(screen.getByText("Start")).toBeInTheDocument();
  });

  it("shows Continue button for lesson with progress", () => {
    const lesson = createMockLesson({
      userProgress: [{ timePlayed: 100 } as any],
    });

    render(<ModuleLesson lesson={lesson} />);

    expect(screen.getByText("Continue")).toBeInTheDocument();
  });

  it("shows Replay button for completed lesson", () => {
    const lesson = createMockLesson({
      duration: 100,
      userProgress: [{ timePlayed: 95 } as any], // 95% complete
    });

    render(<ModuleLesson lesson={lesson} />);

    expect(screen.getByText("Replay")).toBeInTheDocument();
  });

  it("shows Continue button when lesson is active", () => {
    const lesson = createMockLesson();
    const activeLesson = lesson;

    vi.mocked(useCourse).mockReturnValue({
      activeLesson,
      setActiveLesson: mockSetActiveLesson,
      updateLessonProgressInState: mockUpdateLessonProgressInState,
      course: null,
      error: null,
      loading: false,
      setCourse: vi.fn(),
    });

    render(<ModuleLesson lesson={lesson} />);

    expect(screen.getByText("Continue")).toBeInTheDocument();
    expect(screen.getByText("NOW PLAYING")).toBeInTheDocument();
  });

  it("calls setActiveLesson when Start button is clicked", async () => {
    const user = userEvent.setup();
    const lesson = createMockLesson();
    render(<ModuleLesson lesson={lesson} />);

    const startButton = screen.getByText("Start");
    await user.click(startButton);

    expect(mockSetActiveLesson).toHaveBeenCalledWith(lesson);
    expect(global.window.scrollTo).toHaveBeenCalledWith({
      top: 280,
      left: 0,
      behavior: "smooth",
    });
  });

  it("calls resetLessonProgress when Replay button is clicked", async () => {
    const user = userEvent.setup();
    const lesson = createMockLesson({
      duration: 100,
      userProgress: [{ timePlayed: 95 } as any],
    });

    render(<ModuleLesson lesson={lesson} />);

    const replayButton = screen.getByText("Replay");
    await user.click(replayButton);

    await waitFor(() => {
      expect(resetLessonProgress).toHaveBeenCalledWith(lesson.id);
    });

    expect(mockUpdateLessonProgressInState).toHaveBeenCalledWith(lesson.id, 0);
    expect(mockSetActiveLesson).toHaveBeenCalled();
  });

  it("displays progress bar with correct width", () => {
    const lesson = createMockLesson({
      duration: 100,
      userProgress: [{ timePlayed: 50 } as any], // 50% complete
    });

    const { container } = render(<ModuleLesson lesson={lesson} />);

    const progressBar = container.querySelector(".bg-brand-500");
    expect(progressBar).toHaveStyle({ width: "50%" });
  });

  it("shows inactive icon for new lesson", () => {
    const lesson = createMockLesson();
    const { container } = render(<ModuleLesson lesson={lesson} />);

    // Inactive icon has border-neutral-200 class
    const icon = container.querySelector(".border-neutral-200");
    expect(icon).toBeInTheDocument();
  });

  it("shows active icon for active lesson", () => {
    const lesson = createMockLesson();
    const activeLesson = lesson;

    vi.mocked(useCourse).mockReturnValue({
      activeLesson,
      setActiveLesson: mockSetActiveLesson,
      updateLessonProgressInState: mockUpdateLessonProgressInState,
      course: null,
      error: null,
      loading: false,
      setCourse: vi.fn(),
    });

    const { container } = render(<ModuleLesson lesson={lesson} />);

    // Active icon has border-brand-500 class
    const icon = container.querySelector(".border-brand-500");
    expect(icon).toBeInTheDocument();
  });

  it("shows completed icon for completed lesson", () => {
    const lesson = createMockLesson({
      duration: 100,
      userProgress: [{ timePlayed: 95 } as any],
    });

    const { container } = render(<ModuleLesson lesson={lesson} />);

    // Completed icon has bg-brand-500 class
    const icon = container.querySelector(".bg-brand-500");
    expect(icon).toBeInTheDocument();
  });

  it("applies active styling when lesson is active", () => {
    const lesson = createMockLesson();
    const activeLesson = lesson;

    vi.mocked(useCourse).mockReturnValue({
      activeLesson,
      setActiveLesson: mockSetActiveLesson,
      updateLessonProgressInState: mockUpdateLessonProgressInState,
      course: null,
      error: null,
      loading: false,
      setCourse: vi.fn(),
    });

    const { container } = render(<ModuleLesson lesson={lesson} />);

    const title = screen.getByText("Introduction to React");
    expect(title).toHaveClass("text-brand-700");
  });

  it("handles zero duration gracefully", () => {
    const lesson = createMockLesson({ duration: 0 });
    render(<ModuleLesson lesson={lesson} />);

    // Should not crash and should display 0:00
    expect(screen.getByText("0:00")).toBeInTheDocument();
  });
});
