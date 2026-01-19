import { describe, it, expect, vi, beforeEach } from "vitest";
import { render, screen } from "@testing-library/react";
import Navbar from "./Navbar";

// Mock next-auth
const mockSession = null;
vi.mock("next-auth", () => ({
  getServerSession: vi.fn(() => mockSession),
}));

// Mock authOptions
vi.mock("@/lib/auth", () => ({
  authOptions: {},
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

import { getServerSession } from "next-auth";

describe("Navbar", () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it("renders navbar with logo", async () => {
    vi.mocked(getServerSession).mockResolvedValue(null);
    const component = await Navbar();
    render(component);

    expect(screen.getByText("DEV_PLATFORM")).toBeInTheDocument();
  });

  it("renders navigation links", async () => {
    vi.mocked(getServerSession).mockResolvedValue(null);
    const component = await Navbar();
    render(component);

    expect(screen.getByText("Course Catalog")).toBeInTheDocument();
    expect(screen.getByText("Pricing")).toBeInTheDocument();
    expect(screen.getByText("Resources")).toBeInTheDocument();
  });

  it("shows login link when user is not authenticated", async () => {
    vi.mocked(getServerSession).mockResolvedValue(null);
    const component = await Navbar();
    render(component);

    expect(screen.getByText("[ LOGIN ]")).toBeInTheDocument();
  });

  it("shows dashboard link when user is authenticated", async () => {
    vi.mocked(getServerSession).mockResolvedValue({
      user: { email: "test@example.com" },
    } as any);

    const component = await Navbar();
    render(component);

    expect(await screen.findByText("[ DASHBOARD ]")).toBeInTheDocument();
  });

  it("shows Start Learning button when user is not authenticated", async () => {
    vi.mocked(getServerSession).mockResolvedValue(null);
    const component = await Navbar();
    render(component);

    expect(screen.getByText("Start Learning")).toBeInTheDocument();
  });

  it("shows Browse Courses button when user is authenticated", async () => {
    vi.mocked(getServerSession).mockResolvedValue({
      user: { email: "test@example.com" },
    } as any);

    const component = await Navbar();
    render(component);

    expect(await screen.findByText("Browse Courses")).toBeInTheDocument();
  });

  it("links to correct routes", async () => {
    vi.mocked(getServerSession).mockResolvedValue(null);
    const component = await Navbar();
    render(component);

    expect(screen.getByText("Course Catalog").closest("a")).toHaveAttribute("href", "/courses");
    expect(screen.getByText("Pricing").closest("a")).toHaveAttribute("href", "/pricing");
    expect(screen.getByText("DEV_PLATFORM").closest("a")).toHaveAttribute("href", "/");
  });

  it("links Start Learning button to pricing when not authenticated", async () => {
    vi.mocked(getServerSession).mockResolvedValue(null);
    const component = await Navbar();
    render(component);

    const button = screen.getByText("Start Learning").closest("a");
    expect(button).toHaveAttribute("href", "/pricing");
  });

  it("links Browse Courses button to courses when authenticated", async () => {
    vi.mocked(getServerSession).mockResolvedValue({
      user: { email: "test@example.com" },
    } as any);

    const component = await Navbar();
    render(component);

    const button = (await screen.findByText("Browse Courses")).closest("a");
    expect(button).toHaveAttribute("href", "/courses");
  });

  it("renders with correct styling classes", async () => {
    vi.mocked(getServerSession).mockResolvedValue(null);
    const component = await Navbar();
    const { container } = render(component);

    const nav = container.querySelector("nav");
    expect(nav).toHaveClass("sticky", "top-0", "z-50");
  });
});
