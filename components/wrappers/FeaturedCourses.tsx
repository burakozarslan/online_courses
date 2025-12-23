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
          <div className="group border border-neutral-200 bg-neutral-0 hover:border-brand-500 transition-colors cursor-pointer flex flex-col h-full">
            <div className="h-48 bg-neutral-100 border-b border-neutral-200 relative group-hover:bg-neutral-50 transition-colors flex items-center justify-center">
              <i
                data-lucide="layers"
                className="w-12 h-12 text-neutral-400 group-hover:text-brand-500 transition-colors"
              ></i>
              <div className="absolute top-4 right-4 bg-neutral-900 text-neutral-0 text-caption px-2 py-1">
                PRO
              </div>
            </div>
            <div className="p-6 flex-1 flex flex-col">
              <div className="text-caption text-brand-600 mb-2">FULLSTACK</div>
              <h3 className="text-heading-3 mb-2 group-hover:text-brand-600 transition-colors">
                Next.js & Shopify Integration
              </h3>
              <p className="text-body text-neutral-500 mb-6 flex-1">
                Build a complete e-commerce solution using Next.js App Router,
                Prisma, and Shopify Webhooks.
              </p>
              <div className="flex items-center justify-between pt-4 border-t border-neutral-100">
                <span className="text-caption text-neutral-400">
                  12 Modules
                </span>
                <span className="text-caption text-neutral-900 font-medium">
                  6h 30m
                </span>
              </div>
            </div>
          </div>

          {/* <!-- Course Card 2 --> */}
          <div className="group border border-neutral-200 bg-neutral-0 hover:border-brand-500 transition-colors cursor-pointer flex flex-col h-full">
            <div className="h-48 bg-neutral-100 border-b border-neutral-200 relative group-hover:bg-neutral-50 transition-colors flex items-center justify-center">
              <i
                data-lucide="database"
                className="w-12 h-12 text-neutral-400 group-hover:text-brand-500 transition-colors"
              ></i>
              <div className="absolute top-4 right-4 bg-brand-100 text-brand-800 text-caption px-2 py-1">
                NEW
              </div>
            </div>
            <div className="p-6 flex-1 flex flex-col">
              <div className="text-caption text-brand-600 mb-2">BACKEND</div>
              <h3 className="text-heading-3 mb-2 group-hover:text-brand-600 transition-colors">
                Serverless Postgres with Neon
              </h3>
              <p className="text-body text-neutral-500 mb-6 flex-1">
                Master database branching, connection pooling, and Prisma
                migrations in a serverless environment.
              </p>
              <div className="flex items-center justify-between pt-4 border-t border-neutral-100">
                <span className="text-caption text-neutral-400">8 Modules</span>
                <span className="text-caption text-neutral-900 font-medium">
                  4h 15m
                </span>
              </div>
            </div>
          </div>

          {/* <!-- Course Card 3 --> */}
          <div className="group border border-neutral-200 bg-neutral-0 hover:border-brand-500 transition-colors cursor-pointer flex flex-col h-full">
            <div className="h-48 bg-neutral-100 border-b border-neutral-200 relative group-hover:bg-neutral-50 transition-colors flex items-center justify-center">
              <i
                data-lucide="shield-check"
                className="w-12 h-12 text-neutral-400 group-hover:text-brand-500 transition-colors"
              ></i>
            </div>
            <div className="p-6 flex-1 flex flex-col">
              <div className="text-caption text-brand-600 mb-2">SECURITY</div>
              <h3 className="text-heading-3 mb-2 group-hover:text-brand-600 transition-colors">
                Advanced Auth Patterns
              </h3>
              <p className="text-body text-neutral-500 mb-6 flex-1">
                Implement RBAC, MFA, and secure session management using
                standard libraries and custom middleware.
              </p>
              <div className="flex items-center justify-between pt-4 border-t border-neutral-100">
                <span className="text-caption text-neutral-400">
                  15 Modules
                </span>
                <span className="text-caption text-neutral-900 font-medium">
                  8h 00m
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
