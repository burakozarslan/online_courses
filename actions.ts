import { db } from "./lib/prisma";
import { Course, Student } from "./app/generated/prisma/client";
import { withAuth } from "./lib/auth-wrapper";
import { getServerSession } from "next-auth";
import { authOptions } from "./lib/auth";
import { NextResponse } from "next/server";

export async function getAllCourses() {
  const courses = await db.course.findMany();
  return courses;
}

export const getEnrollment = async (slug: Course["slug"]) => {
  const session = await getServerSession(authOptions);
  const studentId = session?.user.id;
  const enrollment = await db.enrollment.findFirst({
    where: {
      studentId,
      course: {
        slug,
      },
    },
    include: {
      course: {
        include: {
          modules: {
            include: {
              lessons: true,
            },
          },
        },
      },
      currentLesson: true,
    },
  });
  return enrollment;
};
