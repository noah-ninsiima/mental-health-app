import { useState } from "react";
import { ArrowRight } from "lucide-react";
import AuthModal from "../Pages/Authentication/AuthModal.jsx";


function CallToAction({ onNavigate }) {
  const [isAuthModalOpen, setIsAuthModalOpen] = useState(false);
  const [authModalTab, setAuthModalTab] = useState("signup");

  const handleStartJourneyClick = () => {
    setAuthModalTab("signup");
    setIsAuthModalOpen(true);
  };
  return (
    <>
      <div className="therapeutic-card p-8 lg:p-12 mb-10  text-center max-w-2xl mx-auto">
        <h2 className="text-2xl sm:text-3xl font-bold mb-4">
           Start Your Journey Today
        </h2>
        <p className="text-md mb-8">
          Join the MindRafiki community and get access to personalized mental health support, professional therapy sessions, and comprehensive wellness resources.
        </p>
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <button
                  size="lg"
                  className=" flex justify-center w-full therapeutic-gradient text-white rounded-md hover:opacity-90 transition-all duration-300 therapeutic-shadow text-base px-8 py-2 h-auto"
                  onClick={handleStartJourneyClick}
                >
                  Start Your Journey
                  <ArrowRight className="ml-2 h-5 w-5" />
                </button>  
              </div>
      </div>
  

    <AuthModal
        isOpen={isAuthModalOpen}
        onClose={() => setIsAuthModalOpen(false)}
        defaultTab={authModalTab}
      />
      </>
  );
}

export default CallToAction;