import { db } from "@/lib/prisma";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";

export const getAllEnrollments = async () => {
  const session = await getServerSession(authOptions);
  
  if (!session?.user?.id) {
    return [];
  }

  const enrollments = await db.enrollment.findMany({
    where: {
      student: {
        userId: session.user.id,
      },
    },
    include: {
      course: {
        include: {
          categories: true,
          modules: {
            include: {
              lessons: true,
            },
          },
          _count: {
            select: {
              modules: true,
            },
          },
        },
      },
      currentLesson: true,
    },
    orderBy: {
      updatedAt: "desc",
    },
  });

  // Calculate progress for each enrollment
  const enrollmentsWithProgress = await Promise.all(
    enrollments.map(async (enrollment) => {
      // Get all lesson progress for this course
      const lessonProgress = await db.lessonProgress.findMany({
        where: {
          studentId: enrollment.studentId,
          lesson: {
            module: {
              courseId: enrollment.courseId,
            },
          },
        },
      });

      // Calculate total lessons and completed lessons
      const totalLessons = enrollment.course.modules.reduce(
        (acc, module) => acc + module.lessons.length,
        0
      );

      const completedLessons = lessonProgress.length;
      const progressPercentage =
        totalLessons > 0 ? Math.round((completedLessons / totalLessons) * 100) : 0;

      // Calculate total duration
      const totalDurationInSeconds = enrollment.course.modules.reduce(
        (acc, module) => {
          const moduleDuration = module.lessons.reduce(
            (sum, lesson) => sum + lesson.duration,
            0
          );
          return acc + moduleDuration;
        },
        0
      );

      const totalDuration = Math.round(totalDurationInSeconds / 60); // Convert to minutes

      return {
        ...enrollment,
        progressPercentage,
        completedLessons,
        totalLessons,
        totalDuration,
      };
    })
  );

  return enrollmentsWithProgress;
};
