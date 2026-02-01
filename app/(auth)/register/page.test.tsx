import { describe, it, expect, vi, beforeEach } from "vitest";
import { render, screen, waitFor, fireEvent } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import RegisterPage from "./page";

// Mock next-auth/react
const mockSignIn = vi.fn();
vi.mock("next-auth/react", () => ({
  signIn: (...args: any[]) => mockSignIn(...args),
}));

// Mock next/navigation
const mockPush = vi.fn();
vi.mock("next/navigation", () => ({
  useRouter: () => ({
    push: mockPush,
  }),
}));

// Mock server action
const mockRegisterUser = vi.fn();
vi.mock("@/actions/register", () => ({
  registerUser: (prevState: any, formData: FormData) => mockRegisterUser(prevState, formData),
}));

describe("RegisterPage", () => {
  beforeEach(() => {
    vi.clearAllMocks();
    mockSignIn.mockResolvedValue({ ok: true });
  });

  it("renders the registration form", () => {
    render(<RegisterPage />);

    expect(screen.getByRole("heading", { name: /Sign Up/i })).toBeInTheDocument();
    expect(screen.getByLabelText(/FULL NAME/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/EMAIL_ADDRESS/i)).toBeInTheDocument();
    expect(screen.getByLabelText("PASSWORD")).toBeInTheDocument();
    expect(screen.getByRole("button", { name: /SIGN UP/i })).toBeInTheDocument();
  });

  // TODO: Fix form submission test with useActionState in JSDOM
  // it("handles successful registration", async () => {
  //   const user = userEvent.setup();
  //   // Simulate successful registration response
  //   mockRegisterUser.mockImplementation(async () => {
  //     return { success: true };
  //   });

  //   render(<RegisterPage />);

  //   await user.type(screen.getByLabelText(/FULL NAME/i), "John Doe");
  //   await user.type(screen.getByLabelText(/EMAIL_ADDRESS/i), "john@example.com");
  //   await user.type(screen.getByLabelText("PASSWORD"), "password123");

  //   const submitBtn = screen.getByRole("button", { name: /SIGN UP/i });
  //   fireEvent.click(submitBtn);

  //   await waitFor(() => {
  //     expect(mockRegisterUser).toHaveBeenCalled();
  //     expect(mockSignIn).toHaveBeenCalledWith("credentials", {
  //       email: "john@example.com",
  //       password: "password123",
  //       redirect: false,
  //     });
  //     expect(mockPush).toHaveBeenCalledWith("/overview");
  //   });
  // });

  // it("handles registration validation error", async () => {
  //   const user = userEvent.setup();
  //   // Simulate validation error
  //   mockRegisterUser.mockImplementation(async () => {
  //     return { 
  //       success: false, 
  //       error: { 
  //         email: ["Email is invalid"] 
  //       } 
  //     };
  //   });

  //   render(<RegisterPage />);

  //   await user.type(screen.getByLabelText(/FULL NAME/i), "John Doe");
  //   await user.type(screen.getByLabelText(/EMAIL_ADDRESS/i), "invalid-email");
  //   await user.type(screen.getByLabelText("PASSWORD"), "password123");

  //   const submitBtn = screen.getByRole("button", { name: /SIGN UP/i });
  //   fireEvent.click(submitBtn);

  //   await waitFor(() => {
  //     expect(screen.getByText("Email is invalid")).toBeInTheDocument();
  //   });
    
  //   expect(mockSignIn).not.toHaveBeenCalled();
  // });

  // it("handles registration generic error", async () => {
  //   // ... similar issue
  // });
});
