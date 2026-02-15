import { describe, it, expect, vi, beforeEach } from "vitest";
import { render, screen } from "@testing-library/react";
import PaymentRequiredPage from "./page";

// Mock server actions
// Mock server actions
const { mockGetCourseBySlug } = vi.hoisted(() => {
  return {
    mockGetCourseBySlug: vi.fn(),
  };
});

vi.mock("../../../actions/getCourseBySlug", () => ({
  getCourseBySlug: mockGetCourseBySlug,
}));

// Mock CheckoutButton
vi.mock("./CheckoutButton", () => ({
  CheckoutButton: () => <button>Checkout Mock</button>,
}));

describe("PaymentRequiredPage", () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it("renders with default message when no course provided", async () => {
    const component = await PaymentRequiredPage({
      searchParams: Promise.resolve({}),
    });
    render(component);

    expect(screen.getByText("Pro Membership Required")).toBeInTheDocument();
    const paramText = screen.getByText((content, element) => {
        return element?.tagName.toLowerCase() === 'p' && 
               content.includes("Access to") && 
               content.includes("is exclusive");
    });
    expect(paramText).toBeInTheDocument();
    expect(screen.getByText("Back to Dashboard")).toBeInTheDocument();
  });

  it("renders with course name when course slug provided", async () => {
    mockGetCourseBySlug.mockResolvedValue({
      title: "Advanced React",
    });

    const component = await PaymentRequiredPage({
      searchParams: Promise.resolve({ course: "advanced-react" }),
    });
    render(component);

    // Using getByText with a function or regex because of the <strong> tag
    expect(screen.getByText(/Advanced React/)).toBeInTheDocument();
    expect(screen.getByText("Back to Course")).toBeInTheDocument();
  });
});
