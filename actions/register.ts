"use server";

import { db } from "@/lib/prisma";
import bcrypt from "bcryptjs";
import { z } from "zod";

const registerSchema = z.object({
  name: z.string().min(1, "Name is required"),
  email: z.string().email(),
  password: z.string().min(6, "Password must be at least 6 characters"),
});

export async function registerUser(prevState: any, formData: FormData) {
  try {
    const rawData = Object.fromEntries(formData.entries());
    const validatedFields = registerSchema.safeParse(rawData);

    if (!validatedFields.success) {
      return {
        error: validatedFields.error.flatten().fieldErrors,
        message: "Validation failed"
      };
    }

    const { name, email, password } = validatedFields.data;

    // Check if user exists
    const existingUser = await db.user.findUnique({
      where: { email },
    });

    if (existingUser) {
      return {
        message: "User already exists",
      };
    }

    // Hash password
    const hashedPassword = await bcrypt.hash(password, 10);

    // Create user and student profile
    await db.$transaction(async (tx) => {
      const user = await tx.user.create({
        data: {
          name,
          email,
          password: hashedPassword,
          studentProfile: {
            create: {},
          },
        },
      });
    });

    return { success: true };
  } catch (error) {
    console.error("Registration error:", error);
    return { message: "Something went wrong. Please try again." };
  }
}
