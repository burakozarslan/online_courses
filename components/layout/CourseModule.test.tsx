import { describe, it, expect, vi, beforeEach } from "vitest";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import CourseModule from "./CourseModule";
import type { ModuleType } from "../provider/CourseProvider";

// Mock CourseProvider
const mockSetActiveLesson = vi.fn();
const mockActiveLesson = null;

vi.mock("../provider/CourseProvider", () => ({
  useCourse: vi.fn(() => ({
    activeLesson: mockActiveLesson,
    setActiveLesson: mockSetActiveLesson,
    course: null,
    error: null,
    loading: false,
    setCourse: vi.fn(),
    updateLessonProgressInState: vi.fn(),
  })),
}));

// Mock ModuleLesson component
vi.mock("./ModuleLesson", () => ({
  default: ({ lesson }: { lesson: any }) => (
    <div data-testid="module-lesson">{lesson.title}</div>
  ),
}));

// Mock config
vi.mock("@/config", () => ({
  COMPLETION_THRESHOLD: 95,
}));

import { useCourse } from "../provider/CourseProvider";

describe("CourseModule", () => {
  const createMockModule = (overrides?: Partial<ModuleType>): ModuleType => ({
    id: "module-1",
    no: 1,
    title: "Introduction to React",
    courseId: "course-1",
    lessons: [
      {
        id: "lesson-1",
        moduleId: "module-1",
        title: "Lesson 1",
        description: "First lesson",
        duration: 600,
        videoUrl: "https://example.com/video1.mp4",
        userProgress: [],
      },
      {
        id: "lesson-2",
        moduleId: "module-1",
        title: "Lesson 2",
        description: "Second lesson",
        duration: 600,
        videoUrl: "https://example.com/video2.mp4",
        userProgress: [],
      },
    ],
    ...overrides,
  });

  beforeEach(() => {
    vi.clearAllMocks();
    vi.mocked(useCourse).mockReturnValue({
      activeLesson: null,
      setActiveLesson: mockSetActiveLesson,
      course: null,
      error: null,
      loading: false,
      setCourse: vi.fn(),
      updateLessonProgressInState: vi.fn(),
    });
  });

  it("renders module with title and number", () => {
    const module = createMockModule();
    render(<CourseModule module={module} />);

    expect(screen.getByText("MODULE 01")).toBeInTheDocument();
    expect(screen.getByText("Introduction to React")).toBeInTheDocument();
  });

  it("displays module number in badge", () => {
    const module = createMockModule({ no: 2 });
    render(<CourseModule module={module} />);

    expect(screen.getByText("MODULE 02")).toBeInTheDocument();
  });

  it("shows completion count", () => {
    const module = createMockModule();
    render(<CourseModule module={module} />);

    expect(screen.getByText("0/2 Completed")).toBeInTheDocument();
  });

  it("calculates completed lessons correctly", () => {
    const module = createMockModule({
      lessons: [
        {
          id: "lesson-1",
          moduleId: "module-1",
          title: "Lesson 1",
          description: "First lesson",
          duration: 100,
          videoUrl: "https://example.com/video1.mp4",
          userProgress: [{ timePlayed: 95 } as any], // 95% complete
        },
        {
          id: "lesson-2",
          moduleId: "module-1",
          title: "Lesson 2",
          description: "Second lesson",
          duration: 100,
          videoUrl: "https://example.com/video2.mp4",
          userProgress: [{ timePlayed: 50 } as any], // 50% complete
        },
      ],
    });

    render(<CourseModule module={module} />);

    expect(screen.getByText("1/2 Completed")).toBeInTheDocument();
  });

  it("shows check icon when module is completed", () => {
    const module = createMockModule({
      lessons: [
        {
          id: "lesson-1",
          moduleId: "module-1",
          title: "Lesson 1",
          description: "First lesson",
          duration: 100,
          videoUrl: "https://example.com/video1.mp4",
          userProgress: [{ timePlayed: 100 } as any], // 100% complete
        },
        {
          id: "lesson-2",
          moduleId: "module-1",
          title: "Lesson 2",
          description: "Second lesson",
          duration: 100,
          videoUrl: "https://example.com/video2.mp4",
          userProgress: [{ timePlayed: 100 } as any], // 100% complete
        },
      ],
    });

    const { container } = render(<CourseModule module={module} />);

    // Check icon should be present (lucide-react Check component)
    const checkIcon = container.querySelector('svg');
    expect(checkIcon).toBeInTheDocument();
  });

  it("toggles open/closed state when clicked", async () => {
    const user = userEvent.setup();
    const module = createMockModule();
    render(<CourseModule module={module} />);

    const header = screen.getByText("Introduction to React").closest("div");
    expect(header).toBeInTheDocument();

    // Initially closed (lessons not visible)
    expect(screen.queryByTestId("module-lesson")).not.toBeInTheDocument();

    // Click to open
    await user.click(header!);
    expect(screen.getAllByTestId("module-lesson")).toHaveLength(2);

    // Click to close
    await user.click(header!);
    expect(screen.queryByTestId("module-lesson")).not.toBeInTheDocument();
  });

  it("opens automatically when module contains active lesson", () => {
    const module = createMockModule();
    const activeLesson = module.lessons[0];

    vi.mocked(useCourse).mockReturnValue({
      activeLesson,
      setActiveLesson: mockSetActiveLesson,
      course: null,
      error: null,
      loading: false,
      setCourse: vi.fn(),
      updateLessonProgressInState: vi.fn(),
    });

    render(<CourseModule module={module} />);

    // Should be open and show lessons
    expect(screen.getAllByTestId("module-lesson")).toHaveLength(2);
  });

  it("applies active styling when module contains active lesson", () => {
    const module = createMockModule();
    const activeLesson = module.lessons[0];

    vi.mocked(useCourse).mockReturnValue({
      activeLesson,
      setActiveLesson: mockSetActiveLesson,
      course: null,
      error: null,
      loading: false,
      setCourse: vi.fn(),
      updateLessonProgressInState: vi.fn(),
    });

    const { container } = render(<CourseModule module={module} />);

    const moduleDiv = container.firstChild as HTMLElement;
    expect(moduleDiv).toHaveClass("border-brand-500", "border-2");
  });

  it("renders all lessons when open", async () => {
    const user = userEvent.setup();
    const module = createMockModule();
    render(<CourseModule module={module} />);

    const header = screen.getByText("Introduction to React").closest("div");
    await user.click(header!);

    expect(screen.getByText("Lesson 1")).toBeInTheDocument();
    expect(screen.getByText("Lesson 2")).toBeInTheDocument();
  });
});
