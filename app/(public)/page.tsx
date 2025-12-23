import Navbar from "@/components/Navbar";
import Hero from "@/components/Hero";
import Footer from "@/components/Footer";
import Pricing from "@/components/Pricing";
import FeaturedCourses from "@/components/FeaturedCourses";
import StatsBar from "@/components/StatsBar";

export default function LandingPage() {
  return (
    <div>
      {/* Navigation */}
      <Navbar />

      {/* <!-- Hero Section --> */}
      <Hero />

      {/* <!-- Stats Bar --> */}
      <StatsBar />

      {/* <!-- Featured Courses Grid --> */}
      <FeaturedCourses />

      {/* <!-- Pricing Section --> */}
      <Pricing />

      {/* <!-- Footer --> */}
      <Footer />
    </div>
  );
}
