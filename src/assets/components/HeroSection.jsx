import { useState } from "react";
import { Play, ArrowRight, Shield, Users, Clock, Calendar } from "lucide-react";
import AuthModal from "../Pages/Authentication/AuthModal.jsx";

function HeroSection({ onNavigate }) {
  const [isAuthModalOpen, setIsAuthModalOpen] = useState(false);
  const [authModalTab, setAuthModalTab] = useState("signup");

  const handleStartJourneyClick = () => {
    setAuthModalTab("signup");
    setIsAuthModalOpen(true);
  };

  return (
    <>
      <section className="relative min-h-screen flex items-center justify-center bg-gradient-to-br from-background via-secondary/30 to-background overflow-hidden">
        {/* Background Pattern */}
        <div className="absolute inset-0 opacity-5">
          <div className="absolute top-20 left-10 w-32 h-32 bg-primary rounded-full blur-3xl"></div>
          <div className="absolute bottom-20 right-10 w-40 h-40 bg-therapeutic-blue rounded-full blur-3xl"></div>
          <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-60 h-60 bg-therapeutic-green rounded-full blur-3xl"></div>
        </div>

        <div className="container mx-auto px-4 pt-2 sm:px-6 lg:px-8 relative z-10">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            {/* Left Content */}
            <div className="space-y-8">
              <div className="inline-flex items-center px-4 py-2 rounded-full bg-secondary text-secondary-foreground border border-border">
                <Shield className="h-4 w-4 mr-2 text-therapeutic-green" />
                <span className="text-sm font-medium">Trusted by 10,000+ users</span>
              </div>

              <div className="space-y-4">
                <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold leading-tight">
                  Your Journey to{" "}
                  <span className="text-gradient">Mental Wellness</span>{" "}
                  Starts Here
                </h1>
                <p className="text-lg sm:text-xl text-muted-foreground leading-relaxed max-w-2xl">
                  Connect with licensed therapists, track your mood, access resources, and build healthy habits.
                  MindRafiki provides personalized mental health support whenever you need it.
                </p>
              </div>

              {/* Stats */}
              <div className="flex flex-wrap gap-6 text-sm">
                <div className="flex items-center gap-2">
                  <Users className="h-5 w-5 text-therapeutic-blue" />
                  <span className="text-muted-foreground">500+ Licensed Therapists</span>
                </div>
                <div className="flex items-center gap-2">
                  <Clock className="h-5 w-5 text-therapeutic-green" />
                  <span className="text-muted-foreground">24/7 Support Available</span>
                </div>
              </div>

              {/* CTA Button */}
              <div className="flex flex-col sm:flex-row gap-4">
                <button
                  size="lg"
                  className=" flex therapeutic-gradient text-white rounded-md hover:opacity-90 transition-all duration-300 therapeutic-shadow text-base px-8 py-3 h-auto"
                  onClick={handleStartJourneyClick}
                >
                  Start Your Journey
                  <ArrowRight className="ml-2 h-5 w-5" />
                </button>
                
              </div>

              {/* User Role Preview */}
              <div className="pt-8 border-t border-border/40">
                <p className="text-sm text-muted-foreground mb-4">Join as:</p>
                <div className="flex flex-wrap gap-3">
                  <div className="px-3 py-2 bg-therapeutic-blue-10 text-therapeutic-blue rounded-lg text-xs font-medium">
                    Youth (13-25)
                  </div>
                  <div className="px-3 py-2 bg-therapeutic-green-10 text-therapeutic-green rounded-lg text-xs font-medium">
                    Parent/Teacher
                  </div>
                  <div className="px-3 py-2 bg-therapeutic-purple-10 text-therapeutic-purple rounded-lg text-xs font-medium">
                    Licensed Therapist
                  </div>
                  <div className="px-3 py-2 bg-therapeutic-orange-10 text-therapeutic-orange rounded-lg text-xs font-medium">
                    Administrator
                  </div>
                </div>
              </div>


              {/* Trust Indicators */}
              <div className="pt-4">
                <div className="flex items-center space-x-8 opacity-60">
                  <div className="text-xs font-medium">✓ HIPAA Compliant</div>
                  <div className="text-xs font-medium">✓ APA Certified</div>
                  <div className="text-xs font-medium">✓ 256-bit Encryption</div>
                </div>
              </div>
            </div>

            {/* Right Content */}
            <div className="relative">
              <div className="therapeutic-card p-6 relative max-w-md mx-auto">
                <img
                  src="https://images.unsplash.com/photo-1646489346063-779c0a2d6c46"
                  alt="Peaceful therapy session"
                  className="w-full h-auto rounded-2xl shadow-lg"
                />
              </div>

              <div className="absolute top-2 left-2 bg-white p-2 rounded-xl shadow-lg border-border">
                <div className="flex items-center gap-2">
                  <div className="w-3 h-3 bg-therapeutic-green rounded-full"></div>
                  <span className="text-xs font-medium">Online Now</span>
                </div>
              </div>

              <div className="absolute bottom-2 right-1 bg-white p-3 rounded-xl shadow-lg border-border">
                <div className="text-center">
                  <div className="text-lg font-bold text-gradient">4.9★</div>
                  <div className="text-xs text-muted-foreground">User Rating</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <AuthModal
        isOpen={isAuthModalOpen}
        onClose={() => setIsAuthModalOpen(false)}
        defaultTab={authModalTab}
      />
    </>
  );
}

export default HeroSection;