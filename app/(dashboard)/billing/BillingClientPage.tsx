"use client";

import { useState, useEffect } from "react";
import { CreditCard, CheckCircle2, AlertCircle, Calendar } from "lucide-react";
import { useSession } from "next-auth/react";
import { manageMembership, cancelDowngrade } from "@/actions/subscription";
import { useRouter } from "next/navigation";

type MessageType = {
  type: "success" | "error";
  text: string;
};

interface BillingClientPageProps {
  subscription: any;
}

export default function BillingClientPage({ subscription }: BillingClientPageProps) {
  const { update } = useSession();
  const router = useRouter();
  
  // Initialize plan from subscription prop, fallback to FREE
  const currentPlan = subscription?.membership || "FREE";
  const [membershipPlan, setMembershipPlan] = useState<"FREE" | "PRO">(currentPlan);
  
  const [membershipMessage, setMembershipMessage] = useState<MessageType | null>(null);
  const [isMembershipLoading, setIsMembershipLoading] = useState(false);
  const [isCancelLoading, setIsCancelLoading] = useState(false);

  // Sync state if subscription changes (e.g. after revalidation)
  useEffect(() => {
    if (subscription?.membership) {
        setMembershipPlan(subscription.membership);
    }
  }, [subscription]);

  const handleMembershipSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setMembershipMessage(null);
    setIsMembershipLoading(true);

    try {
      const formData = new FormData();
      formData.append("membershipPlan", membershipPlan);

      const result = await manageMembership(null, formData);

      if (result && 'error' in result && result.error) {
        setMembershipMessage({ type: "error", text: result.error });
      } else if (result && 'success' in result && result.success) {
        setMembershipMessage({ type: "success", text: result.success });
        await update(); // Update session
        router.refresh(); // Refresh to get new subscription props
      }
    } catch (error) {
      setMembershipMessage({ type: "error", text: "An error occurred. Please try again." });
    } finally {
      setIsMembershipLoading(false);
    }
  };

  const handleCancelDowngrade = async () => {
    setIsCancelLoading(true);
    try {
        const result = await cancelDowngrade();
        if (result && 'error' in result && result.error) {
            setMembershipMessage({ type: "error", text: result.error });
        } else if (result && 'success' in result && result.success) {
            setMembershipMessage({ type: "success", text: result.success });
            await update();
            router.refresh();
        }
    } catch (error) {
        setMembershipMessage({ type: "error", text: "Failed to cancel downgrade." });
    } finally {
        setIsCancelLoading(false);
    }
  };

  const isCurrentPlan = membershipPlan === currentPlan;
  const isPendingCancellation = subscription?.stripeCancelAtPeriodEnd;
  const formattedEndDate = subscription?.stripeCurrentPeriodEnd 
    ? new Date(subscription.stripeCurrentPeriodEnd).toLocaleDateString() 
    : "";

  return (
    <div className="p-6 md:p-8 w-full mx-auto">
      {/* Header */}
      <div className="mb-8">
        <div className="flex items-center gap-3 mb-2">
          <div className="inline-flex items-center justify-center w-10 h-10 bg-brand-50 text-brand-700 border border-brand-100">
            <CreditCard className="w-5 h-5" />
          </div>
          <h1 className="text-heading-2 text-neutral-900">Billing & Membership</h1>
        </div>
        <p className="text-body text-neutral-500">Manage your subscription and billing preferences</p>
      </div>

      <div className="flex justify-center">
        {/* Membership Plan Section */}
        <div className="bg-neutral-0 border border-neutral-200 shadow-sm w-full max-w-lg">
          <div className="h-1 w-full bg-brand-600"></div>
          
          <div className="p-6">
            <div className="flex items-center gap-3 mb-6">
              <div className="inline-flex items-center justify-center w-8 h-8 bg-brand-50 text-brand-700 border border-brand-100">
                <CreditCard className="w-4 h-4" />
              </div>
              <div>
                <h2 className="text-heading-4 text-neutral-900">Membership Plan</h2>
                <div className="flex flex-col">
                    <p className="text-caption text-neutral-500">
                    Current plan: <span className="font-medium text-brand-600">{currentPlan}</span>
                    </p>
                    {isPendingCancellation && (
                        <p className="text-caption text-warning-600 font-medium flex items-center gap-1 mt-1">
                            <Calendar className="w-3 h-3" />
                            Ends on {formattedEndDate}
                        </p>
                    )}
                </div>
              </div>
            </div>

            {membershipMessage && (
              <div
                className={`mb-4 p-3 border flex items-center gap-2 ${
                  membershipMessage.type === "success"
                    ? "bg-green-50 border-green-200 text-green-800"
                    : "bg-red-50 border-red-200 text-red-800"
                }`}
              >
                {membershipMessage.type === "success" ? (
                  <CheckCircle2 className="w-4 h-4 flex-shrink-0" />
                ) : (
                  <AlertCircle className="w-4 h-4 flex-shrink-0" />
                )}
                <span className="text-caption">{membershipMessage.text}</span>
              </div>
            )}
            
            {isPendingCancellation ? (
                 <div className="mb-6 p-4 bg-warning-50 border border-warning-200 rounded-md">
                    <p className="text-caption text-warning-800 mb-3">
                        Your Pro membership is valid until <strong>{formattedEndDate}</strong>. After that, your account will downgrade to the Free plan.
                    </p>
                    <button
                        onClick={handleCancelDowngrade}
                        disabled={isCancelLoading}
                        className="w-full bg-white border border-warning-300 text-warning-700 py-2 px-4 text-caption font-medium hover:bg-warning-100 transition-colors disabled:opacity-50"
                    >
                        {isCancelLoading ? "Processing..." : "Keep my Pro Plan"}
                    </button>
                 </div>
            ) : (
                <form onSubmit={handleMembershipSubmit} className="space-y-4">
                <div className="space-y-2">
                    <label
                    htmlFor="membershipPlan"
                    className="block text-caption text-neutral-700 font-medium"
                    >
                    Select Plan
                    </label>
                    <select
                    id="membershipPlan"
                    name="membershipPlan"
                    value={membershipPlan}
                    onChange={(e) => setMembershipPlan(e.target.value as "FREE" | "PRO")}
                    className="w-full bg-neutral-50 border border-neutral-300 px-4 py-2.5 text-body text-neutral-900 focus:outline-none focus:border-brand-500 focus:ring-1 focus:ring-brand-500 transition-colors"
                    >
                    <option value="FREE">Free Plan</option>
                    <option value="PRO">Pro Plan</option>
                    </select>
                </div>

                <div className="bg-neutral-50 border border-neutral-200 p-4 space-y-2">
                    <h3 className="text-caption font-medium text-neutral-700">Plan Details</h3>
                    <ul className="space-y-1 text-caption text-neutral-600">
                    {membershipPlan === "FREE" ? (
                        <>
                        <li className="flex items-start gap-2">
                            <span className="text-brand-600 mt-0.5">•</span>
                            <span>Access to free courses</span>
                        </li>
                        <li className="flex items-start gap-2">
                            <span className="text-brand-600 mt-0.5">•</span>
                            <span>Limited course selection</span>
                        </li>
                        <li className="flex items-start gap-2">
                            <span className="text-brand-600 mt-0.5">•</span>
                            <span>Basic learning features</span>
                        </li>
                        </>
                    ) : (
                        <>
                        <li className="flex items-start gap-2">
                            <span className="text-brand-600 mt-0.5">•</span>
                            <span>Access to all courses</span>
                        </li>
                        <li className="flex items-start gap-2">
                            <span className="text-brand-600 mt-0.5">•</span>
                            <span>Unlimited course enrollment</span>
                        </li>
                        <li className="flex items-start gap-2">
                            <span className="text-brand-600 mt-0.5">•</span>
                            <span>Premium learning features</span>
                        </li>
                        <li className="flex items-start gap-2">
                            <span className="text-brand-600 mt-0.5">•</span>
                            <span>Priority support</span>
                        </li>
                        </>
                    )}
                    </ul>
                </div>

                <button
                    type="submit"
                    disabled={isMembershipLoading || isCurrentPlan}
                    className="w-full bg-brand-600 text-neutral-0 py-2.5 px-4 text-body font-medium hover:bg-brand-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-brand-500 transition-all disabled:opacity-50 disabled:cursor-not-allowed"
                >
                    {isMembershipLoading ? "Updating..." : "Update Membership"}
                </button>
                </form>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
