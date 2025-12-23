export default function Footer() {
  return (
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
              Empowering developers to build the future. Join our community and
              start shipping.
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
            <h4 className="text-neutral-0 text-body font-medium mb-4">Legal</h4>
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
  );
}
