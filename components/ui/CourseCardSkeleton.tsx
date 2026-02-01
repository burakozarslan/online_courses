import Skeleton from "./Skeleton";

export default function CourseCardSkeleton() {
  return (
    <div className="border border-neutral-200 bg-neutral-0 flex flex-col h-full">
      {/* Thumbnail area */}
      <Skeleton className="h-48 border-b border-neutral-200" />
      
      <div className="p-6 flex-1 flex flex-col gap-4">
        <div className="flex justify-between items-center">
          {/* Category tag */}
          <Skeleton className="h-4 w-20" />
          {/* Difficulty dots */}
          <div className="flex gap-1">
            <Skeleton className="w-2 h-2 rounded-full" />
            <Skeleton className="w-2 h-2 rounded-full" />
            <Skeleton className="w-2 h-2 rounded-full" />
          </div>
        </div>

        {/* Title */}
        <div className="space-y-2">
          <Skeleton className="h-6 w-3/4" />
          <Skeleton className="h-6 w-1/2" />
        </div>

        {/* Description */}
        <div className="space-y-2 flex-1">
          <Skeleton className="h-4 w-full" />
          <Skeleton className="h-4 w-full" />
          <Skeleton className="h-4 w-2/3" />
        </div>

        {/* Footer */}
        <div className="flex items-center justify-between pt-4 border-t border-neutral-100">
          <Skeleton className="h-4 w-16" />
          <Skeleton className="h-4 w-12" />
        </div>
      </div>
    </div>
  );
}
