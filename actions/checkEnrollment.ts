import { db } from "@/lib/prisma";
import { z } from "zod";

const checkEnrollmentSchema = z.object({
  courseSlug: z.string().min(1),
  userId: z.string().min(1),
});

// Check if user is already enrolled in a course
export async function checkEnrollment(courseSlug: string, userId: string) {
  const validation = checkEnrollmentSchema.safeParse({ courseSlug, userId });
  if (!validation.success) return null;

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
