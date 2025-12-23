export default function Navbar() {
  return (
    <nav className="sticky top-0 z-50 bg-neutral-0 border-b border-neutral-border">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16 items-center">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 bg-brand-600 flex items-center justify-center text-neutral-0 font-bold">
              &lt;/&gt;
            </div>
            <span className="text-heading-3 text-neutral-900 tracking-tight">
              DEV_PLATFORM
            </span>
          </div>

          <div className="hidden md:flex space-x-8">
            <a
              href="/courses"
              className="text-body text-neutral-600 hover:text-brand-600 transition-colors"
            >
              Course Catalog
            </a>
            <a
              href="/pricing"
              className="text-body text-neutral-600 hover:text-brand-600 transition-colors"
            >
              Pricing
            </a>
            <a
              href="#"
              className="text-body text-neutral-600 hover:text-brand-600 transition-colors"
            >
              Resources
            </a>
          </div>

          <div className="flex items-center gap-4">
            <a
              href="/login"
              className="text-caption text-neutral-900 font-medium hover:text-brand-600"
            >
              [ LOGIN ]
            </a>
            <a
              href="/pricing"
              className="bg-neutral-900 text-neutral-0 px-5 py-2 text-body font-medium hover:bg-brand-600 transition-colors shadow-sm"
            >
              Start Learning
            </a>
          </div>
        </div>
      </div>
    </nav>
  );
}
