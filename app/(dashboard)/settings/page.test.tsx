import { describe, it, expect, vi } from "vitest";
import { render, screen } from "@testing-library/react";
import SettingsPage from "./page";

// Mock Client Component
vi.mock("./SettingsClientPage", () => ({
  default: () => <div>Settings Client Page Mock</div>,
}));

describe("SettingsPage (Server)", () => {
  it("renders the settings page", async () => {
    const component = await SettingsPage();
    render(component);

    expect(screen.getByText("Settings Client Page Mock")).toBeInTheDocument();
  });
});
