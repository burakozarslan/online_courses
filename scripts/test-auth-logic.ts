
import "dotenv/config";
import { db } from "../lib/prisma";
import bcrypt from "bcryptjs";

async function testAuth() {
  console.log("🔐 Testing Auth Logic...");
  
  try {
    const email = "instructor@example.com"; // Default seed email
    const password = "password123";

    console.log(`Searching for user: ${email}`);
    const user = await db.user.findUnique({
      where: { email },
      include: {
        studentProfile: true,
        instructorProfile: true,
      },
    });

    if (!user) {
      console.error("❌ User not found!");
      process.exit(1);
    }
    console.log("✅ User found:", user.id, user.roles);

    console.log("Verifying password...");
    // @ts-ignore
    const match = await bcrypt.compare(password, user.password);
    
    if (match) {
      console.log("✅ Password match! Auth logic is correct.");
    } else {
      console.error("❌ Password does not match!");
    }

  } catch (error) {
    console.error("❌ Error during auth test:", error);
  } finally {
    await db.$disconnect();
  }
}

testAuth();
