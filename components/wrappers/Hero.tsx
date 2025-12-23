export default function Hero() {
  return (
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
              Project-based learning for developers who want to ship. Master the
              modern stack with in-depth tutorials, interactive code labs, and a
              community of builders.
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
              <div className="size-3 bg-neutral-700"></div>
              <div className="size-3 bg-neutral-700"></div>
              <span className="text-caption text-neutral-500 ml-2">
                server.ts
              </span>
            </div>
            <div className="p-6 font-mono text-sm overflow-hidden">
              <div className="text-neutral-500 mb-2">
                {"// Initialize payment subscription"}
              </div>
              <div className="pl-4 text-neutral-300">
                name: <span className="text-brand-200">{"Pro Plan"}</span>,
              </div>
              <div className="pl-4 text-neutral-300">
                price: <span className="text-brand-200">29.00</span>,
              </div>
              <div className="pl-4 text-neutral-300">
                interval:{" "}
                <span className="text-brand-200">{"EVERY_30_DAYS"}</span>
              </div>
              <div className="mt-4 text-neutral-500">
                {"// Update user status in NeonDB"}
              </div>
              <div className="text-brand-300">await</div>{" "}
              <div className="pl-4 text-neutral-300">
                {"prisma.user.update("}

                {"{where: { id: userId },"}
              </div>
              <div className="pl-4 text-neutral-300">
                {"data: { isPro: "}
                <span className="text-brand-300">{"true"}</span> {" }})"}
              </div>
            </div>

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
  );
}
