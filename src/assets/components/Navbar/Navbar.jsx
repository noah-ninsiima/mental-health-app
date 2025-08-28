import { useState } from "react";
import { Link } from "react-router-dom";
import { Menu, X, Heart, Calendar } from "lucide-react";
import { SignedIn, SignedOut, SignInButton, UserButton, useUser } from "@clerk/clerk-react";

const AUTH_ON = String(import.meta.env.VITE_ENABLE_AUTH).toLowerCase() === "true";
const ROLE_BADGE = {
  admin:     { label: "Administrator",      classes: "bg-orange-50 text-orange-700 ring-1 ring-orange-200" },
  guardian:  { label: "Parent/Teacher",     classes: "bg-emerald-50 text-emerald-700 ring-1 ring-emerald-200" },
  therapist: { label: "Licensed Therapist", classes: "bg-violet-50 text-violet-700 ring-1 ring-violet-200" },
  youth:     { label: "Youth (13–25)",      classes: "bg-blue-50 text-blue-700 ring-1 ring-blue-200" },
};


function RoleBadge({ role, mobile = false }) {
  if (!role || !ROLE_BADGE[role]) return null;
  const { label, classes } = ROLE_BADGE[role];
  const base =
    "inline-flex items-center rounded-full px-3 py-1 text-xs font-medium " +
    "hover:opacity-90 transition";
  const mobileExtra = mobile ? " max-w-[70%] truncate" : "";
  return (
    <Link to={`/dashboard/${role}`} className={`${base} ${classes}${mobileExtra}`}>
      {label}
    </Link>
  );
}

function Navbar() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const { user } = useUser();
  const role = user?.publicMetadata?.role;

  const closeMobile = () => setIsMenuOpen(false);

  const DashboardLinks = () => {
    if (!AUTH_ON) {
      return (
        <>
          <Link to="/dashboard/admin" className="text-sm font-medium text-foreground hover:text-primary">Admin</Link>
          <Link to="/dashboard/guardian" className="text-sm font-medium text-foreground hover:text-primary">Guardian</Link>
          <Link to="/dashboard/therapist" className="text-sm font-medium text-foreground hover:text-primary">Therapist</Link>
          <Link to="/dashboard/youth" className="text-sm font-medium text-foreground hover:text-primary">Youth</Link>
        </>
      );
    }
    return (
      <SignedIn>
        {role === "admin" && (
          <Link to="/dashboard/admin" className="text-sm font-medium text-foreground hover:text-primary">Admin</Link>
        )}
        {role === "guardian" && (
          <Link to="/dashboard/guardian" className="text-sm font-medium text-foreground hover:text-primary">Guardian</Link>
        )}
        {role === "therapist" && (
          <Link to="/dashboard/therapist" className="text-sm font-medium text-foreground hover:text-primary">Therapist</Link>
        )}
        {role === "youth" && (
  <Link to="/dashboard/youth" className="text-sm font-medium text-foreground hover:text-primary">
    Youth
  </Link>
)}

      </SignedIn>
    );
  };

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
              <Link to="/" className="text-sm font-medium text-foreground hover:text-primary transition-colors duration-200">
                Home
              </Link>
              <Link to="/booking" className="text-sm font-medium text-foreground hover:text-primary transition-colors duration-200 flex items-center gap-1">
                <Calendar className="h-3 w-3" />
                Book Session
              </Link>
              <Link to="/resources" className="text-sm font-medium text-foreground hover:text-primary transition-colors duration-200">
                Resources
              </Link>
              <Link to="/chat" className="text-sm font-medium text-foreground hover:text-primary transition-colors duration-200">
                Support Chat
              </Link>
              <Link to="/therapists" className="text-sm font-medium text-foreground hover:text-primary transition-colors duration-200">
                Therapists
              </Link>

              
            </nav>

            {/* Desktop Auth controls */}
            <div className="hidden md:flex items-center gap-2">
  <SignedOut>
    <SignInButton mode="modal" afterSignInUrl="/onboarding">
      <button className="px-3 py-2 rounded-md text-sm border border-border hover:bg-muted">
        Sign in
      </button>
    </SignInButton>
    <Link to="/sign-up" className="px-3 py-2 rounded-md text-sm therapeutic-gradient text-white">
      Create account
    </Link>
  </SignedOut>
  <SignedIn>
  <div className="flex items-center gap-2">
    <UserButton afterSignOutUrl="/" />
    <RoleBadge role={role} />
  </div>
</SignedIn>

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
                <Link to="/" onClick={closeMobile} className="text-sm font-medium text-foreground hover:text-primary py-2 text-left">
                  Home
                </Link>
                <Link to="/booking" onClick={closeMobile} className="text-sm font-medium text-foreground hover:text-primary py-2 text-left flex items-center gap-2">
                  <Calendar className="h-4 w-4" />
                  Book Session
                </Link>
                <Link to="/resources" onClick={closeMobile} className="text-sm font-medium text-foreground hover:text-primary py-2 text-left">
                  Resources
                </Link>
                <Link to="/chat" onClick={closeMobile} className="text-sm font-medium text-foreground hover:text-primary py-2 text-left">
                  Support Chat
                </Link>
                <Link to="/therapists" onClick={closeMobile} className="text-sm font-medium text-foreground hover:text-primary py-2 text-left">
                  Therapists
                </Link>

                {/* Role-aware dashboard links */}
                <div className="pt-2">
                  <DashboardLinks />
                </div>
              </nav>

              {/* Mobile Auth controls */}
              <div className="border-t border-border/60 mt-4 pt-4">
  <SignedOut>
    <SignInButton mode="modal" afterSignInUrl="/onboarding">
      <button
        className="w-full px-3 py-2 rounded-md text-sm border border-border hover:bg-muted"
        onClick={() => setIsMenuOpen(false)}   
      >
        Sign in
      </button>
    </SignInButton>
    <Link
      to="/sign-up"
      className="mt-2 inline-block w-full text-center px-3 py-2 rounded-md text-sm therapeutic-gradient text-white"
      onClick={() => setIsMenuOpen(false)}
    >
      Create account
    </Link>
  </SignedOut>

  <SignedIn>
  <div className="flex items-center justify-between">
    <RoleBadge role={role} mobile />
    <UserButton afterSignOutUrl="/" />
  </div>
</SignedIn>

</div>

            </div>
          )}
        </div>
      </header>
    </>
  );
}

export default Navbar;
