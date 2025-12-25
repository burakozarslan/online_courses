"use client";

import { LogOut } from "lucide-react";
import { signOut } from "next-auth/react";

export default function DashboardLogoutButton() {
  const handleLogout = async () => {
    // 1. Sign out without the default redirect behavior
    await signOut({ redirect: false });

    // 2. Manually replace the current URL in the browser history
    // This overwrites "Dashboard" in the history stack with "/login",
    // so pressing "Back" skips the dashboard and goes to the page before it.
    window.location.replace("/login");
  };

  return (
    <button
      onClick={handleLogout}
      className="flex items-center gap-3 px-3 py-2 text-neutral-500 hover:text-error-500 transition-colors cursor-pointer"
    >
      <LogOut className="size-4" />
      <span className="text-caption">Log Out</span>
    </button>
  );
}
