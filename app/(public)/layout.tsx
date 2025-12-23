import Navbar from "@/components/wrappers/Navbar";
import Footer from "@/components/wrappers/Footer";

export default function PublicLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <>
      <Navbar />
      {children}
      <Footer />
    </>
  );
}
