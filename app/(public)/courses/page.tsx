import { Search, Filter, ChevronLeft, ChevronRight } from "lucide-react";
import { db } from "@/lib/prisma";
import Link from "next/link";
import { getAllCourses } from "@/actions";

const ITEMS_PER_PAGE = 2;

type PageProps = {
  searchParams: Promise<{ page?: string }>;
};

// Helper function to get difficulty dots
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

// Helper function to format duration from minutes
function formatDuration(totalMinutes: number) {
  const hours = Math.floor(totalMinutes / 60);
  const minutes = totalMinutes % 60;
  return `${hours}h ${minutes}m`;
}

// Helper function to map category name to badge text
function getCategoryBadge(categories: { name: string }[]) {
  if (categories.length === 0) return "General";
  return categories[0].name;
}

export default async function CoursesPage({ searchParams }: PageProps) {
  const resolvedSearchParams = await searchParams;
  const currentPage = Number(resolvedSearchParams.page) || 1;

  // Fetch total count of published courses
  const totalCourses = await db.course.count({
    where: {
      isPublished: true,
    },
  });

  const totalPages = Math.ceil(totalCourses / ITEMS_PER_PAGE);

  // Fetch courses with pagination
  const courses = await getAllCourses(currentPage, ITEMS_PER_PAGE);

  // Calculate total duration for each course (convert from seconds to minutes)
  const coursesWithDuration = courses.map((course) => {
    const totalDurationInSeconds = course.modules.reduce((acc, module) => {
      const moduleDuration = module.lessons.reduce(
        (sum, lesson) => sum + lesson.duration,
        0
      );
      return acc + moduleDuration;
    }, 0);

    // Convert seconds to minutes
    const totalDuration = Math.round(totalDurationInSeconds / 60);

    return {
      ...course,
      totalDuration,
    };
  });

  const startResult = (currentPage - 1) * ITEMS_PER_PAGE + 1;
  const endResult = Math.min(currentPage * ITEMS_PER_PAGE, totalCourses);

  return (
    <main className="grow">
      {/* <!-- Header & Search --> */}
      <section className="bg-neutral-50 border-b border-neutral-border py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl">
            <div className="flex items-center gap-2 text-brand-600 text-caption mb-2">
              <i data-lucide="library" className="w-4 h-4"></i>
              <span>ROOT / CATALOG</span>
            </div>
            <h1 className="text-heading-1 text-neutral-900 mb-6">
              Course Index
            </h1>

            {/* <!-- Search Bar --> */}
            <div className="flex flex-col md:flex-row gap-4">
              <div className="relative grow">
                <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-neutral-400" />
                <input
                  type="text"
                  placeholder="Search modules (e.g. 'Postgres', 'React')..."
                  className="w-full pl-12 pr-4 py-3 bg-neutral-0 border border-neutral-300 text-body focus:outline-none focus:border-brand-500 focus:ring-1 focus:ring-brand-500 placeholder-neutral-400 transition-colors"
                />
              </div>
              <button className="px-6 py-3 bg-neutral-900 text-neutral-0 text-body font-medium hover:bg-neutral-800 transition-colors flex items-center justify-center gap-2">
                <Filter className="size-4" />
                Filter
              </button>
            </div>

            {/* <!-- Tags --> */}
            <div className="flex flex-wrap gap-2 mt-6">
              <button className="bg-brand-600 text-neutral-0 px-3 py-1 text-caption font-medium">
                ALL_TRACKS
              </button>
              <button className="bg-neutral-0 border border-neutral-300 text-neutral-600 px-3 py-1 text-caption hover:border-neutral-900 hover:text-neutral-900 transition-colors">
                FRONTEND
              </button>
              <button className="bg-neutral-0 border border-neutral-300 text-neutral-600 px-3 py-1 text-caption hover:border-neutral-900 hover:text-neutral-900 transition-colors">
                BACKEND
              </button>
              <button className="bg-neutral-0 border border-neutral-300 text-neutral-600 px-3 py-1 text-caption hover:border-neutral-900 hover:text-neutral-900 transition-colors">
                DEVOPS
              </button>
              <button className="bg-neutral-0 border border-neutral-300 text-neutral-600 px-3 py-1 text-caption hover:border-neutral-900 hover:text-neutral-900 transition-colors">
                SYSTEMS
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* <!-- Course Grid --> */}
      <section className="py-12 bg-grid">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center mb-6">
            <p className="text-caption text-neutral-500">
              SHOWING {startResult}-{endResult} OF {totalCourses} RESULTS
            </p>
            <div className="flex items-center gap-2 text-caption text-neutral-600">
              <span>SORT BY:</span>
              <select className="bg-transparent border-none text-neutral-900 font-medium focus:ring-0 cursor-pointer">
                <option>NEWEST</option>
                <option>POPULAR</option>
                <option>DIFFICULTY</option>
              </select>
            </div>
          </div>

          {coursesWithDuration.length === 0 ? (
            <div className="text-center py-12">
              <p className="text-neutral-500 text-body">
                No courses available at the moment.
              </p>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {coursesWithDuration.map((course) => (
                <Link
                  key={course.id}
                  href={`/learning/${course.slug}`}
                  className="group bg-neutral-0 border border-neutral-200 hover:border-brand-500 transition-all hover:shadow-md h-full flex flex-col"
                >
                  <div className="h-40 bg-neutral-100 border-b border-neutral-200 flex items-center justify-center relative group-hover:bg-neutral-50 transition-colors">
                    <i
                      data-lucide="layers"
                      className="w-10 h-10 text-neutral-400 group-hover:text-brand-500 transition-colors"
                    ></i>
                    {course.isFree ? (
                      <span className="absolute top-3 right-3 bg-brand-100 text-brand-800 text-[10px] px-2 py-0.5 font-medium border border-brand-200">
                        FREE
                      </span>
                    ) : (
                      <span className="absolute top-3 right-3 bg-neutral-900 text-neutral-0 text-[10px] px-2 py-0.5 font-medium">
                        PRO
                      </span>
                    )}
                  </div>
                  <div className="p-5 grow flex flex-col">
                    <div className="flex justify-between items-start mb-3">
                      <span className="text-[10px] uppercase tracking-wider text-brand-600 font-semibold border border-brand-100 bg-brand-50 px-1.5 py-0.5">
                        {getCategoryBadge(course.categories)}
                      </span>
                      {getDifficultyDots(course.difficulty)}
                    </div>
                    <h3 className="text-heading-3 text-neutral-900 mb-2 group-hover:text-brand-600 transition-colors">
                      {course.title}
                    </h3>
                    <p className="text-caption text-neutral-500 mb-6 grow line-clamp-3">
                      {course.description}
                    </p>
                    <div className="flex items-center justify-between pt-4 border-t border-neutral-100 text-caption text-neutral-600">
                      <span className="flex items-center gap-1.5">
                        <i data-lucide="clock" className="w-3 h-3"></i>{" "}
                        {formatDuration(course.totalDuration)}
                      </span>
                      <span>{course._count.modules} Modules</span>
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          )}

          {/* <!-- Pagination --> */}
          {totalPages > 1 && (
            <div className="mt-12 flex justify-center">
              <div className="inline-flex border border-neutral-200 bg-neutral-0">
                {/* Previous Button */}
                <Link
                  href={`/courses?page=${currentPage - 1}`}
                  className={`w-10 h-10 flex items-center justify-center text-neutral-400 border-r border-neutral-200 hover:bg-neutral-50 hover:text-neutral-900 ${
                    currentPage === 1
                      ? "opacity-50 pointer-events-none"
                      : ""
                  }`}
                  aria-disabled={currentPage === 1}
                >
                  <ChevronLeft className="w-4 h-4" />
                </Link>

                {/* Page Numbers */}
                {Array.from({ length: totalPages }, (_, i) => i + 1).map(
                  (page) => (
                    <Link
                      key={page}
                      href={`/courses?page=${page}`}
                      className={`w-10 h-10 flex items-center justify-center text-body font-medium border-l border-neutral-200 ${
                        currentPage === page
                          ? "text-neutral-0 bg-neutral-900"
                          : "text-neutral-600 hover:bg-neutral-50 hover:text-neutral-900"
                      }`}
                    >
                      {page}
                    </Link>
                  )
                )}

                {/* Next Button */}
                <Link
                  href={`/courses?page=${currentPage + 1}`}
                  className={`w-10 h-10 flex items-center justify-center text-neutral-600 border-l border-neutral-200 hover:bg-neutral-50 hover:text-neutral-900 ${
                    currentPage === totalPages
                      ? "opacity-50 pointer-events-none"
                      : ""
                  }`}
                  aria-disabled={currentPage === totalPages}
                >
                  <ChevronRight className="w-4 h-4" />
                </Link>
              </div>
            </div>
          )}
        </div>
      </section>
    </main>
  );
}
