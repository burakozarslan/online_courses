import Link from "next/link";

import {
  Settings,
  CreditCard,
  Award,
  LayoutDashboard,
  BookOpen,
} from "lucide-react";
import DashboardLogoutButton from "@/components/auth/DashboardLogoutButton";

export default function Sidebar() {
  return (
    <aside className="w-64 bg-neutral-900 text-neutral-400 flex flex-col fixed h-full border-r border-neutral-800 z-20 hidden md:flex">
      {/* <!-- Logo --> */}
      <div className="h-16 flex items-center px-6 border-b border-neutral-800 bg-neutral-950">
        <div className="w-5 h-5 bg-brand-600 flex items-center justify-center font-bold text-caption text-white mr-3">
          /
        </div>
        <span className="text-heading-3 text-neutral-0 tracking-tight">
          DASHBOARD
        </span>
      </div>

      {/* <!-- User Info (Compact) --> */}
      <div className="p-6 border-b border-neutral-800">
        <div className="flex items-center gap-3">
          <div className="w-8 h-8 bg-neutral-800 border border-neutral-700 flex items-center justify-center text-neutral-200 font-bold">
            JD
          </div>
          <div>
            <div className="text-body text-neutral-200">John Doe</div>
            <div className="text-caption text-brand-500">PRO MEMBER</div>
          </div>
        </div>
      </div>

      {/* <!-- Navigation --> */}
      <nav className="flex-1 py-6 px-3 space-y-1">
        <Link
          href="/overview"
          className="flex items-center gap-3 px-3 py-2 bg-neutral-800 text-neutral-0 border-l-2 border-brand-500"
        >
          <LayoutDashboard className="size-4" />
          <span className="text-body font-medium">Overview</span>
        </Link>
        <Link
          href="/learning"
          className="flex items-center gap-3 px-3 py-2 text-neutral-400 hover:text-neutral-0 hover:bg-neutral-800 border-l-2 border-transparent transition-colors"
        >
          <BookOpen className="size-4" />
          <span className="text-body font-medium">Enrolled</span>
        </Link>
        <Link
          href="/achievements"
          className="flex items-center gap-3 px-3 py-2 text-neutral-400 hover:text-neutral-0 hover:bg-neutral-800 border-l-2 border-transparent transition-colors"
        >
          <Award className="size-4" />
          <span className="text-body font-medium">Certificates</span>
        </Link>
        <Link
          href="/billing"
          className="flex items-center gap-3 px-3 py-2 text-neutral-400 hover:text-neutral-0 hover:bg-neutral-800 border-l-2 border-transparent transition-colors"
        >
          <CreditCard className="size-4" />
          <span className="text-body font-medium">Billing</span>
        </Link>
      </nav>

      {/* <!-- Bottom Links --> */}
      <div className="p-4 border-t border-neutral-800">
        <Link
          href="#"
          className="flex items-center gap-3 px-3 py-2 text-neutral-500 hover:text-neutral-300 transition-colors"
        >
          <Settings className="size-4" />
          <span className="text-caption">Settings</span>
        </Link>
        <DashboardLogoutButton />
      </div>
    </aside>
  );
}
