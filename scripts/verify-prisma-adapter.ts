
import { PrismaPg } from "@prisma/adapter-pg";
import { PrismaClient } from "../app/generated/prisma/client";
import "dotenv/config";

async function main() {
  console.log("Testing Prisma Adapter...");
  try {
    // Replicating lib/prisma.ts logic
    // @ts-ignore
    const adapter = new PrismaPg({
        connectionString: process.env.DATABASE_URL
    });
    
    const prisma = new PrismaClient({ adapter });
    
    await prisma.$connect();
    console.log("Successfully connected!");
    
    const userCount = await prisma.user.count();
    console.log(`User count: ${userCount}`);
    
    await prisma.$disconnect();
  } catch (error) {
    console.error("Connection failed:", error);
    process.exit(1);
  }
}

main();
