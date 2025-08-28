import { Routes, Route, Navigate, useLocation } from "react-router-dom";
import Navbar from "./assets/components/Navbar/Navbar.jsx";

import Home from "./assets/Pages/Home.jsx";
import AppointmentBooking from "./assets/Pages/AppointmentBooking.jsx";
import Chat from "./assets/Pages/Chat.jsx";
import Payments from "./assets/Pages/Payments.jsx";
import ResourceLibrary from "./assets/Pages/ResourceLibrary.jsx";
import TherapistProfiles from "./assets/Pages/TherapistProfiles.jsx";
import TherapistDetail from "./assets/Pages/TherapistDetail.jsx";

import AdminDashboard from "./assets/Pages/Dashboard/AdminDashboard.jsx";
import GuardianDashboard from "./assets/Pages/Dashboard/GuardianDashboard.jsx";
import TherapistDashboard from "./assets/Pages/Dashboard/TherapistDashboard.jsx";
import YouthDashboard from "./assets/Pages/Dashboard/YouthDashboard.jsx";

import RequireAuth, { RequireRole } from "./assets/components/auth/Guards.jsx";
import Onboarding from "./assets/Pages/Onboarding.jsx";

import { SignIn, SignUp, UserProfile, useUser } from "@clerk/clerk-react";



function RedirectIfSignedIn({ children }) {
  const { isLoaded, isSignedIn } = useUser();
  const location = useLocation();
  if (!isLoaded) return null;
  if (isSignedIn) return <Navigate to="/onboarding" replace state={{ from: location }} />;
  return children;
}
export default function App() {
  return (
    <>
      <Navbar />
      <Routes>
        {/* Public */}
        <Route path="/" element={<Home />} />
        <Route path="/booking" element={<AppointmentBooking />} />
        <Route path="/chat" element={<Chat />} />
        <Route path="/payments" element={<Payments />} />
        <Route path="/resources" element={<ResourceLibrary />} />
        <Route path="/therapists" element={<TherapistProfiles />} />
        <Route path="/therapists/:id" element={<TherapistDetail />} />

        {/* Onboarding (signed-in required) */}
        <Route
          path="/onboarding"
          element={
            <RequireAuth>
              <Onboarding />
            </RequireAuth>
          }
        />

        {/* Auth UIs */}
        <Route
  path="/sign-in"
  element={
    <RedirectIfSignedIn>
      <SignIn routing="path" path="/sign-in" signUpUrl="/sign-up" afterSignInUrl="/onboarding" />
    </RedirectIfSignedIn>
  }
/>

<Route
  path="/sign-up"
  element={
    <RedirectIfSignedIn>
      <SignUp routing="path" path="/sign-up" signInUrl="/sign-in" afterSignUpUrl="/onboarding" />
    </RedirectIfSignedIn>
  }
/>

        <Route
          path="/account"
          element={
            <RequireAuth>
              <UserProfile path="/account" routing="path" />
            </RequireAuth>
          }
        />

        {/* Dashboards (protected + role-based) */}
        <Route
  path="/dashboard/youth"
  element={
    <RequireAuth>
      <RequireRole allowed="youth">
        <YouthDashboard />
      </RequireRole>
    </RequireAuth>
  }
/>

        <Route
          path="/dashboard/admin"
          element={
            <RequireAuth>
              <RequireRole allowed="admin">
                <AdminDashboard />
              </RequireRole>
            </RequireAuth>
          }
        />
        <Route
          path="/dashboard/guardian"
          element={
            <RequireAuth>
              <RequireRole allowed="guardian">
                <GuardianDashboard />
              </RequireRole>
            </RequireAuth>
          }
        />
        <Route
          path="/dashboard/therapist"
          element={
            <RequireAuth>
              <RequireRole allowed="therapist">
                <TherapistDashboard />
              </RequireRole>
            </RequireAuth>
          }
        />

        {/* Sanity & catch-all */}
        <Route path="/_sanity" element={<div style={{ padding: 20 }}>OK ✅</div>} />
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </>
  );
}
