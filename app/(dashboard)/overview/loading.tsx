import Skeleton from "@/components/ui/Skeleton";

export default function DashboardLoading() {
  return (
    <div className="p-6 lg:p-10 space-y-8 bg-dash-grid">
      {/* <!-- Welcome Section Skeleton --> */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
        <div>
          <Skeleton className="h-10 w-48 mb-2" />
          <Skeleton className="h-4 w-64" />
        </div>
        <Skeleton className="h-10 w-32 hidden md:block" />
      </div>

      {/* <!-- Stats Grid Skeleton --> */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        {[1, 2, 3, 4].map((i) => (
          <div key={i} className="bg-neutral-0 border border-neutral-200 p-5">
            <Skeleton className="h-3 w-20 mb-3" />
            <Skeleton className="h-8 w-12" />
          </div>
        ))}
      </div>

      {/* <!-- Continue Learning Skeleton --> */}
      <section>
        <Skeleton className="h-8 w-48 mb-4" />
        <div className="bg-neutral-900 border border-neutral-800 p-8 flex flex-col md:flex-row gap-8">
          <div className="flex-1 space-y-4">
            <div className="flex gap-2">
              <Skeleton className="h-5 w-16 bg-neutral-800" />
              <Skeleton className="h-5 w-32 bg-neutral-800" />
            </div>
            <Skeleton className="h-10 w-3/4 bg-neutral-800" />
            <Skeleton className="h-4 w-full bg-neutral-800" />
            <div className="pt-4">
              <Skeleton className="h-12 w-48 bg-neutral-800" />
            </div>
          </div>
        </div>
      </section>

      {/* <!-- Enrolled Courses Skeleton --> */}
      <section>
        <div className="flex items-center justify-between mb-4">
          <Skeleton className="h-8 w-48" />
          <Skeleton className="h-4 w-32" />
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {[1, 2, 3].map((i) => (
            <div key={i} className="bg-neutral-0 border border-neutral-200 p-6 space-y-4">
              <div className="flex justify-between">
                <Skeleton className="w-8 h-8" />
                <Skeleton className="w-16 h-5" />
              </div>
              <Skeleton className="h-6 w-3/4" />
              <Skeleton className="h-4 w-1/2" />
              <div className="space-y-2 pt-4">
                <Skeleton className="h-1 w-full" />
                <div className="flex justify-between">
                  <Skeleton className="h-3 w-16" />
                  <Skeleton className="h-3 w-8" />
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}
