import { db } from "@/lib/prisma";

export async function getAllCourses(
  page: number,
  itemsPerPage: number,
  category?: string,
  searchQuery?: string
) {
  const courses = await db.course.findMany({
    where: {
      isPublished: true,
      ...(category && {
        categories: {
          some: {
            name: category,
          },
        },
      }),
      ...(searchQuery && {
        OR: [
          { title: { contains: searchQuery, mode: 'insensitive' } },
          { description: { contains: searchQuery, mode: 'insensitive' } },
          { 
            modules: { 
              some: { 
                title: { contains: searchQuery, mode: 'insensitive' } 
              } 
            }
          },
        ],
      }),
    },
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
    orderBy: {
      createdAt: "desc",
    },
    take: itemsPerPage,
    skip: (page - 1) * itemsPerPage,
  });
  return courses;
}
