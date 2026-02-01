"use server";

import { db } from "@/lib/prisma";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { MembershipPlan } from "@/app/generated/prisma/client";
import { revalidatePath } from "next/cache";

export async function updatePassword(prevState: any, formData: FormData) {
  try {
    const session = await getServerSession(authOptions);

    if (!session || !session.user) {
      return { error: "Unauthorized" };
    }

    const currentPassword = formData.get("currentPassword") as string;
    const newPassword = formData.get("newPassword") as string;

    // Validation
    if (!currentPassword || !newPassword) {
      return { error: "Current password and new password are required" };
    }

    if (newPassword.length < 6) {
      return { error: "New password must be at least 6 characters" };
    }

    // Get user from database
    const user = await db.user.findUnique({
      where: {
        id: session.user.id as string,
      },
    });

    if (!user) {
      return { error: "User not found" };
    }

    // Verify current password
    if (user.password !== currentPassword) {
      return { error: "Current password is incorrect" };
    }

    // Update password
    await db.user.update({
      where: {
        id: session.user.id as string,
      },
      data: {
        password: newPassword,
      },
    });

    return { success: "Password updated successfully" };
  } catch (error) {
    console.error("Error updating password:", error);
    return { error: "Internal server error" };
  }
}

export async function updateMembership(prevState: any, formData: FormData) {
  try {
    const session = await getServerSession(authOptions);

    if (!session || !session.user) {
      return { error: "Unauthorized" };
    }

    // Check if user is a student
    if (session.user.role !== "STUDENT") {
      return { error: "Only students can update membership plans" };
    }

    const membershipPlan = formData.get("membershipPlan") as string;

    // Validation
    if (!membershipPlan || !["FREE", "PRO"].includes(membershipPlan)) {
      return { error: "Invalid membership plan. Must be FREE or PRO" };
    }

    // Get student profile
    const user = await db.user.findUnique({
      where: {
        id: session.user.id as string,
      },
      include: {
        studentProfile: true,
      },
    });

    if (!user || !user.studentProfile) {
      return { error: "Student profile not found" };
    }

    // Update membership plan
    await db.student.update({
      where: {
        id: user.studentProfile.id,
      },
      data: {
        membership: membershipPlan as MembershipPlan,
      },
    });

    revalidatePath("/settings");
    return { success: "Membership plan updated successfully" };
  } catch (error) {
    console.error("Error updating membership plan:", error);
    return { error: "Internal server error" };
  }
}
