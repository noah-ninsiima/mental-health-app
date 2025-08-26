import { BrowserRouter,Routes, Route} from "react-router-dom";
import Navbar from "./assets/components/Navbar/Navbar.jsx";
import HeroSection from "./assets/components/HeroSection.jsx";
import HowItWorks from "./assets/components/HowItWorks.jsx";
import KeyFeatures from "./assets/components/KeyFeatures.jsx";
import PageDemo from "./assets/components/PageDemo.jsx";
import RoleDashboardPreview from "./assets/components/RoleDashboardPreview.jsx";
import CallToAction from "./assets/components/CallToAction.jsx";
import AuthModal from "./assets/Pages/Authentication/AuthModal.jsx";
import Footer from "./assets/components/Footer/Footer.jsx";

// placeholder pages
function BookingPage() {
  return <div className="p-8 text-center">📅 Booking Page (coming soon)</div>;
}

function DashboardPage() {
  return <div className="p-8 text-center">📊 Dashboard Page (coming soon)</div>;
}

function HomePage() {
  return (
    <>
      <HeroSection />
      <HowItWorks />
      <KeyFeatures />
      <PageDemo />
      <RoleDashboardPreview />
      <CallToAction />
      <Footer />
    </>
  );
}

function App() {
  return (
    <>
      <BrowserRouter>
      <Navbar />
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/booking" element={<BookingPage />} />
        <Route path="/dashboard" element={<DashboardPage />} />
        <Route path="/authentication" element={<AuthModal />} />
      </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
