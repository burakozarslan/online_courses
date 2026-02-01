import { describe, it, expect, vi, beforeEach, afterEach } from "vitest";
import { render, screen, waitFor } from "@testing-library/react";
import PaymentBeingProcessedPage from "./page";

// Mock next-auth
const mockUseSession = vi.fn();
vi.mock("next-auth/react", () => ({
  useSession: () => mockUseSession(),
}));

// Mock router
const mockPush = vi.fn();
vi.mock("next/navigation", () => ({
  useRouter: () => ({ push: mockPush }),
  useSearchParams: () => ({
    get: (key: string) => {
      if (key === "success") return "true";
      if (key === "course") return "test-course";
      return null;
    }
  }),
}));

global.fetch = vi.fn();

describe("PaymentBeingProcessedPage", () => {
  beforeEach(() => {
    vi.clearAllMocks();
    // Using real timers to avoid timeout issues with async fetch
  });

  it("renders processing state initially", () => {
    mockUseSession.mockReturnValue({ data: { user: {} }, status: "authenticated" });
    
    render(<PaymentBeingProcessedPage />);
    
    expect(screen.getByText("Processing Your Payment")).toBeInTheDocument();
  });

  it("polls for subscription and shows success", async () => {
    mockUseSession.mockReturnValue({ data: { user: {}, update: vi.fn() }, status: "authenticated", update: vi.fn() });
    
    // Mock successful check
    // Mock successful check
    // We mock implementation to handle multiple calls if polling happens faster or out of sync
    const fetchMock = global.fetch as any;
    fetchMock.mockReset(); // Clear previous mocks
    
    fetchMock.mockImplementation(async (url: string) => {
        if (url.includes("/api/check-subscription")) {
            return { ok: true, json: async () => ({ hasSubscription: true }) };
        }
        if (url.includes("/api/enrollment")) {
            return { ok: true, status: 200 };
        }
        return { ok: false };
    });
      
    render(<PaymentBeingProcessedPage />);
    
    // Initial check runs immediately
    // Wait for the success state update (async fetch needs to resolve)
    await waitFor(() => {
      expect(screen.getByText("Payment Successful!")).toBeInTheDocument();
    });
    
    // Now waiting for redirect timeout (1500ms in component)
    await new Promise((resolve) => setTimeout(resolve, 1600));
    
    await waitFor(() => {
        expect(mockPush).toHaveBeenCalledWith("/learning/test-course");
    }, { timeout: 4000 });
  });
});
