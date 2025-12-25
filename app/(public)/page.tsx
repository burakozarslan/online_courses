import Navbar from "@/components/layout/Navbar";
import Hero from "@/components/layout/Hero";
import Footer from "@/components/layout/Footer";
import Pricing from "@/components/layout/Pricing";
import FeaturedCourses from "@/components/layout/FeaturedCourses";
import StatsBar from "@/components/layout/StatsBar";

export default function LandingPage() {
  return (
    <div>
      {/* <!-- Hero Section --> */}
      <Hero />
      {/* <!-- Stats Bar --> */}
      <StatsBar />
      {/* <!-- Featured Courses Grid --> */}
      <FeaturedCourses />
      {/* <!-- Pricing Section --> */}
      <Pricing />
    </div>
  );
}
