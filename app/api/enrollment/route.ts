import { NextRequest, NextResponse } from "next/server";
import { getEnrollment } from "@/actions";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";

export async function GET(request: NextRequest) {
  const session = await getServerSession(authOptions);
  if (session?.user.role !== "STUDENT")
    return NextResponse.json({ message: "Unauthorized" }, { status: 401 });

  const searchParams = request.nextUrl.searchParams;
  const courseSlug = searchParams.get("courseSlug");

  if (!courseSlug) {
    return NextResponse.json(
      { error: "courseSlug is required" },
      { status: 400 }
    );
  }

  try {
    const enrollment = await getEnrollment(courseSlug);
    return NextResponse.json(enrollment);
  } catch (error) {
    console.error("Error fetching enrollment:", error);
    return NextResponse.json(
      { error: "Failed to fetch enrollment" },
      { status: 500 }
    );
  }
}
