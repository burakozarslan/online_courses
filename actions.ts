import { db } from "./lib/prisma";

export async function getAllCourses() {
  const courses = await db.course.findMany();
  return courses;
}
