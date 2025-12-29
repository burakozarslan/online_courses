// lib/prisma.ts

// 1. Import from YOUR custom generated path
// If you have aliases set up in tsconfig.json (recommended):
import { PrismaClient } from "@/app/generated/prisma";

// OR if you don't have aliases, use a relative path:
// import { PrismaClient } from '../app/generated/prisma'

const globalForPrisma = globalThis as unknown as { prisma: PrismaClient };

export const db =
  globalForPrisma.prisma ||
  new PrismaClient({
    log: ["query"],
  });

if (process.env.NODE_ENV !== "production") globalForPrisma.prisma = db;
