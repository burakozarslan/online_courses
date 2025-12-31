import { db } from "./lib/prisma";
import { Course } from "./app/generated/prisma/client";
import { getServerSession } from "next-auth";
import { authOptions } from "./lib/auth";

export async function getAllCourses() {
  const courses = await db.course.findMany();
  return courses;
}

export const getEnrollment = async (slug: Course["slug"]) => {
  const session = await getServerSession(authOptions);
  const enrollment = await db.enrollment.findFirst({
    where: {
      student: {
        userId: session?.user.id,
      },
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
      currentLesson: {
        include: {
          userProgress: {
            where: {
              student: {
                userId: session?.user.id,
              },
            },
          },
        },
      },
    },
  });
  return enrollment;
};
