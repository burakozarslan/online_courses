"use client";

import { useState } from "react";
import { LogOut } from "lucide-react";
import { signOut } from "next-auth/react";

export default function DashboardLogoutButton() {
  const [isLoading, setIsLoading] = useState(false);

  const handleLogout = async () => {
    try {
      setIsLoading(true);
      
      // 1. Sign out without the default redirect behavior
      await signOut({ redirect: false });

      // 2. Manually replace the current URL in the browser history
      // This overwrites "Dashboard" in the history stack with "/login",
      // so pressing "Back" skips the dashboard and goes to the page before it.
      window.location.replace("/login");
    } catch (error) {
      // If signOut fails, still redirect to login page
      // to ensure user can't stay on authenticated pages
      console.error("Error during logout:", error);
      window.location.replace("/login");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <button
      onClick={handleLogout}
      disabled={isLoading}
      aria-label="Log out"
      className="flex items-center gap-3 px-3 py-2 text-neutral-500 hover:text-error-500 transition-colors cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed"
    >
      <LogOut className="size-4" />
      <span className="text-caption">{isLoading ? "Logging out..." : "Log Out"}</span>
    </button>
  );
}
