"use client";

import { useEffect, useState, useRef } from "react";
import { useSession } from "next-auth/react";
import { useRouter, useSearchParams } from "next/navigation";

export default function PaymentBeingProcessedPage() {
  const { data: session, status: sessionStatus, update } = useSession();
  const router = useRouter();
  const searchParams = useSearchParams();
  const courseSlug = searchParams.get("course");
  const [status, setStatus] = useState<"processing" | "success" | "timeout">(
    "processing"
  );
  const [elapsedTime, setElapsedTime] = useState(0);
  const hasStartedPolling = useRef(false);

  useEffect(() => {
    // Wait for session to finish loading before making any redirect decisions
    if (sessionStatus === "loading") {
      return;
    }
    
    // Prevent manual page access - must come from checkout with success param
    const hasSuccessParam = searchParams.get("success") === "true";
    
    if (!hasSuccessParam) {
      router.push("/pricing");
      return;
    }

    // Redirect to login if not authenticated
    if (!session) {
      router.push("/login");
      return;
    }

    // If user is already PRO and we haven't started polling yet, redirect to overview
    // (This prevents the case where user manually navigates here while already Pro)
    if (session.user.isPro && !hasStartedPolling.current) {
      router.push("/overview");
      return;
    }

    // If we've already started polling, don't start again (prevents race condition)
    if (hasStartedPolling.current) {
      return;
    }

    hasStartedPolling.current = true;

    let pollInterval: NodeJS.Timeout;
    let timeoutTimer: NodeJS.Timeout;
    let elapsedTimer: NodeJS.Timeout;

    const checkSubscription = async () => {
      try {
        const response = await fetch("/api/check-subscription");

        if (response.status === 401) {
          router.push("/login");
          return;
        }

        if (!response.ok) {
          console.error("Failed to check subscription status");
          return;
        }

        const data = await response.json();

        if (data.hasSubscription) {
          // Subscription is active! Now check enrollment if courseSlug exists
          if (courseSlug) {
            try {
              const enrollmentResponse = await fetch(
                `/api/enrollment?courseSlug=${courseSlug}`
              );
              
              if (enrollmentResponse.status === 404) {
                // Enrollment not created yet, keep polling
                return;
              }
              
              if (enrollmentResponse.ok) {
                // Both subscription AND enrollment are ready!
                clearInterval(pollInterval);
                clearTimeout(timeoutTimer);
                clearInterval(elapsedTimer);
                
                setStatus("success");
                await update();
                
                setTimeout(() => {
                  router.push(`/learning/${courseSlug}`);
                }, 1500);
              }
            } catch (error) {
              console.error("Error checking enrollment:", error);
              // Continue polling even on errors
            }
          } else {
            // No courseSlug - redirect to overview (general Pro upgrade)
            clearInterval(pollInterval);
            clearTimeout(timeoutTimer);
            clearInterval(elapsedTimer);
            
            setStatus("success");
            await update();
            
            setTimeout(() => {
              router.push("/overview");
            }, 1500);
          }
        }
      } catch (error) {
        console.error("Error checking subscription:", error);
        // Continue polling even on errors
      }
    };

    // Start polling immediately, then every 2 seconds
    checkSubscription();
    pollInterval = setInterval(checkSubscription, 2000);

    // Track elapsed time
    elapsedTimer = setInterval(() => {
      setElapsedTime((prev) => prev + 1);
    }, 1000);

    // Set timeout after 60 seconds
    timeoutTimer = setTimeout(() => {
      clearInterval(pollInterval);
      clearInterval(elapsedTimer);
      setStatus("timeout");
    }, 60000);

    // Cleanup on unmount
    return () => {
      clearInterval(pollInterval);
      clearTimeout(timeoutTimer);
      clearInterval(elapsedTimer);
    };
  }, [session, sessionStatus, router, update, searchParams, courseSlug]);

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-50 to-indigo-100">
      <div className="max-w-md w-full bg-white rounded-lg shadow-xl p-8">
        {status === "processing" && (
          <div className="text-center">
            {/* Spinner */}
            <div className="flex justify-center mb-6">
              <div className="relative">
                <div className="w-16 h-16 border-4 border-indigo-200 rounded-full"></div>
                <div className="w-16 h-16 border-4 border-indigo-600 rounded-full animate-spin border-t-transparent absolute top-0 left-0"></div>
              </div>
            </div>

            {/* Message */}
            <h1 className="text-2xl font-bold text-gray-800 mb-2">
              Processing Your Payment
            </h1>
            <p className="text-gray-600 mb-4">
              Please wait while we confirm your subscription...
            </p>

            {/* Progress indicator */}
            <div className="flex items-center justify-center space-x-2 text-sm text-gray-500">
              <div className="w-2 h-2 bg-indigo-600 rounded-full animate-pulse"></div>
              <span>This usually takes a few seconds</span>
            </div>

            {/* Elapsed time */}
            {elapsedTime > 10 && (
              <p className="mt-4 text-xs text-gray-400">
                Elapsed time: {elapsedTime}s
              </p>
            )}
          </div>
        )}

        {status === "success" && (
          <div className="text-center">
            {/* Success checkmark */}
            <div className="flex justify-center mb-6">
              <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center">
                <svg
                  className="w-10 h-10 text-green-600"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M5 13l4 4L19 7"
                  />
                </svg>
              </div>
            </div>

            <h1 className="text-2xl font-bold text-gray-800 mb-2">
              Payment Successful!
            </h1>
            <p className="text-gray-600">
              Redirecting you to your dashboard...
            </p>
          </div>
        )}

        {status === "timeout" && (
          <div className="text-center">
            {/* Warning icon */}
            <div className="flex justify-center mb-6">
              <div className="w-16 h-16 bg-yellow-100 rounded-full flex items-center justify-center">
                <svg
                  className="w-10 h-10 text-yellow-600"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z"
                  />
                </svg>
              </div>
            </div>

            <h1 className="text-2xl font-bold text-gray-800 mb-2">
              Taking Longer Than Expected
            </h1>
            <p className="text-gray-600 mb-6">
              Your payment is still being processed. This can take a few minutes.
              You can safely close this page and check your dashboard later.
            </p>

            <div className="space-y-3">
              <button
                onClick={() => router.push("/overview")}
                className="w-full bg-indigo-600 text-white py-2 px-4 rounded-lg hover:bg-indigo-700 transition-colors"
              >
                Go to Dashboard
              </button>
              <button
                onClick={() => router.push("/pricing")}
                className="w-full bg-gray-200 text-gray-700 py-2 px-4 rounded-lg hover:bg-gray-300 transition-colors"
              >
                Back to Pricing
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}