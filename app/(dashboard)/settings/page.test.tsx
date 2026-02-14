import { describe, it, expect, vi } from "vitest";
import { render, screen } from "@testing-library/react";
import SettingsPage from "./page";

describe("SettingsPage (Server)", () => {
  it("renders the settings page", async () => {
    const component = await SettingsPage();
    render(component);

    expect(screen.getByText("Account Settings")).toBeInTheDocument();
  });
});
