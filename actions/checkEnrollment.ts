import { db } from "@/lib/prisma";

// Check if user is already enrolled in a course
export async function checkEnrollment(courseSlug: string, userId: string) {
  const course = await db.course.findUnique({
    where: { slug: courseSlug },
  });

  if (!course) return null;

  const enrollment = await db.enrollment.findFirst({
    where: {
      student: { userId },
      courseId: course.id,
    },
  });

  return enrollment;
}
