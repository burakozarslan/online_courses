import Sidebar from "@/components/layout/Sidebar";
import { CourseProvider } from "@/components/provider/CourseProvider";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { redirect } from "next/navigation";

export default async function DashboardLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const session = await getServerSession(authOptions);

  if (!session) {
    return redirect("/login");
  }

  if (session.user.role === "ADMIN") {
    return redirect("/admin");
  }

  return (
    <div className="bg-neutral-50 min-h-screen flex">
      <Sidebar />
      <div className="flex-1 md:ml-64 flex flex-col min-h-screen">
        <CourseProvider>{children}</CourseProvider>
      </div>
    </div>
  );
}
