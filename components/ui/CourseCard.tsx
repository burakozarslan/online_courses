import { Layers } from "lucide-react";

interface CourseCardProps {
  isPro: boolean;
  title: string;
  description: string;
  modules: number;
  duration: string;
  categories: string[];
}

export default function CourseCard({
  isPro,
  title,
  description,
  modules,
  duration,
  categories,
}: CourseCardProps) {
  return (
    <div className="group border border-neutral-200 bg-neutral-0 hover:border-brand-500 transition-colors cursor-pointer flex flex-col h-full">
      <div className="h-48 bg-neutral-100 border-b border-neutral-200 relative group-hover:bg-neutral-50 transition-colors flex items-center justify-center">
        <Layers />
        {isPro && (
          <div className="absolute top-4 right-4 bg-neutral-900 text-neutral-0 text-caption px-2 py-1">
            PRO
          </div>
        )}
      </div>
      <div className="p-6 flex-1 flex flex-col">
        {categories.map((category, index) => (
          <div key={index} className="text-caption text-brand-600 mb-2">
            {category}
          </div>
        ))}
        <h3 className="text-heading-3 mb-2 group-hover:text-brand-600 transition-colors">
          {title}
        </h3>
        <p className="text-body text-neutral-500 mb-6 flex-1">{description}</p>
        <div className="flex items-center justify-between pt-4 border-t border-neutral-100">
          <span className="text-caption text-neutral-400">
            {modules} Modules
          </span>
          <span className="text-caption text-neutral-900 font-medium">
            {duration}
          </span>
        </div>
      </div>
    </div>
  );
}
