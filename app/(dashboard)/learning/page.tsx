import { getAllEnrollments } from "@/actions/getAllEnrollments";
import Link from "next/link";
import { BookOpen, Clock, Award } from "lucide-react";
import { redirect } from "next/navigation";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import {
  formatDurationFromMinutes,
  getCategoryName,
} from "@/lib/courseUtils";

// Helper function to get difficulty dots (returns JSX, so kept in component)
function getDifficultyDots(difficulty: "BEGINNER" | "INTERMEDIATE" | "ADVANCED") {
  const levels = {
    BEGINNER: 1,
    INTERMEDIATE: 2,
    ADVANCED: 3,
  };
  const level = levels[difficulty];

  return (
    <div className="flex gap-0.5">
      {[1, 2, 3].map((dot) => (
        <div
          key={dot}
          className={`w-1.5 h-1.5 ${
            dot <= level ? "bg-neutral-800" : "bg-neutral-300"
          }`}
        />
      ))}
    </div>
  );
}

export default async function LearningPage() {
  const session = await getServerSession(authOptions);

  if (!session) {
    redirect("/login");
  }

  const enrollments = await getAllEnrollments();

  return (
    <main className="grow p-8">
      {/* Header */}
      <div className="mb-8">
        <div className="flex items-center gap-3 mb-2">
          <div className="inline-flex items-center justify-center w-10 h-10 bg-brand-50 text-brand-700 border border-brand-100">
            <BookOpen className="w-5 h-5" />
          </div>
          <h1 className="text-heading-2 text-neutral-900">Enrolled Courses</h1>
        </div>
        <p className="text-body text-neutral-500">Continue learning from where you left off. Track your progress and complete your courses.</p>
      </div>

      {/* Enrolled Courses Grid */}
      <section className="py-12 bg-grid">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {enrollments.length === 0 ? (
            <div className="text-center py-16 bg-neutral-0 border border-neutral-200">
              <BookOpen className="w-16 h-16 text-neutral-300 mx-auto mb-4" />
              <h2 className="text-heading-3 text-neutral-900 mb-2">
                No Enrolled Courses Yet
              </h2>
              <p className="text-body text-neutral-600 mb-6 max-w-md mx-auto">
                Start your learning journey by enrolling in a course from our catalog.
              </p>
              <Link
                href="/courses"
                className="inline-block bg-brand-600 text-neutral-0 px-6 py-3 text-body font-medium hover:bg-brand-500 transition-colors"
              >
                Browse Courses
              </Link>
            </div>
          ) : (
            <>
              <div className="mb-6">
                <p className="text-caption text-neutral-500">
                  ENROLLED IN {enrollments.length} {enrollments.length === 1 ? "COURSE" : "COURSES"}
                </p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {enrollments.map((enrollment) => (
                  <div
                    key={enrollment.id}
                    className="bg-neutral-0 border border-neutral-200 hover:border-brand-500 transition-all hover:shadow-md flex flex-col"
                  >
                    {/* Course Image/Thumbnail */}
                    <div className="h-40 bg-neutral-100 border-b border-neutral-200 flex items-center justify-center relative group">
                      <i
                        data-lucide="layers"
                        className="w-10 h-10 text-neutral-400 group-hover:text-brand-500 transition-colors"
                      ></i>
                      {enrollment.course.isFree ? (
                        <span className="absolute top-3 right-3 bg-brand-100 text-brand-800 text-[10px] px-2 py-0.5 font-medium border border-brand-200">
                          FREE
                        </span>
                      ) : (
                        <span className="absolute top-3 right-3 bg-neutral-900 text-neutral-0 text-[10px] px-2 py-0.5 font-medium">
                          PRO
                        </span>
                      )}
                    </div>

                    {/* Course Info */}
                    <div className="p-5 grow flex flex-col">
                      <div className="flex justify-between items-start mb-3">
                        <span className="text-[10px] uppercase tracking-wider text-brand-600 font-semibold border border-brand-100 bg-brand-50 px-1.5 py-0.5">
                          {getCategoryName(enrollment.course.categories)}
                        </span>
                        {getDifficultyDots(enrollment.course.difficulty)}
                      </div>
                      <h3 className="text-heading-3 text-neutral-900 mb-2">
                        {enrollment.course.title}
                      </h3>
                      <p className="text-caption text-neutral-500 mb-4 grow line-clamp-2">
                        {enrollment.course.description}
                      </p>

                      {/* Progress Bar */}
                      <div className="mb-4">
                        <div className="flex justify-between items-center mb-2">
                          <span className="text-caption text-neutral-600">Progress</span>
                          <span className="text-caption font-medium text-neutral-900">
                            {enrollment.progressPercentage}%
                          </span>
                        </div>
                        <div className="w-full h-2 bg-neutral-100 border border-neutral-200">
                          <div
                            className="h-full bg-brand-600 transition-all"
                            style={{ width: `${enrollment.progressPercentage}%` }}
                          />
                        </div>
                        <p className="text-[10px] text-neutral-500 mt-1">
                          {enrollment.completedLessons} of {enrollment.totalLessons} lessons completed
                        </p>
                      </div>

                      {/* Stats */}
                      <div className="flex items-center justify-between pt-4 border-t border-neutral-100 text-caption text-neutral-600 mb-4">
                        <span className="flex items-center gap-1.5">
                          <Clock className="w-3 h-3" />
                          {formatDurationFromMinutes(enrollment.totalDuration)}
                        </span>
                        <span>{enrollment.course._count.modules} Modules</span>
                      </div>

                      {/* Action Button */}
                      <Link
                        href={`/learning/${enrollment.course.slug}`}
                        className="w-full bg-brand-600 text-neutral-0 px-4 py-2.5 text-body font-medium hover:bg-brand-500 transition-colors text-center"
                      >
                        {enrollment.progressPercentage === 0 ? "Start Learning" : "Continue Learning"}
                      </Link>
                    </div>
                  </div>
                ))}
              </div>
            </>
          )}
        </div>
      </section>
    </main>
  );
}
