import {
  Share2,
  Folder,
  Github,
  FileText,
  Figma,
  MessageSquare,
  Lock,
  CheckCircle2,
} from "lucide-react";
import Link from "next/link";
import { getCourseBySlug } from "@/actions/getCourseBySlug";
import { checkEnrollment } from "@/actions/checkEnrollment";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { notFound } from "next/navigation";
import EnrollButton from "./EnrollButton";

import type { Metadata } from "next";

type PageProps = {
  params: Promise<{ courseSlug: string }>;
};

export async function generateMetadata({
  params,
}: PageProps): Promise<Metadata> {
  const { courseSlug } = await params;
  const course = await getCourseBySlug(courseSlug);

  if (!course) {
    return {
      title: "Course Not Found",
    };
  }

  return {
    title: `${course.title} | Lumina`,
    description: course.description,
    openGraph: {
      title: course.title,
      description: course.description,
      images: [course.imageUrl],
    },
  };
}

function formatCourseDifficulty(difficulty: string) {
  if (difficulty === "BEGINNER") return "Beginner";
  else if (difficulty === "INTERMEDIATE") return "Intermediate";
  else return "Advanced";
}

function formatToHoursMinutes(totalSeconds: number) {
  const hours = Math.floor(totalSeconds / 3600);
  const minutes = Math.floor((totalSeconds % 3600) / 60);

  if (hours > 0) {
    return `${hours}h ${minutes}m`;
  }
  return `${minutes}m`;
}

function calculateModuleDurationInSeconds(lessons: { duration: number }[]) {
  const totalDurationInSeconds = lessons.reduce(
    (prev, current) => prev + current.duration,
    0
  );
  return totalDurationInSeconds;
}

function calculateFormattedCourseDuration(
  modules: { lessons: { duration: number }[] }[]
) {
  const totalDurationInSeconds = modules.reduce(
    (prev, current) =>
      prev + calculateModuleDurationInSeconds(current.lessons),
    0
  );
  return formatToHoursMinutes(totalDurationInSeconds);
}

export default async function CourseDetailPage({ params }: PageProps) {
  const { courseSlug } = await params;
  const session = await getServerSession(authOptions);

  // Fetch course details
  const course = await getCourseBySlug(courseSlug);

  if (!course) {
    notFound();
  }

  // Check if user is enrolled
  let isEnrolled = false;
  if (session?.user) {
    const enrollment = await checkEnrollment(courseSlug, session.user.id);
    isEnrolled = !!enrollment;
  }

  return (
    <main className="min-h-screen bg-neutral-50">
      {/* <!-- Breadcrumb / Header --> */}
      <header className="h-16 bg-neutral-0 border-b border-neutral-200 flex items-center justify-between px-6">
        <div className="flex items-center gap-2 text-caption text-neutral-500">
          <Link href="/" className="hover:text-neutral-900">
            HOME
          </Link>
          <span>/</span>
          <Link href="/courses" className="hover:text-neutral-900">
            COURSES
          </Link>
          <span>/</span>
          <span className="text-neutral-900 font-bold uppercase">
            {course.slug.replace(/-/g, "_")}
          </span>
        </div>
        <div className="flex items-center gap-4">
          <button className="text-caption text-neutral-500 hover:text-neutral-900 flex items-center gap-1">
            <Share2 className="w-3 h-3" /> Share
          </button>
        </div>
      </header>

      {/* <!-- Course Header Hero --> */}
      <div className="bg-neutral-900 text-neutral-0 border-b border-neutral-800">
        <div className="max-w-7xl mx-auto px-6 py-12">
          <div className="flex flex-col lg:flex-row gap-12">
            <div className="flex-1">
              <div className="inline-flex items-center gap-2 px-2 py-1 bg-brand-900/30 border border-brand-800 text-brand-400 text-caption mb-4">
                <span className="w-1.5 h-1.5 bg-brand-500"></span>
                {course.isFree ? "FREE COURSE" : "PRO COURSE"}
              </div>
              <h1 className="text-heading-1 mb-4">{course.title}</h1>
              <p className="text-body text-neutral-400 mb-8 max-w-2xl leading-relaxed">
                {course.description}
              </p>

              {/* <!-- CTA Section --> */}
              <div className="flex flex-col sm:flex-row items-start gap-6">
                {isEnrolled ? (
                  <Link
                    href={`/learning/${course.slug}`}
                    className="w-full sm:w-auto bg-brand-600 text-white px-8 py-3 text-body font-medium hover:bg-brand-500 transition-colors flex items-center justify-center gap-2 shadow-lg shadow-brand-900/20"
                  >
                    Continue Learning
                  </Link>
                ) : (
                  <EnrollButton
                    courseSlug={course.slug}
                    isFree={course.isFree}
                    isLoggedIn={!!session}
                  />
                )}
              </div>
            </div>

            {/* <!-- Right Side Stats (Desktop) --> */}
            <div className="hidden lg:block w-72 border-l border-neutral-800 pl-8">
              <div className="space-y-6">
                <div>
                  <p className="text-caption text-neutral-500 mb-1">
                    INSTRUCTOR
                  </p>
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 bg-neutral-800 flex items-center justify-center font-bold text-neutral-400">
                      {course.instructor.user.name
                        ?.split(" ")
                        .map((n) => n[0])
                        .join("") || "?"}
                    </div>
                    <div>
                      <p className="text-body font-medium">
                        {course.instructor.user.name || "Instructor"}
                      </p>
                      <p className="text-caption text-neutral-500">
                        {course.instructor.title}
                      </p>
                    </div>
                  </div>
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <p className="text-caption text-neutral-500 mb-1">LEVEL</p>
                    <p className="text-body">
                      {formatCourseDifficulty(course.difficulty)}
                    </p>
                  </div>
                  <div>
                    <p className="text-caption text-neutral-500 mb-1">
                      DURATION
                    </p>
                    <p className="text-body">
                      {calculateFormattedCourseDuration(course.modules)}
                    </p>
                  </div>
                  <div>
                    <p className="text-caption text-neutral-500 mb-1">
                      MODULES
                    </p>
                    <p className="text-body">{course.modules.length}</p>
                  </div>
                  <div>
                    <p className="text-caption text-neutral-500 mb-1">
                      CERTIFICATE
                    </p>
                    <p className="text-body text-brand-400">Included</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* <!-- Curriculum Content --> */}
      <div className="flex-1 bg-dash-grid">
        <div className="max-w-7xl mx-auto px-6 py-12">
          <div className="flex flex-col lg:flex-row gap-8">
            {/* <!-- Main Curriculum Column --> */}
            <div className="flex-1">
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-heading-2 text-neutral-900">
                  Course Curriculum
                </h2>
                <span className="text-caption text-neutral-500">
                  {course.modules.reduce(
                    (acc, m) => acc + m.lessons.length,
                    0
                  )}{" "}
                  Lessons
                </span>
              </div>

              {/* Module List */}
              <div className="space-y-4">
                {course.modules.map((module, idx) => (
                  <div
                    key={module.id}
                    className="bg-neutral-0 border border-neutral-200"
                  >
                    <div className="p-6 border-b border-neutral-200">
                      <div className="flex items-start justify-between">
                        <div className="flex-1">
                          <div className="flex items-center gap-3 mb-2">
                            <span className="text-caption text-neutral-500 font-bold">
                              MODULE {module.no}
                            </span>
                          </div>
                          <h3 className="text-heading-3 text-neutral-900 mb-2">
                            {module.title}
                          </h3>
                          {module.description && (
                            <p className="text-caption text-neutral-600">
                              {module.description}
                            </p>
                          )}
                        </div>
                        <div className="text-right">
                          <p className="text-caption text-neutral-500">
                            {module.lessons.length} Lessons
                          </p>
                          <p className="text-caption text-neutral-500">
                            {formatToHoursMinutes(
                              calculateModuleDurationInSeconds(module.lessons)
                            )}
                          </p>
                        </div>
                      </div>
                    </div>

                    {/* Lessons */}
                    <div className="divide-y divide-neutral-100">
                      {module.lessons.map((lesson) => (
                        <div
                          key={lesson.id}
                          className="p-4 hover:bg-neutral-50 transition-colors flex items-center gap-4"
                        >
                          {isEnrolled ? (
                            <CheckCircle2 className="w-4 h-4 text-neutral-300 shrink-0" />
                          ) : (
                            <Lock className="w-4 h-4 text-neutral-300 shrink-0" />
                          )}
                          <div className="flex-1">
                            <h4 className="text-body text-neutral-900 mb-1">
                              {lesson.title}
                            </h4>
                            {lesson.description && (
                              <p className="text-caption text-neutral-500">
                                {lesson.description}
                              </p>
                            )}
                          </div>
                          <span className="text-caption text-neutral-500 shrink-0">
                            {formatToHoursMinutes(lesson.duration)}
                          </span>
                        </div>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* <!-- Right Sidebar (Sticky) --> */}
            <div className="w-full lg:w-80 shrink-0">
              <div className="sticky top-24 space-y-6">
                {/* <!-- What You'll Learn Box --> */}
                {!course.isFree && (
                  <div className="bg-neutral-0 border border-neutral-200 p-6">
                    <h3 className="text-heading-3 text-neutral-900 mb-4">
                      Pro Course Benefits
                    </h3>
                    <ul className="space-y-3">
                      <li className="flex items-start gap-3">
                        <CheckCircle2 className="w-4 h-4 text-brand-600 mt-0.5 shrink-0" />
                        <span className="text-body text-neutral-700">
                          Full access to all lessons
                        </span>
                      </li>
                      <li className="flex items-start gap-3">
                        <CheckCircle2 className="w-4 h-4 text-brand-600 mt-0.5 shrink-0" />
                        <span className="text-body text-neutral-700">
                          Download course resources
                        </span>
                      </li>
                      <li className="flex items-start gap-3">
                        <CheckCircle2 className="w-4 h-4 text-brand-600 mt-0.5 shrink-0" />
                        <span className="text-body text-neutral-700">
                          Completion certificate
                        </span>
                      </li>
                      <li className="flex items-start gap-3">
                        <CheckCircle2 className="w-4 h-4 text-brand-600 mt-0.5 shrink-0" />
                        <span className="text-body text-neutral-700">
                          Priority instructor support
                        </span>
                      </li>
                    </ul>
                  </div>
                )}

                {/* <!-- Instructor Note --> */}
                <div className="bg-brand-50 border border-brand-100 p-6 relative overflow-hidden">
                  <div className="absolute -right-4 -top-4 text-brand-100 opacity-50">
                    <MessageSquare className="w-24 h-24" />
                  </div>
                  <h3 className="text-heading-3 text-brand-800 mb-2 relative z-10">
                    About This Course
                  </h3>
                  <p className="text-caption text-brand-700 relative z-10 leading-relaxed">
                    This course is designed to provide comprehensive knowledge
                    and practical skills. Perfect for developers looking to
                    advance their expertise.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}
