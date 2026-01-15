import { db } from "@/lib/prisma";

// Get course details without enrollment requirement (for public course detail page)
export async function getCourseBySlug(slug: string) {
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
