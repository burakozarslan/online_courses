import { NextRequest, NextResponse } from "next/server";
import Stripe from "stripe";
import { db } from "@/lib/prisma";

// Initialize Stripe
const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!, {
  apiVersion: "2025-12-15.clover",
  typescript: true,
});

const webhookSecret = process.env.STRIPE_WEBHOOK_SECRET!;

export async function POST(req: NextRequest) {
  try {
    // Get the raw body for signature verification
    const body = await req.text();
    const signature = req.headers.get("stripe-signature");

    if (!signature) {
      console.error("No stripe-signature header found");
      return NextResponse.json(
        { error: "No signature provided" },
        { status: 400 }
      );
    }

    // Verify webhook signature
    let event: Stripe.Event;
    try {
      event = stripe.webhooks.constructEvent(body, signature, webhookSecret);
    } catch (err) {
      console.error("Webhook signature verification failed:", err);
      return NextResponse.json(
        { error: "Invalid signature" },
        { status: 400 }
      );
    }

    // Handle different event types
    switch (event.type) {
      case "checkout.session.completed": {
        const session = event.data.object as Stripe.Checkout.Session;

        // Get subscription details
        const subscriptionId = session.subscription as string;
        const customerId = session.customer as string;

        if (!subscriptionId) {
          console.error("No subscription ID in checkout session");
          break;
        }

        // Retrieve the subscription to get more details
        const subscription = await stripe.subscriptions.retrieve(subscriptionId);

        // Get student ID from metadata
        const studentId = session.metadata?.studentId;

        if (!studentId) {
          console.error("No studentId in session metadata");
          break;
        }

        // Update student record with subscription data
        await db.student.update({
          where: { id: studentId },
          data: {
            stripeCustomerId: customerId,
            stripeSubscriptionId: subscriptionId,
            stripePriceId: subscription.items.data[0]?.price.id,
            stripeCurrentPeriodEnd: new Date(subscription.current_period_end * 1000),
            membership: "PRO",
          },
        });

        console.log(`✅ Subscription activated for student ${studentId}`);
        break;
      }

      case "customer.subscription.updated": {
        const subscription = event.data.object as Stripe.Subscription;

        // Find student by subscription ID
        const student = await db.student.findUnique({
          where: { stripeSubscriptionId: subscription.id },
        });

        if (!student) {
          console.error(`No student found for subscription ${subscription.id}`);
          break;
        }

        // Update subscription details
        await db.student.update({
          where: { id: student.id },
          data: {
            stripePriceId: subscription.items.data[0]?.price.id,
            stripeCurrentPeriodEnd: new Date(subscription.current_period_end * 1000),
            membership: subscription.status === "active" ? "PRO" : "FREE",
          },
        });

        console.log(`✅ Subscription updated for student ${student.id}`);
        break;
      }

      case "customer.subscription.deleted": {
        const subscription = event.data.object as Stripe.Subscription;

        // Find student by subscription ID
        const student = await db.student.findUnique({
          where: { stripeSubscriptionId: subscription.id },
        });

        if (!student) {
          console.error(`No student found for subscription ${subscription.id}`);
          break;
        }

        // Downgrade to FREE and clear subscription data
        await db.student.update({
          where: { id: student.id },
          data: {
            membership: "FREE",
            stripeSubscriptionId: null,
            stripePriceId: null,
            stripeCurrentPeriodEnd: null,
          },
        });

        console.log(`✅ Subscription cancelled for student ${student.id}`);
        break;
      }

      default:
        console.log(`Unhandled event type: ${event.type}`);
    }

    // Always return 200 to acknowledge receipt
    return NextResponse.json({ received: true });
  } catch (error) {
    console.error("Webhook processing error:", error);

    // Still return 200 to prevent Stripe from retrying
    // Log the error for investigation
    return NextResponse.json(
      { error: "Webhook processing failed" },
      { status: 200 }
    );
  }
}
