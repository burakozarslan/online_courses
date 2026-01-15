"use client";

import { createEnrollment } from "@/actions/createEnrollment";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";

type EnrollButtonProps = {
  courseSlug: string;
  isFree: boolean;
  isLoggedIn: boolean;
};

export default function EnrollButton({
  courseSlug,
  isFree,
  isLoggedIn,
}: EnrollButtonProps) {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleEnroll = async () => {
    setLoading(true);
    setError(null);

    try {
      const result = await createEnrollment(courseSlug);

      if (result.success && result.redirectUrl) {
        router.push(result.redirectUrl);
      } else if (result.redirectUrl) {
        router.push(result.redirectUrl);
      } else if (result.error) {
        setError(result.error);
      }
    } catch (err) {
      setError("Something went wrong. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  if (!isLoggedIn) {
    return (
      <Link
        href={`/login?callbackUrl=/courses/${courseSlug}`}
        className="w-full sm:w-auto bg-brand-600 text-white px-8 py-3 text-body font-medium hover:bg-brand-500 transition-colors flex items-center justify-center gap-2 shadow-lg shadow-brand-900/20"
      >
        Login to Enroll
      </Link>
    );
  }

  return (
    <div className="w-full sm:w-auto">
      <button
        onClick={handleEnroll}
        disabled={loading}
        className="w-full bg-brand-600 text-white px-8 py-3 text-body font-medium hover:bg-brand-500 transition-colors flex items-center justify-center gap-2 shadow-lg shadow-brand-900/20 disabled:opacity-50 disabled:cursor-not-allowed"
      >
        {loading ? "Enrolling..." : `Enroll Now ${isFree ? "(Free)" : ""}`}
      </button>
      {error && (
        <p className="text-caption text-red-500 mt-2">{error}</p>
      )}
    </div>
  );
}
