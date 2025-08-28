import { useEffect, useState } from "react";
import { useUser } from "@clerk/clerk-react";
import { useNavigate } from "react-router-dom";

const DASH_FOR = {
  admin: "/dashboard/admin",
  guardian: "/dashboard/guardian",
  therapist: "/dashboard/therapist",
  youth: "/dashboard/youth",
};

export default function Onboarding() {
  const { isLoaded, isSignedIn, user } = useUser();
  const navigate = useNavigate();
  const [role, setRole] = useState("");
  const [saving, setSaving] = useState(false);
  const currentRole = user?.publicMetadata?.role;

  
  useEffect(() => {
    if (!isLoaded || !isSignedIn) return;
    if (currentRole && DASH_FOR[currentRole]) {
      navigate(DASH_FOR[currentRole], { replace: true });
    }
  }, [isLoaded, isSignedIn, currentRole, navigate]);

  if (!isLoaded) return null;

  async function save() {
    if (!role) {
      alert("Please select a role to continue.");
      return;
    }
    try {
      setSaving(true);
      
      await user.update({
        publicMetadata: { ...(user.publicMetadata || {}), role },
      });
      
      await user.reload();
      
      navigate(DASH_FOR[role], { replace: true });
    } catch (e) {
      console.error(e);
      alert("Could not save role. Please try again.");
    } finally {
      setSaving(false);
    }
  }

  return (
    <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <h1 className="text-2xl font-semibold">Welcome! Choose your role</h1>
      <p className="text-sm text-muted-foreground mt-1">
        This helps us route you to the right dashboard.
      </p>

      <div className="mt-6 grid grid-cols-1 md:grid-cols-4 gap-4">
        <RoleCard
          label="Youth (13–25)"
          value="youth"
          desc="Personalized resources and direct support."
          selected={role === "youth"}
          onSelect={() => setRole("youth")}
        />
        <RoleCard
          label="Parent/Teacher"
          value="guardian"
          desc="Book and manage sessions for dependents."
          selected={role === "guardian"}
          onSelect={() => setRole("guardian")}
        />
        <RoleCard
          label="Licensed Therapist"
          value="therapist"
          desc="Manage availability, sessions, and notes."
          selected={role === "therapist"}
          onSelect={() => setRole("therapist")}
        />
        <RoleCard
          label="Administrator"
          value="admin"
          desc="Oversee users, therapists, and reports."
          selected={role === "admin"}
          onSelect={() => setRole("admin")}
        />
      </div>

      <div className="mt-6 flex items-center gap-2">
        <button
          onClick={save}
          disabled={saving}
          className="px-4 py-2 rounded-md therapeutic-gradient text-white disabled:opacity-60"
        >
          {saving ? "Saving…" : "Save & Continue"}
        </button>
      </div>
    </div>
  );
}

function RoleCard({ label, desc, selected, onSelect }) {
  return (
    <button
      type="button"
      onClick={onSelect}
      className={`text-left rounded-xl border p-4 bg-background transition ${
        selected ? "border-primary ring-2 ring-primary/30" : "border-border/60 hover:bg-muted"
      }`}
    >
      <div className="flex items-center justify-between">
        <h3 className="font-medium">{label}</h3>
        <span
          className={`h-4 w-4 rounded-full border ${
            selected ? "bg-primary border-primary" : "border-border"
          }`}
        />
      </div>
      <p className="text-sm text-muted-foreground mt-2">{desc}</p>
    </button>
  );
}
