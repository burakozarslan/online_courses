import { db } from "@/lib/prisma";
import { z } from "zod";

const getCourseBySlugSchema = z.object({
  slug: z.string().min(1),
});

// Get course details without enrollment requirement (for public course detail page)
export async function getCourseBySlug(slug: string) {
  const validation = getCourseBySlugSchema.safeParse({ slug });
  if (!validation.success) return null;

  const course = await db.course.findUnique({
    where: { slug, isPublished: true },
    include: {
      categories: true,
      instructor: {
        include: {
          user: true,
        },
      },
      modules: {
        orderBy: { no: "asc" },
        include: {
          lessons: {
            orderBy: { id: "asc" },
          },
        },
      },
    },
  });

  return course;
}
