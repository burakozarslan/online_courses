import CourseCardSkeleton from "@/components/ui/CourseCardSkeleton";
import { Search, Filter } from "lucide-react";

export default function CoursesLoading() {
  return (
    <main className="grow">
      {/* <!-- Header & Search Skeleton --> */}
      <section className="bg-neutral-50 border-b border-neutral-border py-6">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl">
            <div className="flex items-center gap-2 text-neutral-300 text-caption mb-2">
              <div className="w-4 h-4 bg-neutral-200 rounded animate-pulse" />
              <div className="w-24 h-3 bg-neutral-200 rounded animate-pulse" />
            </div>
            <div className="w-48 h-10 bg-neutral-200 rounded animate-pulse mb-4" />

            {/* <!-- Search Bar Skeleton --> */}
            <div className="flex flex-col md:flex-row gap-4">
              <div className="grow h-12 bg-neutral-200 rounded animate-pulse" />
              <div className="w-32 h-12 bg-neutral-200 rounded animate-pulse" />
            </div>

            {/* <!-- Tags Skeleton --> */}
            <div className="flex flex-wrap gap-2 mt-4">
              {[1, 2, 3, 4, 5].map((i) => (
                <div key={i} className="w-20 h-8 bg-neutral-200 rounded animate-pulse" />
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* <!-- Course Grid Skeleton --> */}
      <section className="py-8 bg-grid">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center mb-6">
            <div className="w-40 h-4 bg-neutral-200 rounded animate-pulse" />
            <div className="w-32 h-4 bg-neutral-200 rounded animate-pulse" />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {[1, 2, 3, 4, 5, 6].map((i) => (
              <CourseCardSkeleton key={i} />
            ))}
          </div>
        </div>
      </section>
    </main>
  );
}
