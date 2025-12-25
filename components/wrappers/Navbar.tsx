import Link from "next/link";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";

export default async function Navbar() {
  // Fetch session on the server
  const session = await getServerSession(authOptions);

  return (
    <nav className="sticky top-0 z-50 bg-neutral-0 border-b border-neutral-border">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16 items-center">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 bg-brand-600 flex items-center justify-center text-neutral-0 font-bold">
              &lt;/&gt;
            </div>
            <Link href={"/"}>
              <span className="text-heading-3 text-neutral-900 tracking-tight">
                DEV_PLATFORM
              </span>
            </Link>
          </div>

          <div className="hidden md:flex space-x-8">
            <Link
              href="/courses"
              className="text-body text-neutral-600 hover:text-brand-600 transition-colors"
            >
              Course Catalog
            </Link>
            <Link
              href="/pricing"
              className="text-body text-neutral-600 hover:text-brand-600 transition-colors"
            >
              Pricing
            </Link>
            <Link
              href="#"
              className="text-body text-neutral-600 hover:text-brand-600 transition-colors"
            >
              Resources
            </Link>
          </div>

          <div className="flex items-center gap-4">
            {/* Conditional Rendering based on Session */}
            {session ? (
              <Link
                href="/overview"
                className="text-caption text-neutral-900 font-medium hover:text-brand-600"
              >
                [ DASHBOARD ]
              </Link>
            ) : (
              <Link
                href="/login"
                className="text-caption text-neutral-900 font-medium hover:text-brand-600"
              >
                [ LOGIN ]
              </Link>
            )}

            <Link
              href={session ? "/courses" : "/pricing"}
              className="bg-neutral-900 text-neutral-0 px-5 py-2 text-body font-medium hover:bg-brand-600 transition-colors shadow-sm"
            >
              {session ? "Browse Courses" : "Start Learning"}
            </Link>
          </div>
        </div>
      </div>
    </nav>
  );
}
