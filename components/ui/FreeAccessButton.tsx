"use client";

import { useSession } from "next-auth/react";
import Link from "next/link";

interface FreeAccessButtonProps {
  className?: string;
}

export default function FreeAccessButton({ className }: FreeAccessButtonProps) {
  const { status } = useSession();
  const isLoggedIn = status === "authenticated";

  const href = isLoggedIn ? "/overview" : "/login?callbackUrl=/overview";

  return (
    <Link
      href={href}
      className={
        className ||
        "w-full py-3 border border-neutral-300 text-neutral-900 text-body font-medium text-center hover:border-neutral-900 transition-colors block"
      }
    >
      Start Learning for Free
    </Link>
  );
}
