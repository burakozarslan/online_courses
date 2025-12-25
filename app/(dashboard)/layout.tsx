import Sidebar from "@/components/wrappers/Sidebar";

export default function DashboardLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <div className="bg-neutral-50 min-h-screen flex">
      <Sidebar />
      {children}
    </div>
  );
}
