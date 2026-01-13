"use server";

import { db } from "@/lib/prisma";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";

export async function updateLessonProgress(lessonId: string, seconds: number) {
  const session = await getServerSession(authOptions);
  if (!session?.user?.id) return;

  const student = await db.student.findUnique({
    where: { userId: session.user.id },
  });

  if (!student) return;

  // 1. Upsert the progress for this specific lesson
  await db.lessonProgress.upsert({
    where: {
      studentId_lessonId: {
        studentId: student.id,
        lessonId: lessonId,
      },
    },
    update: {
      timePlayed: seconds,
    },
    create: {
      studentId: student.id,
      lessonId: lessonId,
      timePlayed: seconds,
    },
  });

  // 2. Update the enrollment to bookmark this as the current lesson
  const lesson = await db.lesson.findUnique({
    where: { id: lessonId },
    select: { moduleId: true, module: { select: { courseId: true } } },
  });

  if (lesson) {
    await db.enrollment.update({
      where: {
        studentId_courseId: {
          studentId: student.id,
          courseId: lesson.module.courseId,
        },
      },
      data: {
        currentLessonId: lessonId,
      },
    });
  }
}
