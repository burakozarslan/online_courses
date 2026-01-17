import { NextRequest, NextResponse } from "next/server";
import { getEnrollment } from "@/actions/getEnrollment";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { z } from "zod";

const enrollmentSchema = z.object({
  courseSlug: z.string().min(1),
});

export async function GET(request: NextRequest) {
  const session = await getServerSession(authOptions);
  if (session?.user.role !== "STUDENT")
    return NextResponse.json({ message: "Unauthorized" }, { status: 401 });

  const searchParams = request.nextUrl.searchParams;
  const courseSlug = searchParams.get("courseSlug");

  const validation = enrollmentSchema.safeParse({ courseSlug });

  if (!validation.success) {
    return NextResponse.json(
      { error: "courseSlug is required" },
      { status: 400 }
    );
  }

  try {
    const enrollment = await getEnrollment(validation.data.courseSlug, session.user.id);
    if (!enrollment)
      return NextResponse.json({ error: "Not found." }, { status: 404 });
    return NextResponse.json(enrollment);
  } catch (error) {
    console.error("Error fetching enrollment:", error);
    return NextResponse.json(
      { error: "Failed to fetch enrollment" },
      { status: 500 }
    );
  }
}
