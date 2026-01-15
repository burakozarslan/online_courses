"use client";

import { useState } from "react";
import { CreditCard } from "lucide-react";
import { proMembershipId } from "@/config";

interface CheckoutButtonProps {
  courseSlug?: string;
}

export function CheckoutButton({ courseSlug }: CheckoutButtonProps) {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleCheckout = async () => {
    try {
      setLoading(true);
      setError(null);

      // Make POST request to checkout API
      const response = await fetch("/api/checkout", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          priceId: proMembershipId,
        }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || "Failed to create checkout session");
      }

      // Redirect to Stripe Checkout
      if (data.url) {
        window.location.href = data.url;
      } else {
        throw new Error("No checkout URL returned");
      }
    } catch (err) {
      console.error("Checkout error:", err);
      setError(err instanceof Error ? err.message : "Something went wrong");
      setLoading(false);
    }
  };

  return (
    <>
      <button
        onClick={handleCheckout}
        disabled={loading}
        className="bg-brand-600 text-neutral-0 px-8 py-3 text-body font-medium hover:bg-brand-500 transition-colors flex items-center justify-center gap-2 shadow-md disabled:opacity-50 disabled:cursor-not-allowed"
      >
        <CreditCard className="w-4 h-4" />
        {loading ? "Redirecting to checkout..." : "Upgrade to Pro for £9.99/month"}
      </button>
      {error && (
        <p className="text-error-600 text-caption mt-2">
          {error}
        </p>
      )}
    </>
  );
}
