import { Link } from "react-router-dom";
import { SignedIn, SignedOut, SignInButton, useUser } from "@clerk/clerk-react";

import HeroSection from "../components/HeroSection.jsx";
import KeyFeatures from "../components/KeyFeatures.jsx";
import HowItWorks from "../components/HowItWorks.jsx";
import CallToAction from "../components/CallToAction.jsx";
import RoleDashboardPreview from "../components/RoleDashboardPreview.jsx";
import Footer from "../components/Footer/Footer.jsx";

const DASH_FOR = {
  admin: "/dashboard/admin",
  guardian: "/dashboard/guardian",
  therapist: "/dashboard/therapist",
  youth: "/dashboard/youth",
};

export default function Home() {
  const { user } = useUser();
  const role = user?.publicMetadata?.role;
  const dashPath = role ? (DASH_FOR[role] || "/onboarding") : "/onboarding";

  return (
    <div className="min-h-screen flex flex-col">
      <main className="flex-1">
        <HeroSection />

        {/* Role-aware quick actions */}
        <section className="border-y border-border/60 bg-background/80">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-6">
            <div className="flex flex-col md:flex-row items-center justify-between gap-3">
              <p className="text-sm text-muted-foreground">
                Book a session, explore therapists, or jump into your dashboard.
              </p>

              <div className="flex flex-wrap items-center gap-2">
                <Link
                  to="/booking"
                  className="px-3 py-2 rounded-md text-sm therapeutic-gradient text-white"
                >
                  Book Session
                </Link>
                <Link
                  to="/therapists"
                  className="px-3 py-2 rounded-md text-sm border border-border hover:bg-muted"
                >
                  Browse Therapists
                </Link>

                <SignedOut>
                  <SignInButton mode="modal">
                    <button className="px-3 py-2 rounded-md text-sm border border-border hover:bg-muted">
                      Sign in
                    </button>
                  </SignInButton>
                  <Link
                    to="/sign-up"
                    className="px-3 py-2 rounded-md text-sm border border-border hover:bg-muted"
                  >
                    Create account
                  </Link>
                </SignedOut>

                <SignedIn>
                  <Link
                    to={dashPath}
                    className="px-3 py-2 rounded-md text-sm border border-border hover:bg-muted"
                  >
                    {role ? `Go to ${capitalize(role)} Dashboard` : "Complete Onboarding"}
                  </Link>
                </SignedIn>
              </div>
            </div>
          </div>
        </section>

        <KeyFeatures />
        <HowItWorks />
        <RoleDashboardPreview />
        <CallToAction />
      </main>

      <Footer />
    </div>
  );
}

function capitalize(s) {
  return typeof s === "string" ? s.charAt(0).toUpperCase() + s.slice(1) : s;
}
