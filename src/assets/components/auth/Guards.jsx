import { SignedIn, SignedOut, RedirectToSignIn, useUser } from "@clerk/clerk-react";
import { Navigate } from "react-router-dom";

const AUTH_ON = String(import.meta.env.VITE_ENABLE_AUTH).toLowerCase() === "true";

export default function RequireAuth({ children }) {
  if (!AUTH_ON) return <>{children}</>;
  return (
    <>
      <SignedIn>{children}</SignedIn>
      <SignedOut>
        <RedirectToSignIn redirectUrl={window.location.pathname} />
      </SignedOut>
    </>
  );
}
export function RequireRole({ allowed, children }) {
  if (!AUTH_ON) return <>{children}</>;

  const { isLoaded, user } = useUser();
  if (!isLoaded) return null;

  const role = user?.publicMetadata?.role;

   if (!role) return <Navigate to="/onboarding" replace />;

  const ok = Array.isArray(allowed) ? allowed.includes(role) : role === allowed;
  return ok ? <>{children}</> : <NotAuthorized />;
}

export function NotAuthorized() {
  return (
    <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <h1 className="text-2xl font-semibold">Not authorized</h1>
      <p className="text-sm text-muted-foreground mt-2">
        You’re signed in, but your account doesn’t have access to this area.
      </p>
    </div>
  );
}
