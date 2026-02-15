import { describe, it, expect, vi, beforeEach } from "vitest";
import { render, screen } from "@testing-library/react";
import { SessionProvider } from "next-auth/react";
import Sidebar from "./Sidebar";

// Mock next/navigation
const mockPathname = "/overview";
vi.mock("next/navigation", () => ({
  usePathname: vi.fn(() => mockPathname),
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

// Mock DashboardLogoutButton
vi.mock("../auth/DashboardLogoutButton", () => ({
  default: () => <button data-testid="logout-button">Log Out</button>,
}));

import { usePathname } from "next/navigation";

// Helper function to render Sidebar with SessionProvider
const renderSidebar = (isPro: boolean = true) => {
  const mockSession = {
    user: {
      id: "1",
      name: "John Doe",
      email: "john@example.com",
      role: "STUDENT",
      isPro,
    },
    expires: new Date(Date.now() + 24 * 60 * 60 * 1000).toISOString(),
  };

  return render(
    <SessionProvider session={mockSession}>
      <Sidebar />
    </SessionProvider>
  );
};

describe("Sidebar", () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it("renders sidebar with logo", () => {
    renderSidebar();

    expect(screen.getByText("DASHBOARD")).toBeInTheDocument();
  });

  it("renders user info section", () => {
    renderSidebar();

    expect(screen.getByText("John Doe")).toBeInTheDocument();
    expect(screen.getByText("PRO MEMBER")).toBeInTheDocument();
  });

  it("renders user info section for free member", () => {
    renderSidebar(false);

    expect(screen.getByText("John Doe")).toBeInTheDocument();
    expect(screen.getByText("FREE MEMBER")).toBeInTheDocument();
  });

  it("renders navigation links", () => {
    renderSidebar();

    expect(screen.getByText("Overview")).toBeInTheDocument();
    expect(screen.getByText("Enrolled")).toBeInTheDocument();

    expect(screen.getByText("Billing")).toBeInTheDocument();
  });

  it("renders settings and logout links", () => {
    renderSidebar();

    expect(screen.getByText("Settings")).toBeInTheDocument();
    expect(screen.getByTestId("logout-button")).toBeInTheDocument();
  });

  it("highlights active route for /overview", () => {
    vi.mocked(usePathname).mockReturnValue("/overview");
    const { container } = renderSidebar();

    const overviewLink = screen.getByText("Overview").closest("a");
    expect(overviewLink).toHaveClass("bg-neutral-800", "text-neutral-0", "border-brand-500");
  });

  it("highlights active route for /learning paths", () => {
    vi.mocked(usePathname).mockReturnValue("/learning/course-1");
    const { container } = renderSidebar();

    const enrolledLink = screen.getByText("Enrolled").closest("a");
    expect(enrolledLink).toHaveClass("bg-neutral-800", "text-neutral-0", "border-brand-500");
  });



  it("highlights active route for /billing", () => {
    vi.mocked(usePathname).mockReturnValue("/billing");
    const { container } = renderSidebar();

    const billingLink = screen.getByText("Billing").closest("a");
    expect(billingLink).toHaveClass("bg-neutral-800", "text-neutral-0", "border-brand-500");
  });

  it("applies inactive styling to non-active routes", () => {
    vi.mocked(usePathname).mockReturnValue("/overview");
    renderSidebar();

    const enrolledLink = screen.getByText("Enrolled").closest("a");
    expect(enrolledLink).not.toHaveClass("bg-neutral-800", "border-brand-500");
    expect(enrolledLink).toHaveClass("text-neutral-400");
  });

  it("renders with correct navigation links hrefs", () => {
    renderSidebar();

    expect(screen.getByText("Overview").closest("a")).toHaveAttribute("href", "/overview");
    expect(screen.getByText("Enrolled").closest("a")).toHaveAttribute("href", "/learning");

    expect(screen.getByText("Billing").closest("a")).toHaveAttribute("href", "/billing");
  });

  it("renders with correct styling classes", () => {
    const { container } = renderSidebar();

    const sidebar = container.querySelector("aside");
    expect(sidebar).toHaveClass("bg-neutral-900", "text-neutral-400");
  });
});
