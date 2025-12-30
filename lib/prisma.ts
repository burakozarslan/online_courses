// lib/prisma.ts

import { PrismaClient } from "@/app/generated/prisma/client";
import { PrismaPg } from "@prisma/adapter-pg";

// 1. Import from YOUR custom generated path
// If you have aliases set up in tsconfig.json (recommended):

// OR if you don't have aliases, use a relative path:
// import { PrismaClient } from '../app/generated/prisma'

const globalForPrisma = globalThis as unknown as { prisma: PrismaClient };

export const db =
  globalForPrisma.prisma ||
  new PrismaClient({
    adapter: new PrismaPg({
      connectionString: process.env.DATABASE_URL,
    }),
  });

if (process.env.NODE_ENV !== "production") globalForPrisma.prisma = db;
