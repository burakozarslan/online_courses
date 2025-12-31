// lib/auth-wrapper.ts
import { getServerSession } from "next-auth";
import { authOptions } from "./auth";
import { NextResponse } from "next/server";

type Action<T extends unknown[] = unknown[], R = unknown> = (
  ...args: T
) => Promise<R>;

export const withAuth = <T extends unknown[], R>(action: Action<T, R>) => {
  return async (...args: T): Promise<R | NextResponse> => {
    const session = await getServerSession(authOptions);

    if (!session?.user) {
      return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
    }

    return action(...args);
  };
};
