import React from "react";
import { describe, it, expect, vi, beforeEach } from "vitest";
import { render, screen, fireEvent } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { CourseSearchBar } from "./CourseSearchBar";

const mockPush = vi.fn();
const mockSearchParams = new URLSearchParams();

vi.mock("next/navigation", () => ({
  useRouter: () => ({
    push: mockPush,
  }),
  useSearchParams: () => ({
    get: (key: string) => mockSearchParams.get(key),
    toString: () => mockSearchParams.toString(),
    [Symbol.iterator]: () => mockSearchParams[Symbol.iterator](),
  }),
}));

describe("CourseSearchBar", () => {
  beforeEach(() => {
    vi.clearAllMocks();
    mockSearchParams.delete("search");
    mockSearchParams.delete("page");
  });

  it("renders the search input and button", () => {
    render(<CourseSearchBar />);

    expect(
      screen.getByPlaceholderText(/Search modules/i)
    ).toBeTruthy();
    expect(screen.getByRole("button", { name: /Search/i })).toBeTruthy();
  });

  it("initializes with search value from URL", () => {
    mockSearchParams.set("search", "React");
    render(<CourseSearchBar />);

    const input = screen.getByPlaceholderText(/Search modules/i) as HTMLInputElement;
    expect(input.value).toBe("React");
  });

  it("updates the URL when searching via button click", async () => {
    const user = userEvent.setup();
    render(<CourseSearchBar />);

    const input = screen.getByPlaceholderText(/Search modules/i);
    await user.type(input, "Next.js");

    const searchButton = screen.getByRole("button", { name: /Search/i });
    await user.click(searchButton);

    expect(mockPush).toHaveBeenCalledWith("/courses?search=Next.js");
  });

  it("updates the URL when searching via Enter key", async () => {
    const user = userEvent.setup();
    render(<CourseSearchBar />);

    const input = screen.getByPlaceholderText(/Search modules/i);
    await user.type(input, "TypeScript{enter}");

    expect(mockPush).toHaveBeenCalledWith("/courses?search=TypeScript");
  });

  it("clears search param when input is empty", async () => {
    mockSearchParams.set("search", "React");
    const user = userEvent.setup();
    render(<CourseSearchBar />);

    const input = screen.getByPlaceholderText(/Search modules/i);
    await user.clear(input);

    const searchButton = screen.getByRole("button", { name: /Search/i });
    await user.click(searchButton);

    expect(mockPush).toHaveBeenCalledWith("/courses");
  });

  it("resets page parameter when searching", async () => {
    mockSearchParams.set("page", "2");
    const user = userEvent.setup();
    render(<CourseSearchBar />);

    const input = screen.getByPlaceholderText(/Search modules/i);
    await user.type(input, "Postgres");

    const searchButton = screen.getByRole("button", { name: /Search/i });
    await user.click(searchButton);

    expect(mockPush).toHaveBeenCalledWith("/courses?search=Postgres");
    // Ensure 'page' is not in the resulting query string
  });

  it("preserves other search parameters when searching", async () => {
    mockSearchParams.set("category", "web-dev");
    const user = userEvent.setup();
    render(<CourseSearchBar />);

    const input = screen.getByPlaceholderText(/Search modules/i);
    await user.type(input, "React");

    const searchButton = screen.getByRole("button", { name: /Search/i });
    await user.click(searchButton);

    expect(mockPush).toHaveBeenCalledWith("/courses?category=web-dev&search=React");
  });
});
