"use server";

import { db } from "@/lib/prisma";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { z } from "zod";

const updateProgressSchema = z.object({
  lessonId: z.string().min(1),
  seconds: z.number().nonnegative(),
});

const resetProgressSchema = z.object({
  lessonId: z.string().min(1),
});

export async function updateLessonProgress(lessonId: string, seconds: number) {
  const validation = updateProgressSchema.safeParse({ lessonId, seconds });
  if (!validation.success) return;

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

export async function resetLessonProgress(lessonId: string) {
  const validation = resetProgressSchema.safeParse({ lessonId });
  if (!validation.success) return;
  
  // Simply reset the progress to 0 by reusing the existing update function
  await updateLessonProgress(lessonId, 0);
}
