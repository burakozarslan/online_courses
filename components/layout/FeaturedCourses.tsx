import CourseCard from "../ui/CourseCard";
import { getAllCourses } from "@/actions/getAllCourses";
import { calculateFormattedCourseDuration } from "@/lib/courseUtils";

export default async function FeaturedCourses() {
  // Fetch 3 latest courses
  const courses = await getAllCourses(1, 3);

  return (
    <section className="py-24 bg-neutral-0">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-end mb-12">
          <div>
            <h2 className="text-heading-1 text-neutral-900 mb-4">
              Latest Curriculums
            </h2>
            <p className="text-body text-neutral-500">
              Structured learning paths designed for engineering excellence.
            </p>
          </div>
          <a
            href="/courses"
            className="hidden md:flex items-center gap-2 text-body text-brand-600 hover:text-brand-700 font-medium"
          >
            View All Tracks{" "}
            <i data-lucide="arrow-right" className="w-4 h-4"></i>
          </a>
        </div>

        <div className="grid md:grid-cols-3 gap-8">
          {courses.map((course) => (
            <CourseCard
              key={course.id}
              isPro={(course as any).isPro}
              title={course.title}
              description={course.description || ""}
              modules={course._count.modules}
              duration={calculateFormattedCourseDuration(course.modules)}
              category={course.categories[0]?.name || "General"}
              difficulty={(course.difficulty || 1) as unknown as 1 | 2 | 3}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
