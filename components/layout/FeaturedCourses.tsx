import CourseCard from "../ui/CourseCard";

export default function FeaturedCourses() {
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
          {/* <!-- Course Card 1 --> */}
          <CourseCard
            isPro
            title="Next.js & Shopify Integration"
            description="Build a complete e-commerce solution using Next.js App Router,
                Prisma, and Shopify Webhooks."
            modules={12}
            duration="6h 30m"
            category="Fullstack"
            difficulty={1}
          />

          {/* <!-- Course Card 2 --> */}
          <CourseCard
            title="Serverless Postgres with Neon"
            description="Master database branching, connection pooling, and Prisma
                migrations in a serverless environment."
            modules={8}
            duration="4h 15m"
            category="Backend"
            difficulty={2}
          />

          {/* <!-- Course Card 3 --> */}
          <CourseCard
            title="Advanced Auth Patterns"
            description="Implement RBAC, MFA, and secure session management using
                standard libraries and custom middleware."
            modules={15}
            duration="8h 00m"
            category="Security"
            difficulty={3}
          />
        </div>
      </div>
    </section>
  );
}
