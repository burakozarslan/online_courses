import { db } from "@/lib/prisma";

export async function getAllCategories() {
  const categories = await db.category.findMany({
    orderBy: {
      name: "asc",
    },
  });
  return categories;
}
