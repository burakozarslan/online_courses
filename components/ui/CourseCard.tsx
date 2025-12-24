import { Layers } from "lucide-react";

interface CourseCardProps {
  isPro?: boolean;
  title: string;
  description: string;
  modules: number;
  duration: string;
  categories: string[];
  difficulty: 1 | 2 | 3;
}

export default function CourseCard({
  isPro = false,
  title,
  description,
  modules,
  duration,
  categories,
  difficulty,
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
        <div className="flex justify-between items-start mb-3">
          {categories.map((category, index) => (
            <span
              key={index}
              className="text-[10px] uppercase tracking-wider text-brand-600 font-semibold border border-brand-100 bg-brand-50 px-1.5 py-0.5"
            >
              {category}
            </span>
          ))}
          <div className="flex gap-0.5">
            {Array.from({ length: 3 }).map((_, index) => (
              <div
                key={index}
                className={`w-1.5 h-1.5 ${
                  index < difficulty ? "bg-neutral-800" : "bg-neutral-300"
                }`}
              ></div>
            ))}
          </div>
        </div>
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
