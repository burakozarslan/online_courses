export default function Pricing() {
  return (
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
            One subscription, unlimited access. Stop buying individual courses.
            Start your career transformation today.
          </p>

          {/* <!-- Toggle --> */}
          <div className="mt-8 inline-flex items-center p-1 border border-neutral-200 bg-neutral-0">
            <button className="cursor-pointer px-6 py-2 text-caption font-medium bg-neutral-900 text-neutral-0 shadow-sm">
              Monthly
            </button>
            <button className="cursor-pointer px-6 py-2 text-caption font-medium text-neutral-500 hover:text-neutral-900">
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
  );
}
