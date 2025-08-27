// src/assets/components/auth/Guards.jsx
import { SignedIn, SignedOut, RedirectToSignIn, useUser } from "@clerk/clerk-react";

const AUTH_ON = false; //const AUTH_ON = String(import.meta.env.VITE_ENABLE_AUTH).toLowerCase() === "true";

/** RequireAuth: if auth is OFF, just render children. */
export default function RequireAuth({ children }) {
  if (!AUTH_ON) return <>{children}</>;

  return (
    <>
      <SignedIn>{children}</SignedIn>
      <SignedOut>
        <RedirectToSignIn />
      </SignedOut>
    </>
  );
}

/** RequireRole: if auth is OFF, just render children. */
export function RequireRole({ allowed, children }) {
  if (!AUTH_ON) return <>{children}</>;

  const { isLoaded, user } = useUser();
  if (!isLoaded) return null;

  const current = user?.publicMetadata?.role;
  const ok = Array.isArray(allowed) ? allowed.includes(current) : current === allowed;

  if (ok) return <>{children}</>;
  return <NotAuthorized />;
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
