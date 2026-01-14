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
        include: {
          lesson: true,
        },
      });

      // Create a map of lessonId -> progress data for quick lookup
      const progressMap = new Map(
        lessonProgress.map((p) => [p.lessonId, p])
      );

      // Calculate total duration (in seconds) and total progress (in seconds)
      let totalDurationInSeconds = 0;
      let totalProgressInSeconds = 0;
      let totalLessons = 0;
      let completedLessons = 0;

      enrollment.course.modules.forEach((module) => {
        module.lessons.forEach((lesson) => {
          totalLessons++;
          totalDurationInSeconds += lesson.duration;

          const progress = progressMap.get(lesson.id);
          if (progress) {
            // Add the actual time played (capped at lesson duration)
            const timePlayed = Math.min(progress.timePlayed, lesson.duration);
            totalProgressInSeconds += timePlayed;

            // Consider a lesson "completed" if watched >= 90% of its duration
            if (progress.timePlayed >= lesson.duration * 0.9) {
              completedLessons++;
            }
          }
        });
      });

      // Calculate overall progress percentage based on time watched
      const progressPercentage =
        totalDurationInSeconds > 0
          ? Math.round((totalProgressInSeconds / totalDurationInSeconds) * 100)
          : 0;

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
