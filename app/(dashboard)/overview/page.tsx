import Link from "next/link";
import { PlayCircle, Menu, Flame } from "lucide-react";
import { getAllEnrollments } from "@/actions/getAllEnrollments";

export default async function DashboardPage() {
  const enrollments = await getAllEnrollments();
  const lastVisited = enrollments[0]; // Most recently updated enrollment

  // Calculate which module/lesson number the user is on
  let moduleNumber = 1;
  let lessonNumber = 1;
  let moduleTitle = "";

  if (lastVisited?.currentLesson) {
    // Find the module and lesson position
    lastVisited.course.modules.forEach((module, mIdx) => {
      module.lessons.forEach((lesson, lIdx) => {
        if (lesson.id === lastVisited.currentLessonId) {
          moduleNumber = mIdx + 1;
          lessonNumber = lIdx + 1;
          moduleTitle = module.title;
        }
      });
    });
  } else if (lastVisited) {
    // If no current lesson set, default to first module/lesson
    moduleTitle = lastVisited.course.modules[0]?.title || "";
  }

  // Calculate stats
  const inProgressCount = enrollments.filter(
    (e) => e.progressPercentage > 0 && e.progressPercentage < 100
  ).length;
  const completedCount = enrollments.filter(
    (e) => e.progressPercentage === 100
  ).length;
  const totalHours = Math.round(
    enrollments.reduce((acc, e) => acc + (e.totalDuration || 0), 0) / 60
  );

  return (
    <>
      {/* <!-- Main Content --> */}
      <main>
        {/* <!-- Mobile Header --> */}
        <header className="h-16 bg-neutral-0 border-b border-neutral-200 flex items-center justify-between px-4 md:hidden sticky top-0 z-10">
          <span className="text-heading-3 text-neutral-900">DASHBOARD</span>
          <button className="text-neutral-500">
            <Menu className="size-6" />
          </button>
        </header>

        {/* <!-- Page Content --> */}
        <div className="p-6 lg:p-10 space-y-8 bg-dash-grid">
          {/* <!-- Welcome Section --> */}
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
            <div>
              <h1 className="text-heading-1 text-neutral-900 mb-1">Overview</h1>
              <p className="text-body text-neutral-500">
                Track your progress and pick up where you left off.
              </p>
            </div>
            <div className="text-right hidden md:block">
              <p className="text-caption text-neutral-400">CURRENT STREAK</p>
              <div className="flex items-center justify-end gap-2 text-brand-600">
                <Flame className="w-5 h-5 fill-current" />
                <span className="text-heading-2">12 Days</span>
              </div>
            </div>
          </div>

          {/* <!-- Stats Grid --> */}
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            <div className="bg-neutral-0 border border-neutral-200 p-5">
              <p className="text-caption text-neutral-500 mb-2">IN PROGRESS</p>
              <p className="text-heading-1 text-neutral-900">{inProgressCount}</p>
            </div>
            <div className="bg-neutral-0 border border-neutral-200 p-5">
              <p className="text-caption text-neutral-500 mb-2">COMPLETED</p>
              <p className="text-heading-1 text-neutral-900">{completedCount}</p>
            </div>
            <div className="bg-neutral-0 border border-neutral-200 p-5">
              <p className="text-caption text-neutral-500 mb-2">TOTAL HOURS</p>
              <p className="text-heading-1 text-neutral-900">{totalHours}h</p>
            </div>
            <div className="bg-neutral-0 border border-neutral-200 p-5 relative overflow-hidden">
              <div className="absolute right-0 top-0 p-2 opacity-10">
                <i data-lucide="award" className="w-16 h-16 text-brand-600"></i>
              </div>
              <p className="text-caption text-neutral-500 mb-2">CERTIFICATES</p>
              <p className="text-heading-1 text-brand-600">{completedCount}</p>
            </div>
          </div>

          {/* <!-- Continue Learning (Hero Card) --> */}
          <section>
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-heading-2 text-neutral-900">
                Continue Learning
              </h2>
            </div>

            {lastVisited ? (
              <div className="bg-neutral-900 text-neutral-0 border border-neutral-800 p-0 flex flex-col md:flex-row overflow-hidden group">
                {/* <!-- Left: Content Info --> */}
                <div className="p-6 md:p-8 flex-1 flex flex-col justify-between">
                  <div>
                    <div className="flex items-center gap-2 mb-3">
                      <span className="bg-brand-600 text-white text-[10px] px-2 py-0.5 font-bold tracking-wider">
                        RESUME
                      </span>
                      <span className="text-caption text-neutral-400">
                        MODULE {moduleNumber} / LESSON {lessonNumber}
                      </span>
                    </div>
                    <h3 className="text-heading-1 mb-2">
                      {lastVisited.course.title}
                    </h3>
                    <p className="text-body text-neutral-400 mb-6 max-w-xl">
                      {lastVisited.currentLesson?.title
                        ? `Continue with: ${lastVisited.currentLesson.title}`
                        : lastVisited.course.description}
                    </p>
                  </div>

                  <div>
                    <div className="flex justify-between text-caption text-neutral-400 mb-2">
                      <span>COURSE PROGRESS</span>
                      <span>{lastVisited.progressPercentage}%</span>
                    </div>
                    {/* <!-- Progress Bar --> */}
                    <div className="w-full bg-neutral-800 h-2 mb-6">
                      <div
                        className="bg-brand-500 h-2 relative"
                        style={{ width: `${lastVisited.progressPercentage}%` }}
                      >
                        <div className="absolute right-0 top-0 bottom-0 w-1 bg-white opacity-50"></div>
                      </div>
                    </div>

                    <Link
                      href={`/learning/${lastVisited.course.slug}`}
                      className="w-48 bg-brand-600 text-white px-6 py-3 text-body font-medium hover:bg-brand-500 transition-colors flex items-center gap-2"
                    >
                      <PlayCircle className="size-4" />
                      Continue Lesson
                    </Link>
                  </div>
                </div>
              </div>
            ) : (
              <div className="bg-neutral-50 border border-neutral-200 p-8 text-center">
                <p className="text-body text-neutral-500 mb-4">
                  No courses in progress yet.
                </p>
                <Link
                  href="/courses"
                  className="inline-flex items-center gap-2 bg-brand-600 text-white px-6 py-3 text-body font-medium hover:bg-brand-500 transition-colors"
                >
                  Browse Courses
                </Link>
              </div>
            )}
          </section>
          <section>
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-heading-2 text-neutral-900">
                Enrolled Courses
              </h2>
              <Link
                href="/courses"
                className="text-caption text-neutral-500 hover:text-neutral-900"
              >
                {"BROWSE CATALOG ->"}
              </Link>
            </div>

            {enrollments.length === 0 ? (
              <div className="bg-neutral-50 border border-neutral-200 p-8 text-center">
                <p className="text-body text-neutral-500 mb-4">
                  You haven&apos;t enrolled in any courses yet.
                </p>
                <Link
                  href="/courses"
                  className="inline-flex items-center gap-2 bg-brand-600 text-white px-6 py-3 text-body font-medium hover:bg-brand-500 transition-colors"
                >
                  Browse Courses
                </Link>
              </div>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {enrollments.slice(0, 6).map((enrollment) => {
                  const isCompleted = enrollment.progressPercentage === 100;
                  
                  // Estimate completed modules based on progress percentage
                  const totalModules = enrollment.course._count.modules;
                  const estimatedCompletedModules = Math.floor(
                    (enrollment.progressPercentage / 100) * totalModules
                  );

                  // Calculate relative time since last update
                  const daysSinceUpdate = Math.floor(
                    (Date.now() - new Date(enrollment.updatedAt).getTime()) /
                      (1000 * 60 * 60 * 24)
                  );
                  const lastActive =
                    daysSinceUpdate === 0
                      ? "Today"
                      : daysSinceUpdate === 1
                        ? "Yesterday"
                        : `${daysSinceUpdate} days ago`;

                  return (
                    <div
                      key={enrollment.id}
                      className={`bg-neutral-0 border border-neutral-200 flex flex-col ${
                        isCompleted
                          ? "opacity-75 hover:opacity-100 transition-opacity"
                          : ""
                      }`}
                    >
                      <div className="p-6 flex-1">
                        <div className="flex justify-between items-start mb-4">
                          <i
                            data-lucide="book-open"
                            className={`w-8 h-8 ${
                              isCompleted ? "text-brand-600" : "text-neutral-700"
                            }`}
                          ></i>
                          {isCompleted && (
                            <div className="bg-brand-50 text-brand-700 text-[10px] px-2 py-0.5 border border-brand-200">
                              COMPLETED
                            </div>
                          )}
                        </div>
                        <h3 className="text-heading-3 text-neutral-900 mb-1">
                          {enrollment.course.title}
                        </h3>
                        <p className="text-caption text-neutral-500 mb-4">
                          {isCompleted
                            ? `Finished: ${new Date(enrollment.updatedAt).toLocaleDateString("en-US", { month: "short", day: "numeric", year: "numeric" })}`
                            : `Last active: ${lastActive}`}
                        </p>

                        <div className="space-y-2">
                          <div
                            className={`w-full h-1 ${
                              isCompleted ? "bg-brand-100" : "bg-neutral-100"
                            }`}
                          >
                            <div
                              className={`h-1 ${
                                isCompleted ? "bg-brand-500" : "bg-neutral-900"
                              }`}
                              style={{
                                width: `${enrollment.progressPercentage}%`,
                              }}
                            ></div>
                          </div>
                          <div
                            className={`flex justify-between text-[10px] uppercase tracking-wide ${
                              isCompleted
                                ? "text-brand-600"
                                : "text-neutral-400"
                            }`}
                          >
                            <span>
                              {estimatedCompletedModules}/{totalModules} Modules
                            </span>
                            <span>{enrollment.progressPercentage}%</span>
                          </div>
                        </div>
                      </div>
                      <Link
                        href={`/learning/${enrollment.course.slug}`}
                        className="px-6 py-3 border-t border-neutral-100 bg-neutral-50 text-caption text-neutral-600 font-medium hover:bg-neutral-100 transition-colors flex items-center justify-between"
                      >
                        {isCompleted ? "View Certificate" : "Resume Course"}
                        <i
                          data-lucide={
                            isCompleted ? "download" : "arrow-right"
                          }
                          className="w-3 h-3"
                        ></i>
                      </Link>
                    </div>
                  );
                })}
              </div>
            )}
          </section>
        </div>
      </main>
    </>
  );
}
