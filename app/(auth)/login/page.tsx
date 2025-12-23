import { Lock } from "lucide-react";

export default function LoginPage() {
  return (
    <>
      <div className="w-full max-w-md bg-neutral-0 border border-neutral-200 shadow-lg relative">
        {/* <!-- Top decorative bar --> */}
        <div className="h-1 w-full bg-brand-600"></div>

        <div className="p-8">
          {/* <!-- Header --> */}
          <div className="mb-8 text-center">
            <div className="inline-flex items-center justify-center w-10 h-10 bg-brand-50 text-brand-700 mb-4 border border-brand-100">
              <Lock />
            </div>
            <h1 className="text-heading-2 text-neutral-900 mb-2">Login</h1>
            <p className="text-body text-neutral-500">Enter your credentials</p>
          </div>

          {/* <!-- Form --> */}
          <form className="space-y-6">
            {/* <!-- Email Field --> */}
            <div className="space-y-2">
              <label
                htmlFor="email"
                className="block text-caption text-neutral-700 font-medium"
              >
                EMAIL_ADDRESS
              </label>
              <div className="relative">
                <input
                  type="email"
                  id="email"
                  className="w-full bg-neutral-50 border border-neutral-300 px-4 py-2.5 text-body text-neutral-900 placeholder-neutral-400 focus:outline-none focus:border-brand-500 focus:ring-1 focus:ring-brand-500 transition-colors"
                  placeholder="user@example.com"
                />
              </div>
            </div>

            {/* <!-- Password Field --> */}
            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <label
                  htmlFor="password"
                  className="block text-caption text-neutral-700 font-medium"
                >
                  PASSWORD
                </label>
                <a
                  href="/forgot-password"
                  className="text-caption text-brand-600 hover:text-brand-700"
                >
                  Forgot Password?
                </a>
              </div>
              <div className="relative">
                <input
                  type="password"
                  id="password"
                  className="w-full bg-neutral-50 border border-neutral-300 px-4 py-2.5 text-body text-neutral-900 placeholder-neutral-400 focus:outline-none focus:border-brand-500 focus:ring-1 focus:ring-brand-500 transition-colors"
                  placeholder="••••••••"
                />
              </div>
            </div>

            {/* <!-- Actions --> */}
            <button
              type="button"
              className="w-full bg-brand-600 text-neutral-0 py-2.5 px-4 text-body font-medium hover:bg-brand-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-brand-500 transition-all flex items-center justify-center gap-2 group"
            >
              AUTHENTICATE
              <i
                data-lucide="arrow-right"
                className="w-4 h-4 group-hover:translate-x-1 transition-transform"
              ></i>
            </button>
          </form>

          {/* <!-- Footer --> */}
          <div className="mt-8 pt-6 border-t border-neutral-100 text-center">
            <p className="text-caption text-neutral-500">
              No account?
              <a
                href="/register"
                className="text-brand-600 font-medium hover:text-brand-700 hover:underline"
              >
                {" "}
                Register here
              </a>
            </p>
          </div>
        </div>

        {/* <!-- Status Indicator (Design Element) --> */}
        <div className="bg-neutral-50 border-t border-neutral-200 px-4 py-2 flex justify-between items-center text-caption text-neutral-400">
          <span className="flex items-center gap-1.5">
            <span className="w-1.5 h-1.5 bg-brand-500 rounded-none"></span>
            SECURE_CONNECTION
          </span>
          {/* <span>v2.4.0</span> */}
        </div>
      </div>
    </>
  );
}
