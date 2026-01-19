import { describe, it, expect, vi, beforeEach } from "vitest";
import { render, screen } from "@testing-library/react";
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

describe("Sidebar", () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it("renders sidebar with logo", () => {
    render(<Sidebar />);

    expect(screen.getByText("DASHBOARD")).toBeInTheDocument();
  });

  it("renders user info section", () => {
    render(<Sidebar />);

    expect(screen.getByText("John Doe")).toBeInTheDocument();
    expect(screen.getByText("PRO MEMBER")).toBeInTheDocument();
  });

  it("renders navigation links", () => {
    render(<Sidebar />);

    expect(screen.getByText("Overview")).toBeInTheDocument();
    expect(screen.getByText("Enrolled")).toBeInTheDocument();
    expect(screen.getByText("Certificates")).toBeInTheDocument();
    expect(screen.getByText("Billing")).toBeInTheDocument();
  });

  it("renders settings and logout links", () => {
    render(<Sidebar />);

    expect(screen.getByText("Settings")).toBeInTheDocument();
    expect(screen.getByTestId("logout-button")).toBeInTheDocument();
  });

  it("highlights active route for /overview", () => {
    vi.mocked(usePathname).mockReturnValue("/overview");
    const { container } = render(<Sidebar />);

    const overviewLink = screen.getByText("Overview").closest("a");
    expect(overviewLink).toHaveClass("bg-neutral-800", "text-neutral-0", "border-brand-500");
  });

  it("highlights active route for /learning paths", () => {
    vi.mocked(usePathname).mockReturnValue("/learning/course-1");
    const { container } = render(<Sidebar />);

    const enrolledLink = screen.getByText("Enrolled").closest("a");
    expect(enrolledLink).toHaveClass("bg-neutral-800", "text-neutral-0", "border-brand-500");
  });

  it("highlights active route for /achievements", () => {
    vi.mocked(usePathname).mockReturnValue("/achievements");
    const { container } = render(<Sidebar />);

    const certificatesLink = screen.getByText("Certificates").closest("a");
    expect(certificatesLink).toHaveClass("bg-neutral-800", "text-neutral-0", "border-brand-500");
  });

  it("highlights active route for /billing", () => {
    vi.mocked(usePathname).mockReturnValue("/billing");
    const { container } = render(<Sidebar />);

    const billingLink = screen.getByText("Billing").closest("a");
    expect(billingLink).toHaveClass("bg-neutral-800", "text-neutral-0", "border-brand-500");
  });

  it("applies inactive styling to non-active routes", () => {
    vi.mocked(usePathname).mockReturnValue("/overview");
    render(<Sidebar />);

    const enrolledLink = screen.getByText("Enrolled").closest("a");
    expect(enrolledLink).not.toHaveClass("bg-neutral-800", "border-brand-500");
    expect(enrolledLink).toHaveClass("text-neutral-400");
  });

  it("renders with correct navigation links hrefs", () => {
    render(<Sidebar />);

    expect(screen.getByText("Overview").closest("a")).toHaveAttribute("href", "/overview");
    expect(screen.getByText("Enrolled").closest("a")).toHaveAttribute("href", "/learning");
    expect(screen.getByText("Certificates").closest("a")).toHaveAttribute("href", "/achievements");
    expect(screen.getByText("Billing").closest("a")).toHaveAttribute("href", "/billing");
  });

  it("renders with correct styling classes", () => {
    const { container } = render(<Sidebar />);

    const sidebar = container.querySelector("aside");
    expect(sidebar).toHaveClass("bg-neutral-900", "text-neutral-400");
  });
});
