// src/assets/Pages/Home.jsx
import HeroSection from "../components/HeroSection.jsx";
import KeyFeatures from "../components/KeyFeatures.jsx";
import HowItWorks from "../components/HowItWorks.jsx";
import CallToAction from "../components/CallToAction.jsx";
import RoleDashboardPreview from "../components/RoleDashboardPreview.jsx";
import Footer from "../components/Footer/Footer.jsx";

export default function Home() {
  return (
    <div className="min-h-screen flex flex-col">
      {/* Top content */}
      <main className="flex-1">
        <HeroSection />
        <KeyFeatures />
        <HowItWorks />
        <RoleDashboardPreview />
        <CallToAction />
      </main>

      {/* Global footer */}
      <Footer />
    </div>
  );
}
