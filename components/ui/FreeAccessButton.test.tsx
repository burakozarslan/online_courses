import { describe, it, expect, vi, beforeEach } from "vitest";
import { render, screen } from "@testing-library/react";
import FreeAccessButton from "./FreeAccessButton";

// Mock next-auth
vi.mock("next-auth/react", () => ({
  useSession: vi.fn(),
}));

// Mock Next.js Link
vi.mock("next/link", () => ({
  default: ({
    children,
    href,
    className,
  }: {
    children: React.ReactNode;
    href: string;
    className?: string;
  }) => (
    <a href={href} className={className}>
      {children}
    </a>
  ),
}));

import { useSession } from "next-auth/react";

describe("FreeAccessButton", () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it("renders with default text", () => {
    vi.mocked(useSession).mockReturnValue({
      data: null,
      status: "unauthenticated",
      update: vi.fn(),
    });

    render(<FreeAccessButton />);

    expect(screen.getByText("Start Learning for Free")).toBeInTheDocument();
  });

  it("links to /overview when user is authenticated", () => {
    vi.mocked(useSession).mockReturnValue({
      data: { user: { email: "test@example.com" } } as any,
      status: "authenticated",
      update: vi.fn(),
    });

    render(<FreeAccessButton />);

    const link = screen.getByText("Start Learning for Free");
    expect(link).toHaveAttribute("href", "/overview");
  });

  it("links to /login with callbackUrl when user is not authenticated", () => {
    vi.mocked(useSession).mockReturnValue({
      data: null,
      status: "unauthenticated",
      update: vi.fn(),
    });

    render(<FreeAccessButton />);

    const link = screen.getByText("Start Learning for Free");
    expect(link).toHaveAttribute("href", "/login?callbackUrl=/overview");
  });

  it("links to /login when session status is loading", () => {
    vi.mocked(useSession).mockReturnValue({
      data: null,
      status: "loading",
      update: vi.fn(),
    });

    render(<FreeAccessButton />);

    const link = screen.getByText("Start Learning for Free");
    expect(link).toHaveAttribute("href", "/login?callbackUrl=/overview");
  });

  it("applies custom className when provided", () => {
    vi.mocked(useSession).mockReturnValue({
      data: null,
      status: "unauthenticated",
      update: vi.fn(),
    });

    const customClass = "custom-button-class";
    render(<FreeAccessButton className={customClass} />);

    const link = screen.getByText("Start Learning for Free");
    expect(link).toHaveClass(customClass);
  });

  it("applies default className when none provided", () => {
    vi.mocked(useSession).mockReturnValue({
      data: null,
      status: "unauthenticated",
      update: vi.fn(),
    });

    render(<FreeAccessButton />);

    const link = screen.getByText("Start Learning for Free");
    expect(link).toHaveClass("border");
    expect(link).toHaveClass("border-neutral-300");
  });
});
