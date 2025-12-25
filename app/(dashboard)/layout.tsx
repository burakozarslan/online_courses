import Sidebar from "@/components/layout/Sidebar";

export default function DashboardLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <div className="bg-neutral-50 min-h-screen flex">
      <Sidebar />
      <div className="flex-1 md:ml-64 flex flex-col min-h-screen">
        {children}
      </div>
    </div>
  );
}
