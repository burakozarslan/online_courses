import Navbar from "@/components/wrappers/Navbar";
import Hero from "@/components/wrappers/Hero";
import Footer from "@/components/wrappers/Footer";
import Pricing from "@/components/wrappers/Pricing";
import FeaturedCourses from "@/components/wrappers/FeaturedCourses";
import StatsBar from "@/components/wrappers/StatsBar";

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
