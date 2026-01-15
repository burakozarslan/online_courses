import Link from "next/link";
import { Lock, CreditCard, CheckCircle2 } from "lucide-react";
import { getCourseBySlug } from "@/actions/getCourseBySlug";
import { CheckoutButton } from "./CheckoutButton";

type PageProps = {
  searchParams: Promise<{ course?: string }>;
};

export default async function PaymentRequiredPage({ searchParams }: PageProps) {
  const params = await searchParams;
  const courseSlug = params.course;

  let courseName = "this course";
  if (courseSlug) {
    const course = await getCourseBySlug(courseSlug);
    if (course) {
      courseName = course.title;
    }
  }

  return (
    <div className="min-h-screen bg-neutral-50 flex items-center justify-center px-6">
      <div className="max-w-2xl w-full">
        {/* Main Card */}
        <div className="bg-neutral-0 border border-neutral-200 p-12 text-center">
          {/* Icon */}
          <div className="mb-6 flex justify-center">
            <div className="w-20 h-20 bg-warning-100 border-2 border-warning-400 flex items-center justify-center">
              <Lock className="w-10 h-10 text-warning-600" />
            </div>
          </div>

          {/* Title & Description */}
          <h1 className="text-heading-1 text-neutral-900 mb-4">
            Pro Membership Required
          </h1>
          <p className="text-body text-neutral-600 mb-8 max-w-lg mx-auto leading-relaxed">
            Access to <strong>{courseName}</strong> is exclusive to Pro members.
            Upgrade your membership to unlock all premium courses, resources, and
            features.
          </p>

          {/* Features List */}
          <div className="bg-neutral-50 border border-neutral-200 p-6 mb-8 text-left max-w-md mx-auto">
            <p className="text-caption text-neutral-500 font-bold mb-4">
              PRO MEMBERSHIP INCLUDES:
            </p>
            <ul className="space-y-3">
              <li className="flex items-start gap-3">
                <CheckCircle2 className="w-4 h-4 text-brand-600 mt-0.5 shrink-0" />
                <span className="text-body text-neutral-700">
                  Unlimited access to all premium courses
                </span>
              </li>
              <li className="flex items-start gap-3">
                <CheckCircle2 className="w-4 h-4 text-brand-600 mt-0.5 shrink-0" />
                <span className="text-body text-neutral-700">
                  Download course resources and materials
                </span>
              </li>
              <li className="flex items-start gap-3">
                <CheckCircle2 className="w-4 h-4 text-brand-600 mt-0.5 shrink-0" />
                <span className="text-body text-neutral-700">
                  Earn completion certificates
                </span>
              </li>
              <li className="flex items-start gap-3">
                <CheckCircle2 className="w-4 h-4 text-brand-600 mt-0.5 shrink-0" />
                <span className="text-body text-neutral-700">
                  Priority support from instructors
                </span>
              </li>
              <li className="flex items-start gap-3">
                <CheckCircle2 className="w-4 h-4 text-brand-600 mt-0.5 shrink-0" />
                <span className="text-body text-neutral-700">
                  Early access to new courses
                </span>
              </li>
            </ul>
          </div>

          {/* CTA Buttons */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <CheckoutButton courseSlug={courseSlug} />
            <Link
              href={courseSlug ? `/courses/${courseSlug}` : "/overview"}
              className="bg-neutral-0 text-neutral-700 border border-neutral-300 px-8 py-3 text-body font-medium hover:bg-neutral-50 transition-colors"
            >
              {courseSlug ? "Back to Course" : "Back to Dashboard"}
            </Link>
          </div>
        </div>

        {/* Bottom Info */}
        <div className="mt-6 text-center">
          <p className="text-caption text-neutral-500">
            Need help? Contact{" "}
            <a href="#" className="text-brand-600 hover:text-brand-700">
              support@courses.com
            </a>
          </p>
        </div>
      </div>
    </div>
  );
}
