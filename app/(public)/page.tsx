import Navbar from "@/components/Navbar";

export default function LandingPage() {
  return (
    <div>
      {/* Navigation */}
      <Navbar />

      {/* <!-- Hero Section --> */}
      <section className="relative bg-grid border-b border-neutral-border overflow-hidden">
        <div className="absolute inset-0 bg-linear-to-b from-transparent to-neutral-0 pointer-events-none"></div>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24 lg:py-32 relative z-10">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div>
              <div className="inline-flex items-center gap-2 px-3 py-1 bg-brand-50 border border-brand-200 text-brand-700 text-caption mb-6">
                <span className="w-2 h-2 bg-brand-500"></span>
                NEW: System Design Course
              </div>

              <h1 className="text-[42px] leading-12 font-semibold text-neutral-900 mb-6 tracking-tight">
                Compile Your Future.
                <br />
                <span className="text-neutral-400">One Commit at a Time.</span>
              </h1>

              <p className="text-body text-neutral-500 mb-8 max-w-lg leading-relaxed">
                Project-based learning for developers who want to ship. Master
                the modern stack with in-depth tutorials, interactive code labs,
                and a community of builders.
              </p>

              <div className="flex flex-col sm:flex-row gap-4">
                <a
                  href="/courses"
                  className="bg-brand-600 text-neutral-0 px-8 py-3 text-body font-medium hover:bg-brand-700 transition-colors shadow-md flex items-center justify-center gap-2"
                >
                  <i data-lucide="terminal" className="w-4 h-4"></i>
                  Browse Catalog
                </a>
                <a
                  href="#features"
                  className="bg-neutral-0 border border-neutral-300 text-neutral-700 px-8 py-3 text-body font-medium hover:border-neutral-900 transition-colors flex items-center justify-center"
                >
                  View Roadmap
                </a>
              </div>

              <div className="mt-8 flex items-center gap-4 text-caption text-neutral-400">
                <div className="flex -space-x-2">
                  <div className="w-8 h-8 bg-neutral-200 border-2 border-neutral-0 rounded-none"></div>
                  <div className="w-8 h-8 bg-neutral-300 border-2 border-neutral-0 rounded-none"></div>
                  <div className="w-8 h-8 bg-neutral-400 border-2 border-neutral-0 rounded-none"></div>
                </div>
                <p>Joined by 10,000+ developers</p>
              </div>
            </div>

            {/* <!-- Technical Graphic --> */}
            <div className="bg-neutral-950 border border-neutral-800 p-1 shadow-lg relative">
              <div className="flex items-center gap-2 px-4 py-2 border-b border-neutral-800 bg-neutral-900">
                <div className="w-3 h-3 bg-neutral-700"></div>
                <div className="w-3 h-3 bg-neutral-700"></div>
                <span className="text-caption text-neutral-500 ml-2">
                  server.ts
                </span>
              </div>
              <div></div>

              {/* <!-- Overlay Badge --> */}
              <div className="absolute -bottom-6 -right-6 bg-neutral-0 border border-neutral-200 p-4 shadow-md hidden lg:block">
                <div className="flex items-center gap-3">
                  <div className="bg-brand-100 p-2 text-brand-700">
                    <i data-lucide="check-circle" className="w-6 h-6"></i>
                  </div>
                  <div>
                    <p className="text-heading-3">Production Ready</p>
                    <p className="text-caption text-neutral-500">
                      Best practices only
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* <!-- Stats Bar --> */}
      <section className="border-b border-neutral-border bg-neutral-50">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-2 md:grid-cols-4 divide-x divide-neutral-200 border-x border-neutral-200">
            <div className="p-6 text-center">
              <p className="text-heading-2 text-brand-600">50+</p>
              <p className="text-caption text-neutral-500 uppercase tracking-widest mt-1">
                Courses
              </p>
            </div>
            <div className="p-6 text-center">
              <p className="text-heading-2 text-neutral-900">40h</p>
              <p className="text-caption text-neutral-500 uppercase tracking-widest mt-1">
                Video Content
              </p>
            </div>
            <div className="p-6 text-center">
              <p className="text-heading-2 text-neutral-900">Zero</p>
              <p className="text-caption text-neutral-500 uppercase tracking-widest mt-1">
                Fluff
              </p>
            </div>
            <div className="p-6 text-center">
              <p className="text-heading-2 text-neutral-900">24/7</p>
              <p className="text-caption text-neutral-500 uppercase tracking-widest mt-1">
                Access
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* <!-- Featured Courses Grid --> */}
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
                <div className="text-caption text-brand-600 mb-2">
                  FULLSTACK
                </div>
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
                  <span className="text-caption text-neutral-400">
                    8 Modules
                  </span>
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

      {/* <!-- Pricing Section --> */}
      <section
        id="pricing"
        className="py-24 bg-neutral-50 border-t border-neutral-200"
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-2xl mx-auto mb-16">
            <h2 className="text-heading-1 text-neutral-900 mb-4">
              Simple Pricing
            </h2>
            <p className="text-body text-neutral-500">
              One subscription, unlimited access. Stop buying individual
              courses. Start your career transformation today.
            </p>

            {/* <!-- Toggle --> */}
            <div className="mt-8 inline-flex items-center p-1 border border-neutral-200 bg-neutral-0">
              <button className="px-6 py-2 text-caption font-medium bg-neutral-900 text-neutral-0 shadow-sm">
                Monthly
              </button>
              <button className="px-6 py-2 text-caption font-medium text-neutral-500 hover:text-neutral-900">
                Yearly (-20%)
              </button>
            </div>
          </div>

          <div className="grid md:grid-cols-2 gap-8 max-w-4xl mx-auto">
            {/* <!-- Free Tier --> */}
            <div className="bg-neutral-0 border border-neutral-200 p-8 flex flex-col">
              <h3 className="text-heading-2 text-neutral-900 mb-2">
                Audit Access
              </h3>
              <p className="text-body text-neutral-500 mb-6">
                For those just exploring the tech.
              </p>
              <div className="text-heading-1 mb-6">
                $0
                <span className="text-heading-3 text-neutral-400 font-normal">
                  /mo
                </span>
              </div>

              <ul className="space-y-4 mb-8 flex-1">
                <li className="flex items-start gap-3 text-body text-neutral-600">
                  <i
                    data-lucide="check"
                    className="w-5 h-5 text-neutral-400 shrink-0"
                  ></i>
                  Access to first 3 lessons of any course
                </li>
                <li className="flex items-start gap-3 text-body text-neutral-600">
                  <i
                    data-lucide="check"
                    className="w-5 h-5 text-neutral-400 shrink-0"
                  ></i>
                  Public Discord community
                </li>
                <li className="flex items-start gap-3 text-body text-neutral-600">
                  <i
                    data-lucide="check"
                    className="w-5 h-5 text-neutral-400 shrink-0"
                  ></i>
                  Read-only code repositories
                </li>
              </ul>

              <a
                href="/register"
                className="w-full py-3 border border-neutral-300 text-neutral-900 text-body font-medium text-center hover:border-neutral-900 transition-colors"
              >
                Create Free Account
              </a>
            </div>

            {/* <!-- Pro Tier --> */}
            <div className="bg-neutral-0 border-2 border-brand-500 p-8 flex flex-col relative shadow-lg">
              <div className="absolute top-0 right-0 bg-brand-500 text-neutral-0 text-caption px-3 py-1 font-medium">
                RECOMMENDED
              </div>
              <h3 className="text-heading-2 text-neutral-900 mb-2">
                Pro Subscription
              </h3>
              <p className="text-body text-neutral-500 mb-6">
                Everything you need to become a senior engineer.
              </p>
              <div className="text-heading-1 mb-6">
                $29
                <span className="text-heading-3 text-neutral-400 font-normal">
                  /mo
                </span>
              </div>

              <ul className="space-y-4 mb-8 flex-1">
                <li className="flex items-start gap-3 text-body text-neutral-900">
                  <i
                    data-lucide="check"
                    className="w-5 h-5 text-brand-500 shrink-0"
                  ></i>
                  <strong>Unlimited access</strong> to all 50+ courses
                </li>
                <li className="flex items-start gap-3 text-body text-neutral-900">
                  <i
                    data-lucide="check"
                    className="w-5 h-5 text-brand-500 shrink-0"
                  ></i>
                  Source code downloads
                </li>
                <li className="flex items-start gap-3 text-body text-neutral-900">
                  <i
                    data-lucide="check"
                    className="w-5 h-5 text-brand-500 shrink-0"
                  ></i>
                  Private focused Discord channels
                </li>
                <li className="flex items-start gap-3 text-body text-neutral-900">
                  <i
                    data-lucide="check"
                    className="w-5 h-5 text-brand-500 shrink-0"
                  ></i>
                  Certificate of Completion
                </li>
              </ul>

              <a
                href="/register?plan=pro"
                className="w-full py-3 bg-brand-600 text-neutral-0 text-body font-medium text-center hover:bg-brand-700 transition-colors shadow-md"
              >
                Get Instant Access
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* <!-- Footer --> */}
      <footer className="bg-neutral-900 text-neutral-400 py-12 border-t border-neutral-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 mb-8">
            <div className="col-span-2">
              <div className="flex items-center gap-2 mb-4 text-neutral-0">
                <div className="w-6 h-6 bg-brand-600 flex items-center justify-center font-bold text-caption">
                  &lt;/&gt;
                </div>
                <span className="text-heading-3 tracking-tight">
                  DEV_PLATFORM
                </span>
              </div>
              <p className="text-caption max-w-xs">
                Empowering developers to build the future. Join our community
                and start shipping.
              </p>
            </div>
            <div>
              <h4 className="text-neutral-0 text-body font-medium mb-4">
                Platform
              </h4>
              <ul className="space-y-2 text-caption">
                <li>
                  <a href="#" className="hover:text-brand-400">
                    All Courses
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-brand-400">
                    Pricing
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-brand-400">
                    Login
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-brand-400">
                    Sign Up
                  </a>
                </li>
              </ul>
            </div>
            <div>
              <h4 className="text-neutral-0 text-body font-medium mb-4">
                Legal
              </h4>
              <ul className="space-y-2 text-caption">
                <li>
                  <a href="#" className="hover:text-brand-400">
                    Privacy Policy
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-brand-400">
                    Terms of Service
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-brand-400">
                    Cookie Policy
                  </a>
                </li>
              </ul>
            </div>
          </div>
          <div className="pt-8 border-t border-neutral-800 flex flex-col md:flex-row justify-between items-center gap-4">
            <p className="text-caption">
              © 2025 DevPlatform Inc. All rights reserved.
            </p>
            <div className="flex gap-4">
              <i
                data-lucide="github"
                className="w-5 h-5 hover:text-neutral-0 cursor-pointer"
              ></i>
              <i
                data-lucide="twitter"
                className="w-5 h-5 hover:text-neutral-0 cursor-pointer"
              ></i>
              <i
                data-lucide="youtube"
                className="w-5 h-5 hover:text-neutral-0 cursor-pointer"
              ></i>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}
