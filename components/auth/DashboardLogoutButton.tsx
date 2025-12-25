"use client";

import { LogOut } from "lucide-react";
import { signOut } from "next-auth/react";

export default function DashboardLogoutButton() {
  return (
    <button
      onClick={() => signOut({ callbackUrl: "/login" })}
      className="flex items-center gap-3 px-3 py-2 text-neutral-500 hover:text-error-500 transition-colors cursor-pointer"
    >
      <LogOut className="size-4" />
      <span className="text-caption">Log Out</span>
    </button>
  );
}
