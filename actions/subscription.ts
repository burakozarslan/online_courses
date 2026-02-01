"use server";

import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { db } from "@/lib/prisma";
import { stripe } from "@/lib/stripe";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";

export async function manageMembership(prevState: any, formData: FormData) {
  let shouldRedirect = false;
  
  try {
    const session = await getServerSession(authOptions);

    if (!session || !session.user) {
      return { error: "Unauthorized" };
    }

    const membershipPlan = formData.get("membershipPlan") as string;
    
    // Validation
    if (!membershipPlan || !["FREE", "PRO"].includes(membershipPlan)) {
      return { error: "Invalid membership plan" };
    }
    
    // Get student profile
    const student = await db.student.findUnique({
      where: { userId: session.user.id },
    });

    if (!student) {
      return { error: "Student profile not found" };
    }

    if (membershipPlan === "PRO") {
      // If already PRO and not cancelling, nothing to do?
      // Assuming UI handles disabling button, but server side check:
      if (student.membership === "PRO" && !student.stripeCancelAtPeriodEnd) {
         return { error: "You are already on the Pro plan" };
      }
      
      // If they are cancelling (stripeCancelAtPeriodEnd is true), and want to go back to PRO (cancel downgrade)
      // This case might be handled by "cancelDowngrade" action explicitly, but if they select PRO in the dropdown:
      if (student.membership === "PRO" && student.stripeCancelAtPeriodEnd) {
         return cancelDowngrade();
      }

      // If upgrading from FREE to PRO:
      shouldRedirect = true;
    } else {
      // Downgrade logic (PRO -> FREE)
      if (student.membership === "FREE") {
         return { error: "You are already on the Free plan" };
      }

      if (!student.stripeSubscriptionId) {
        // Fallback for manual PRO status without Stripe sub
        await db.student.update({
          where: { id: student.id },
          data: { membership: "FREE" }
        });
        revalidatePath("/settings");
        return { success: "Membership updated to Free" };
      }

      // Schedule cancellation in Stripe
      try {
        await stripe.subscriptions.update(student.stripeSubscriptionId, {
          cancel_at_period_end: true,
        });

        // Update DB
        const sub = await stripe.subscriptions.retrieve(student.stripeSubscriptionId);
        console.log("Stripe Subscription keys:", Object.keys(sub));

        // Handle potential camelCase vs snake_case due to 'typescript: true' config
        // Also fallback to items[0] if top-level is missing (seen in webhook logic)
        let periodEnd = (sub as any).current_period_end || (sub as any).currentPeriodEnd;
        
        if (!periodEnd && sub.items?.data?.[0]) {
            const firstItem = sub.items.data[0] as any;
            periodEnd = firstItem.current_period_end || firstItem.currentPeriodEnd;
        }

        if (!periodEnd) {
            console.error("Stripe subscription missing period end date:", sub);
            throw new Error("Stripe subscription missing current_period_end");
        }

        await db.student.update({
          where: { id: student.id },
          data: { 
            stripeCancelAtPeriodEnd: true,
            stripeCurrentPeriodEnd: new Date(periodEnd * 1000)
          } 
        });

        revalidatePath("/settings");
        return { success: "Your plan will be canceled at the end of the billing period." };

      } catch (stripeError: any) {
        console.error("Stripe error:", stripeError);
        return { error: "Failed to update subscription with Stripe: " + stripeError.message };
      }
    }

  } catch (error) {
     console.error("Error managing membership:", error);
     return { error: "Internal server error" };
  }

  // Perform redirect outside try/catch to avoid NEXT_REDIRECT error catching
  if (shouldRedirect) {
    redirect("/payment-required");
  }
}

export async function cancelDowngrade() {
  try {
    const session = await getServerSession(authOptions);

    if (!session || !session.user) {
      return { error: "Unauthorized" };
    }

    const student = await db.student.findUnique({
      where: { userId: session.user.id },
    });

    if (!student || !student.stripeSubscriptionId) {
      return { error: "Subscription not found" };
    }

    // Cancel the scheduled cancellation (resume subscription)
    await stripe.subscriptions.update(student.stripeSubscriptionId, {
      cancel_at_period_end: false,
    });

    await db.student.update({
      where: { id: student.id },
      data: { stripeCancelAtPeriodEnd: false }
    });

    revalidatePath("/settings");
    return { success: "Plan cancellation removed. You will remain on the Pro plan." };
  } catch (error) {
    console.error("Error cancelling downgrade:", error);
    return { error: "Failed to resume subscription" };
  }
}

export async function getSubscriptionDetails() {
  const session = await getServerSession(authOptions);

  if (!session || !session.user) {
    return null;
  }

  const student = await db.student.findUnique({
    where: { userId: session.user.id },
    select: {
      membership: true,
      stripeCurrentPeriodEnd: true,
      stripeCancelAtPeriodEnd: true,
    }
  });

  return student;
}
