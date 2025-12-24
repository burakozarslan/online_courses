import { Search, Filter } from "lucide-react";

export default function CoursesPage() {
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
              SHOWING 1-6 OF 24 RESULTS
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

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {/* <!-- Card 1 --> */}
            <a
              href="/courses/nextjs-fullstack"
              className="group  bg-neutral-0 border border-neutral-200 hover:border-brand-500 transition-all hover:shadow-md h-full flex flex-col"
            >
              <div className="h-40 bg-neutral-100 border-b border-neutral-200 flex items-center justify-center relative group-hover:bg-neutral-50 transition-colors">
                <i
                  data-lucide="layers"
                  className="w-10 h-10 text-neutral-400 group-hover:text-brand-500 transition-colors"
                ></i>
                <span className="absolute top-3 right-3 bg-brand-100 text-brand-800 text-[10px] px-2 py-0.5 font-medium border border-brand-200">
                  NEW
                </span>
              </div>
              <div className="p-5 grow flex flex-col">
                <div className="flex justify-between items-start mb-3">
                  <span className="text-[10px] uppercase tracking-wider text-brand-600 font-semibold border border-brand-100 bg-brand-50 px-1.5 py-0.5">
                    Fullstack
                  </span>
                  <div className="flex gap-0.5">
                    <div className="w-1.5 h-1.5 bg-neutral-800"></div>
                    <div className="w-1.5 h-1.5 bg-neutral-800"></div>
                    <div className="w-1.5 h-1.5 bg-neutral-300"></div>
                  </div>
                </div>
                <h3 className="text-heading-3 text-neutral-900 mb-2 group-hover:text-brand-600 transition-colors">
                  Next.js & Shopify Integration
                </h3>
                <p className="text-caption text-neutral-500 mb-6 grow line-clamp-3">
                  Build a headless e-commerce platform. Covers App Router,
                  Server Actions, and Webhooks.
                </p>
                <div className="flex items-center justify-between pt-4 border-t border-neutral-100 text-caption text-neutral-600">
                  <span className="flex items-center gap-1.5">
                    <i data-lucide="clock" className="w-3 h-3"></i> 6h 30m
                  </span>
                  <span>12 Modules</span>
                </div>
              </div>
            </a>

            {/* <!-- Card 2 --> */}
            <a
              href="/courses/advanced-postgres"
              className="group  bg-neutral-0 border border-neutral-200 hover:border-brand-500 transition-all hover:shadow-md h-full flex flex-col"
            >
              <div className="h-40 bg-neutral-100 border-b border-neutral-200 flex items-center justify-center group-hover:bg-neutral-50 transition-colors">
                <i
                  data-lucide="database"
                  className="w-10 h-10 text-neutral-400 group-hover:text-brand-500 transition-colors"
                ></i>
              </div>
              <div className="p-5 grow flex flex-col">
                <div className="flex justify-between items-start mb-3">
                  <span className="text-[10px] uppercase tracking-wider text-brand-600 font-semibold border border-brand-100 bg-brand-50 px-1.5 py-0.5">
                    Backend
                  </span>
                  <div className="flex gap-0.5">
                    <div className="w-1.5 h-1.5 bg-neutral-800"></div>
                    <div className="w-1.5 h-1.5 bg-neutral-800"></div>
                    <div className="w-1.5 h-1.5 bg-neutral-800"></div>
                  </div>
                </div>
                <h3 className="text-heading-3 text-neutral-900 mb-2 group-hover:text-brand-600 transition-colors">
                  Serverless Postgres with Neon
                </h3>
                <p className="text-caption text-neutral-500 mb-6 grow line-clamp-3">
                  Deep dive into connection pooling, branching, and optimizing
                  queries for serverless environments.
                </p>
                <div className="flex items-center justify-between pt-4 border-t border-neutral-100 text-caption text-neutral-600">
                  <span className="flex items-center gap-1.5">
                    <i data-lucide="clock" className="w-3 h-3"></i> 4h 15m
                  </span>
                  <span>8 Modules</span>
                </div>
              </div>
            </a>

            {/* <!-- Card 3 --> */}
            <a
              href="/courses/docker-mastery"
              className="group  bg-neutral-0 border border-neutral-200 hover:border-brand-500 transition-all hover:shadow-md h-full flex flex-col"
            >
              <div className="h-40 bg-neutral-100 border-b border-neutral-200 flex items-center justify-center group-hover:bg-neutral-50 transition-colors">
                <i
                  data-lucide="container"
                  className="w-10 h-10 text-neutral-400 group-hover:text-brand-500 transition-colors"
                ></i>
              </div>
              <div className="p-5 grow flex flex-col">
                <div className="flex justify-between items-start mb-3">
                  <span className="text-[10px] uppercase tracking-wider text-brand-600 font-semibold border border-brand-100 bg-brand-50 px-1.5 py-0.5">
                    DevOps
                  </span>
                  <div className="flex gap-0.5">
                    <div className="w-1.5 h-1.5 bg-neutral-800"></div>
                    <div className="w-1.5 h-1.5 bg-neutral-300"></div>
                    <div className="w-1.5 h-1.5 bg-neutral-300"></div>
                  </div>
                </div>
                <h3 className="text-heading-3 text-neutral-900 mb-2 group-hover:text-brand-600 transition-colors">
                  Docker for Developers
                </h3>
                <p className="text-caption text-neutral-500 mb-6 grow line-clamp-3">
                  From writing your first Dockerfile to multi-stage builds and
                  docker-compose orchestration.
                </p>
                <div className="flex items-center justify-between pt-4 border-t border-neutral-100 text-caption text-neutral-600">
                  <span className="flex items-center gap-1.5">
                    <i data-lucide="clock" className="w-3 h-3"></i> 3h 45m
                  </span>
                  <span>10 Modules</span>
                </div>
              </div>
            </a>

            {/* <!-- Card 4 --> */}
            <a
              href="#"
              className="group  bg-neutral-0 border border-neutral-200 hover:border-brand-500 transition-all hover:shadow-md h-full flex flex-col"
            >
              <div className="h-40 bg-neutral-100 border-b border-neutral-200 flex items-center justify-center group-hover:bg-neutral-50 transition-colors">
                <i
                  data-lucide="shield"
                  className="w-10 h-10 text-neutral-400 group-hover:text-brand-500 transition-colors"
                ></i>
              </div>
              <div className="p-5 grow flex flex-col">
                <div className="flex justify-between items-start mb-3">
                  <span className="text-[10px] uppercase tracking-wider text-brand-600 font-semibold border border-brand-100 bg-brand-50 px-1.5 py-0.5">
                    Security
                  </span>
                  <div className="flex gap-0.5">
                    <div className="w-1.5 h-1.5 bg-neutral-800"></div>
                    <div className="w-1.5 h-1.5 bg-neutral-800"></div>
                    <div className="w-1.5 h-1.5 bg-neutral-300"></div>
                  </div>
                </div>
                <h3 className="text-heading-3 text-neutral-900 mb-2 group-hover:text-brand-600 transition-colors">
                  Web Security Fundamentals
                </h3>
                <p className="text-caption text-neutral-500 mb-6 grow line-clamp-3">
                  Understand OWASP Top 10, XSS, CSRF, and how to secure your
                  Next.js applications.
                </p>
                <div className="flex items-center justify-between pt-4 border-t border-neutral-100 text-caption text-neutral-600">
                  <span className="flex items-center gap-1.5">
                    <i data-lucide="clock" className="w-3 h-3"></i> 5h 20m
                  </span>
                  <span>14 Modules</span>
                </div>
              </div>
            </a>

            {/* <!-- Card 5 --> */}
            <a
              href="#"
              className="group bg-neutral-0 border border-neutral-200 hover:border-brand-500 transition-all hover:shadow-md h-full flex flex-col"
            >
              <div className="h-40 bg-neutral-100 border-b border-neutral-200 flex items-center justify-center group-hover:bg-neutral-50 transition-colors">
                <i
                  data-lucide="network"
                  className="w-10 h-10 text-neutral-400 group-hover:text-brand-500 transition-colors"
                ></i>
              </div>
              <div className="p-5 grow flex flex-col">
                <div className="flex justify-between items-start mb-3">
                  <span className="text-[10px] uppercase tracking-wider text-brand-600 font-semibold border border-brand-100 bg-brand-50 px-1.5 py-0.5">
                    Systems
                  </span>
                  <div className="flex gap-0.5">
                    <div className="w-1.5 h-1.5 bg-neutral-800"></div>
                    <div className="w-1.5 h-1.5 bg-neutral-800"></div>
                    <div className="w-1.5 h-1.5 bg-neutral-800"></div>
                  </div>
                </div>
                <h3 className="text-heading-3 text-neutral-900 mb-2 group-hover:text-brand-600 transition-colors">
                  System Design Interview
                </h3>
                <p className="text-caption text-neutral-500 mb-6 grow line-clamp-3">
                  Prepare for senior interviews. Load balancing, caching,
                  sharding, and consistent hashing.
                </p>
                <div className="flex items-center justify-between pt-4 border-t border-neutral-100 text-caption text-neutral-600">
                  <span className="flex items-center gap-1.5">
                    <i data-lucide="clock" className="w-3 h-3"></i> 8h 00m
                  </span>
                  <span>16 Modules</span>
                </div>
              </div>
            </a>

            {/* <!-- Card 6 (Locked/Coming Soon) --> */}
            <div className="group  bg-neutral-50 border border-neutral-200 opacity-75 h-full flex flex-col cursor-not-allowed">
              <div className="h-40 bg-neutral-100 border-b border-neutral-200 flex items-center justify-center relative">
                <i data-lucide="cpu" className="w-10 h-10 text-neutral-300"></i>
                <span className="absolute top-3 right-3 bg-neutral-200 text-neutral-500 text-[10px] px-2 py-0.5 font-medium">
                  SOON
                </span>
              </div>
              <div className="p-5 grow flex flex-col">
                <div className="flex justify-between items-start mb-3">
                  <span className="text-[10px] uppercase tracking-wider text-neutral-500 font-semibold border border-neutral-200 bg-neutral-100 px-1.5 py-0.5">
                    Low Level
                  </span>
                </div>
                <h3 className="text-heading-3 text-neutral-400 mb-2">
                  Rust for TypeScript Devs
                </h3>
                <p className="text-caption text-neutral-400 mb-6 grow line-clamp-3">
                  A bridge for TS developers looking to get into systems
                  programming with Rust.
                </p>
                <div className="flex items-center justify-between pt-4 border-t border-neutral-200 text-caption text-neutral-400">
                  <span className="flex items-center gap-1.5">
                    <i data-lucide="clock" className="w-3 h-3"></i> TBD
                  </span>
                  <span>Coming Q3</span>
                </div>
              </div>
            </div>
          </div>

          {/* <!-- Pagination --> */}
          <div className="mt-12 flex justify-center">
            <div className="inline-flex border border-neutral-200 bg-neutral-0">
              <button className="w-10 h-10 flex items-center justify-center text-neutral-400 border-r border-neutral-200 hover:bg-neutral-50 hover:text-neutral-900 disabled:opacity-50">
                <i data-lucide="chevron-left" className="w-4 h-4"></i>
              </button>
              <button className="w-10 h-10 flex items-center justify-center text-neutral-0 bg-neutral-900 text-body font-medium">
                1
              </button>
              <button className="w-10 h-10 flex items-center justify-center text-neutral-600 text-body font-medium hover:bg-neutral-50 hover:text-neutral-900 border-l border-neutral-200">
                2
              </button>
              <button className="w-10 h-10 flex items-center justify-center text-neutral-600 text-body font-medium hover:bg-neutral-50 hover:text-neutral-900 border-l border-neutral-200">
                3
              </button>
              <button className="w-10 h-10 flex items-center justify-center text-neutral-600 border-l border-neutral-200 hover:bg-neutral-50 hover:text-neutral-900">
                <i data-lucide="chevron-right" className="w-4 h-4"></i>
              </button>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}
