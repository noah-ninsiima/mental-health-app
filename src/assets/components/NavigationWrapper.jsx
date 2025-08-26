{/*import { useState } from "react";
import { Link } from "react-router-dom";
import { Menu, X } from "lucide-react";

function NavigationWrapper({ children }) {
  const [mobileOpen, setMobileOpen] = useState(false);

  return (
    <div className="min-h-screen flex flex-col">
      {/* Navbar */}
     {/* <nav className="border-b border-border bg-background sticky top-0 z-50">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-between h-16">
          <Link to="/" className="flex items-center space-x-2">
            <span className="text-xl font-bold text-gradient">MindMate</span>
          </Link>

          {/* Desktop menu */}
          {/*<div className="hidden md:flex items-center space-x-6">
            <Link to="/features" className="text-muted-foreground hover:text-foreground">
              Features
            </Link>
            <Link to="/how-it-works" className="text-muted-foreground hover:text-foreground">
              How It Works
            </Link>
            <Link to="/auth" className="px-4 py-2 rounded-lg bg-primary text-white hover:bg-primary/90">
              Get Started
            </Link>
          </div>

          {/* Mobile menu button */}
          {/*<button
            onClick={() => setMobileOpen(!mobileOpen)}
            className="md:hidden p-2 rounded-lg border border-border"
          >
            {mobileOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          </button>
        </div>

        {/* Mobile dropdown */}
        {/*{mobileOpen && (
          <div className="md:hidden bg-background border-t border-border px-4 py-3 space-y-3">
            <Link
              to="/features"
              className="block text-muted-foreground hover:text-foreground"
              onClick={() => setMobileOpen(false)}
            >
              Features
            </Link>
            <Link
              to="/how-it-works"
              className="block text-muted-foreground hover:text-foreground"
              onClick={() => setMobileOpen(false)}
            >
              How It Works
            </Link>
            <Link
              to="/auth"
              className="block px-4 py-2 rounded-lg bg-primary text-white hover:bg-primary/90"
              onClick={() => setMobileOpen(false)}
            >
              Get Started
            </Link>
          </div>
        )}
      </nav>

      {/* Page content */}
      {/*<main className="flex-1">{children}</main>
    </div>
  );
}

export default NavigationWrapper;*/}