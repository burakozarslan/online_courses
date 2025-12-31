import { db } from "./lib/prisma";
import { Course } from "./app/generated/prisma/client";
import { withAuth } from "./lib/auth-wrapper";

export async function getAllCourses() {
  const courses = await db.course.findMany();
  return courses;
}

export const getCourseBySlug = withAuth(async (slug: Course["slug"]) => {
  const course = await db.course.findUnique({
    where: {
      slug,
    },
  });
  return course;
});
