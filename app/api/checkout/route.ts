import { NextRequest, NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import Stripe from "stripe";
import { authOptions } from "@/lib/auth";
import { db } from "@/lib/prisma";

// Initialize Stripe
const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!, {
  apiVersion: "2024-12-18.acacia",
});

export async function POST(req: NextRequest) {
  try {
    // 1. Authentication - Get session and verify student profile exists
    const session = await getServerSession(authOptions);

    if (!session || !session.user) {
      return NextResponse.json(
        { error: "Unauthorized - Please sign in" },
        { status: 401 }
      );
    }

    // 2. Request validation - Get priceId from body
    const body = await req.json();
    const { priceId } = body;

    if (!priceId || typeof priceId !== "string") {
      return NextResponse.json(
        { error: "Invalid request - priceId is required" },
        { status: 400 }
      );
    }

    // 3. Get student profile
    const student = await db.student.findUnique({
      where: { userId: session.user.id },
      include: { user: true },
    });

    if (!student) {
      return NextResponse.json(
        { error: "Student profile not found" },
        { status: 404 }
      );
    }

    // 4. Customer handling - Check if student already has a Stripe customer ID
    let stripeCustomerId = student.stripeCustomerId;

    if (!stripeCustomerId) {
      // Create a new Stripe customer
      const customer = await stripe.customers.create({
        email: student.user.email,
        name: student.user.name || undefined,
        metadata: {
          userId: session.user.id,
          studentId: student.id,
        },
      });

      stripeCustomerId = customer.id;

      // Save the customer ID to database
      await db.student.update({
        where: { id: student.id },
        data: { stripeCustomerId: customer.id },
      });
    }

    // 5. Create Stripe checkout session
    const checkoutSession = await stripe.checkout.sessions.create({
      mode: "subscription",
      customer: stripeCustomerId,
      line_items: [
        {
          price: priceId,
          quantity: 1,
        },
      ],
      success_url: `${process.env.NEXT_PUBLIC_BASE_URL}/overview?success=true`,
      cancel_url: `${process.env.NEXT_PUBLIC_BASE_URL}/pricing`,
      metadata: {
        userId: session.user.id,
        studentId: student.id,
      },
    });

    // 6. Return the checkout session URL
    return NextResponse.json({ url: checkoutSession.url });
  } catch (error) {
    console.error("Checkout error:", error);

    if (error instanceof Stripe.errors.StripeError) {
      return NextResponse.json(
        { error: `Stripe error: ${error.message}` },
        { status: 500 }
      );
    }

    return NextResponse.json(
      { error: "Failed to create checkout session" },
      { status: 500 }
    );
  }
}
