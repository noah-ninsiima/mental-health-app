import { Routes, Route, Navigate } from "react-router-dom";
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
import RequireAuth, { RequireRole } from "./assets/components/auth/Guards.jsx";

export default function App() {
  return (
    <>
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/booking" element={<AppointmentBooking />} />
        <Route path="/chat" element={<Chat />} />
        <Route path="/payments" element={<Payments />} />
        <Route path="/resources" element={<ResourceLibrary />} />
        <Route path="/therapists" element={<TherapistProfiles />} />
        <Route path="/therapists/:id" element={<TherapistDetail />} />
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
        {/* quick sanity route */}
        <Route path="/_sanity" element={<div style={{padding:20}}>OK ✅</div>} />

        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </>
  );
}
