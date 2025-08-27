import { useState } from "react";
import { Link } from "react-router-dom";
import { Menu, X, Heart, Calendar } from "lucide-react";
import AuthModal from "../../Pages/Authentication/AuthModal.jsx"; // fixed relative path

function Navbar() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isAuthModalOpen, setIsAuthModalOpen] = useState(false);
  const [authModalTab, setAuthModalTab] = useState("login");

  const handleSignInClick = () => {
    setAuthModalTab("login");
    setIsAuthModalOpen(true);
  };

  const handleGetStartedClick = () => {
    setAuthModalTab("signup");
    setIsAuthModalOpen(true);
  };

  const closeMobile = () => setIsMenuOpen(false);

  return (
    <>
      <header className="sticky top-0 z-40 w-full border-b border-border/40 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex h-16 items-center justify-between">
            {/* Logo */}
            <Link to="/" className="flex items-center space-x-2" onClick={closeMobile}>
              <div className="flex items-center justify-center w-10 h-10 rounded-xl therapeutic-gradient">
                <Heart className="h-6 w-6 text-white" />
              </div>
              <div>
                <h1 className="text-xl font-bold text-gradient">MindRafiki</h1>
                <p className="text-xs text-muted-foreground -mt-1">Mental Health Support</p>
              </div>
            </Link>

            {/* Desktop Navigation */}
            <nav className="hidden md:flex items-center space-x-6">
              <Link
                to="/"
                className="text-sm font-medium text-foreground hover:text-primary transition-colors duration-200"
              >
                Home
              </Link>

              <Link
                to="/booking"
                className="text-sm font-medium text-foreground hover:text-primary transition-colors duration-200 flex items-center gap-1"
              >
                <Calendar className="h-3 w-3" />
                Book Session
              </Link>

              <Link
                to="/resources"
                className="text-sm font-medium text-foreground hover:text-primary transition-colors duration-200"
              >
                Resources
              </Link>

              <Link
                to="/chat"
                className="text-sm font-medium text-foreground hover:text-primary transition-colors duration-200"
              >
                Support Chat
              </Link>

              {/* New section placeholder */}
              <Link
                to="/therapists"
                className="text-sm font-medium text-foreground hover:text-primary transition-colors duration-200"
              >
                Therapists
              </Link>
            </nav>
            <Link to="/dashboard/admin" className="text-sm font-medium text-foreground hover:text-primary">Admin</Link>
<Link to="/dashboard/guardian" className="text-sm font-medium text-foreground hover:text-primary">Guardian</Link>
<Link to="/dashboard/therapist" className="text-sm font-medium text-foreground hover:text-primary">Therapist</Link>

            {/* CTA Buttons */}
            <div className="hidden md:flex items-center space-x-3">
              <button
                className="px-3 py-1 rounded-md text-sm font-medium text-foreground hover:text-primary hover:bg-secondary"
                onClick={handleSignInClick}
              >
                Sign In
              </button>
              <button
                className="px-3 py-1 rounded-md text-sm font-medium therapeutic-gradient text-white hover:opacity-90 transition-opacity duration-200 shadow-md"
                onClick={handleGetStartedClick}
              >
                Get Started
              </button>
            </div>

            {/* Mobile Menu Button */}
            <button
              className="md:hidden p-2 rounded-md hover:bg-secondary"
              onClick={() => setIsMenuOpen(!isMenuOpen)}
            >
              {isMenuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
            </button>
          </div>

          {/* Mobile Navigation */}
          {isMenuOpen && (
            <div className="md:hidden border-t border-border/40 py-4">
              <nav className="flex flex-col space-y-4">
                <Link
                  to="/"
                  onClick={closeMobile}
                  className="text-sm font-medium text-foreground hover:text-primary transition-colors duration-200 py-2 text-left"
                >
                  Home
                </Link>

                <Link
                  to="/booking"
                  onClick={closeMobile}
                  className="text-sm font-medium text-foreground hover:text-primary transition-colors duration-200 py-2 text-left flex items-center gap-2"
                >
                  <Calendar className="h-4 w-4" />
                  Book Session
                </Link>

                <Link
                  to="/resources"
                  onClick={closeMobile}
                  className="text-sm font-medium text-foreground hover:text-primary transition-colors duration-200 py-2 text-left"
                >
                  Resources
                </Link>

                <Link
                  to="/chat"
                  onClick={closeMobile}
                  className="text-sm font-medium text-foreground hover:text-primary transition-colors duration-200 py-2 text-left"
                >
                  Support Chat
                </Link>

                {/* New section placeholder */}
                <Link
                  to="/therapists"
                  onClick={closeMobile}
                  className="text-sm font-medium text-foreground hover:text-primary transition-colors duration-200 py-2 text-left"
                >
                  Therapists
                </Link>

                <div className="flex flex-col space-y-2 pt-4 border-t border-border/40">
                  <button
                    className="px-3 py-1 rounded-md text-sm font-medium border border-border hover:bg-muted"
                    onClick={() => {
                      closeMobile();
                      handleSignInClick();
                    }}
                  >
                    Sign In
                  </button>
                  <button
                    className="px-3 py-1 rounded-md text-sm font-medium therapeutic-gradient text-white"
                    onClick={() => {
                      closeMobile();
                      handleGetStartedClick();
                    }}
                  >
                    Get Started
                  </button>
                </div>
              </nav>
            </div>
          )}
        </div>
      </header>

      {/* Authentication Modal */}
      <AuthModal
        isOpen={isAuthModalOpen}
        onClose={() => setIsAuthModalOpen(false)}
        defaultTab={authModalTab}
      />
    </>
  );
}

export default Navbar;
