import { db } from "./lib/prisma";
import { Course } from "./app/generated/prisma/client";
import { getServerSession } from "next-auth";
import { authOptions } from "./lib/auth";
import { unstable_cache } from "next/cache";

export async function getAllCourses() {
  const courses = await db.course.findMany();
  return courses;
}

// Cached function to fetch the static course structure (Modules -> Lessons)
// This data is the same for all users, so we can cache it aggressively.
const getCourseStructure = unstable_cache(
  async (slug: string) => {
    return await db.course.findUnique({
      where: { slug },
      include: {
        modules: {
          orderBy: { no: "asc" },
          include: {
            lessons: {
              orderBy: { id: "asc" }, // Ensure consistent ordering
            },
          },
        },
      },
    });
  },
  ["course-structure"], // Cache tag
  { revalidate: 3600 } // Revalidate every hour
);

export const getEnrollment = async (
  slug: Course["slug"],
  userId?: string // Allow passing userId to skip redundant session check
) => {
  let currentUserId = userId;

  if (!currentUserId) {
    const session = await getServerSession(authOptions);
    currentUserId = session?.user.id;
  }

  if (!currentUserId) return null;

  // 1. Fetch the static course structure (Hits cache most of the time)
  const course = await getCourseStructure(slug);

  if (!course) return null;

  // 2. Fetch User-Specific Data (Enrollment & Progress) - Always dynamic
  const [enrollment, allProgress] = await Promise.all([
    db.enrollment.findFirst({
      where: {
        student: { userId: currentUserId },
        courseId: course.id,
      },
      include: {
        currentLesson: true,
      },
    }),
    db.lessonProgress.findMany({
      where: {
        student: { userId: currentUserId },
        lesson: { module: { courseId: course.id } },
      },
    }),
  ]);

  if (!enrollment) return null;

  // 3. Merge the static course data with the user's progress
  // This reconstructs the nested object structure expected by the frontend
  const progressMap = new Map(allProgress.map((p) => [p.lessonId, p]));

  const courseWithProgress = {
    ...course,
    modules: course.modules.map((module) => ({
      ...module,
      lessons: module.lessons.map((lesson) => ({
        ...lesson,
        userProgress: progressMap.has(lesson.id)
          ? [progressMap.get(lesson.id)!]
          : [],
      })),
    })),
  };

  // Default to the first lesson if the user hasn't started the course
  const activeLesson =
    enrollment.currentLesson || course.modules[0]?.lessons[0] || null;

  const currentLessonWithProgress = activeLesson
    ? {
        ...activeLesson,
        userProgress: progressMap.has(activeLesson.id)
          ? [progressMap.get(activeLesson.id)!]
          : [],
      }
    : null;

  return {
    ...enrollment,
    course: courseWithProgress,
    currentLesson: currentLessonWithProgress,
  };
};
