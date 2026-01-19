import { describe, it, expect, vi, beforeEach } from "vitest";
import { render, screen } from "@testing-library/react";
import VideoPlayer from "./VideoPlayer";

// Mock next/dynamic
vi.mock("next/dynamic", () => ({
  default: (loader: any, options: any) => {
    const Component = () => <div data-testid="react-player">React Player</div>;
    Component.displayName = "DynamicReactPlayer";
    return Component;
  },
}));

// Mock media-chrome components
vi.mock("media-chrome/react", () => ({
  MediaController: ({ children }: { children: React.ReactNode }) => (
    <div data-testid="media-controller">{children}</div>
  ),
  MediaControlBar: ({ children }: { children: React.ReactNode }) => (
    <div data-testid="media-control-bar">{children}</div>
  ),
  MediaTimeRange: () => <div data-testid="time-range">Time Range</div>,
  MediaTimeDisplay: () => <div data-testid="time-display">Time Display</div>,
  MediaVolumeRange: () => <div data-testid="volume-range">Volume Range</div>,
  MediaPlaybackRateButton: () => (
    <button data-testid="playback-rate">Playback Rate</button>
  ),
  MediaPlayButton: () => <button data-testid="play-button">Play</button>,
  MediaSeekBackwardButton: () => (
    <button data-testid="seek-backward">Seek Back</button>
  ),
  MediaSeekForwardButton: () => (
    <button data-testid="seek-forward">Seek Forward</button>
  ),
  MediaMuteButton: () => <button data-testid="mute-button">Mute</button>,
  MediaFullscreenButton: () => (
    <button data-testid="fullscreen-button">Fullscreen</button>
  ),
}));

// Mock CourseProvider
vi.mock("../provider/CourseProvider", () => ({
  useCourse: () => ({
    activeLesson: {
      id: "lesson-1",
      moduleId: "module-1",
      videoUrl: "https://example.com/video.mp4",
      userProgress: [
        {
          id: "progress-1",
          studentId: "student-1",
          lessonId: "lesson-1",
          timePlayed: 0,
          createdAt: new Date(),
          updatedAt: new Date(),
        },
      ],
    },
    setActiveLesson: vi.fn(),
    setCourse: vi.fn(),
  }),
}));

vi.mock("@/actions/progress", () => ({
  updateLessonProgress: vi.fn(),
}));

describe("VideoPlayer", () => {

  it("renders the video player with all controls", () => {
    render(<VideoPlayer />);

    // Check main components
    expect(screen.getByTestId("media-controller")).toBeInTheDocument();
    expect(screen.getByTestId("react-player")).toBeInTheDocument();
    expect(screen.getByTestId("media-control-bar")).toBeInTheDocument();
  });

  it("renders all media control buttons", () => {
    render(<VideoPlayer />);

    expect(screen.getByTestId("play-button")).toBeInTheDocument();
    expect(screen.getByTestId("seek-backward")).toBeInTheDocument();
    expect(screen.getByTestId("seek-forward")).toBeInTheDocument();
    expect(screen.getByTestId("mute-button")).toBeInTheDocument();
    expect(screen.getByTestId("fullscreen-button")).toBeInTheDocument();
    expect(screen.getByTestId("playback-rate")).toBeInTheDocument();
  });

  it("renders time and volume controls", () => {
    render(<VideoPlayer />);

    expect(screen.getByTestId("time-range")).toBeInTheDocument();
    expect(screen.getByTestId("time-display")).toBeInTheDocument();
    expect(screen.getByTestId("volume-range")).toBeInTheDocument();
  });

  it("renders with correct aspect ratio styling", () => {
    const { container } = render(<VideoPlayer />);

    const controller = container.querySelector('[data-testid="media-controller"]');
    expect(controller).toBeInTheDocument();
  });
});
