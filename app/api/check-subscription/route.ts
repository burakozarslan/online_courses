import { NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { db } from "@/lib/prisma";

export async function GET() {
  try {
    // Get authenticated session
    const session = await getServerSession(authOptions);

    if (!session || !session.user) {
      return NextResponse.json(
        { error: "Unauthorized - Please sign in" },
        { status: 401 }
      );
    }

    // Get student profile with subscription details
    const student = await db.student.findUnique({
      where: { userId: session.user.id },
      select: {
        stripeSubscriptionId: true,
        membership: true,
      },
    });

    if (!student) {
      return NextResponse.json(
        { error: "Student profile not found" },
        { status: 404 }
      );
    }

    // Check if student has an active subscription
    const hasSubscription = !!student.stripeSubscriptionId && student.membership === "PRO";

    return NextResponse.json({ hasSubscription });
  } catch (error) {
    console.error("Subscription check error:", error);
    return NextResponse.json(
      { error: "Failed to check subscription status" },
      { status: 500 }
    );
  }
}
