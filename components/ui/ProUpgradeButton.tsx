"use client";

import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { CreditCard, Check } from "lucide-react";
import { proMembershipPriceId } from "@/config";

interface ProUpgradeButtonProps {
  className?: string;
}

export default function ProUpgradeButton({ className }: ProUpgradeButtonProps) {
  const { data: session, status } = useSession();
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const isLoggedIn = status === "authenticated";
  const isPro = session?.user?.isPro;

  const handleProCheckout = async () => {
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
          priceId: proMembershipPriceId,
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

  const handleProButtonClick = () => {
    if (!isLoggedIn) {
      router.push("/login?callbackUrl=/pricing");
    } else if (isPro) {
      router.push("/overview");
    } else {
      handleProCheckout();
    }
  };

  return (
    <div className="w-full">
      <button
        onClick={handleProButtonClick}
        disabled={loading}
        className={
          className ||
          "w-full py-3 bg-brand-600 text-neutral-0 text-body font-medium text-center hover:bg-brand-700 transition-colors shadow-md flex items-center justify-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed"
        }
      >
        {loading ? (
          "Redirecting to checkout..."
        ) : isPro && isLoggedIn ? (
          <>
            <Check className="w-4 h-4" />
            Already Pro - Go to Dashboard
          </>
        ) : (
          <>
            <CreditCard className="w-4 h-4" />
            Upgrade to Pro for £9.99/month
          </>
        )}
      </button>
      {error && (
        <p className="text-red-600 text-caption mt-2 text-center">{error}</p>
      )}
    </div>
  );
}
