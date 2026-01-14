"use server";

import { db } from "@/lib/prisma";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { checkEnrollment } from "./checkEnrollment";

// Server action to create enrollment
export async function createEnrollment(courseSlug: string) {
  const session = await getServerSession(authOptions);

  if (!session?.user) {
    return {
      success: false,
      error: "You must be logged in to enroll",
      redirectUrl: `/login?callbackUrl=/courses/${courseSlug}`,
    };
  }

  // Fetch course
  const course = await db.course.findUnique({
    where: { slug: courseSlug },
  });

  if (!course) {
    return {
      success: false,
      error: "Course not found",
    };
  }

  // Check if user already enrolled
  const existingEnrollment = await checkEnrollment(courseSlug, session.user.id);

  if (existingEnrollment) {
    return {
      success: true,
      redirectUrl: `/learning/${courseSlug}`,
      message: "Already enrolled",
    };
  }

  // Check access: course must be free OR user must have Pro membership
  if (!course.isFree && !session.user.isPro) {
    return {
      success: false,
      error: "Pro membership required",
      redirectUrl: `/payment-required?course=${courseSlug}`,
    };
  }

  // Get or create student profile
  let student = await db.student.findUnique({
    where: { userId: session.user.id },
  });

  if (!student) {
    student = await db.student.create({
      data: {
        userId: session.user.id,
        membership: session.user.isPro ? "PRO" : "FREE",
      },
    });
  }

  // Get first lesson of the course
  const firstModule = await db.module.findFirst({
    where: { courseId: course.id },
    orderBy: { no: "asc" },
    include: {
      lessons: {
        orderBy: { id: "asc" },
        take: 1,
      },
    },
  });

  // Create enrollment
  await db.enrollment.create({
    data: {
      studentId: student.id,
      courseId: course.id,
      currentLessonId: firstModule?.lessons[0]?.id || null,
    },
  });

  return {
    success: true,
    redirectUrl: `/learning/${courseSlug}`,
    message: "Successfully enrolled!",
  };
}
