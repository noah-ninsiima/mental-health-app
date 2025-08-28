import { useMemo, useState } from "react";

/**
 * Booking via Google Appointment Schedules
 * - Shows therapists and their Google booking links
 * - Clicking "Book via Google" opens the therapist’s Appointment Schedule page
 * - No OAuth or backend needed; Google handles conflicts/timezone/invites
 *
 * How to add links:
 * - Each therapist needs a "Share booking page" URL from Google Calendar → Appointment schedules.
 * - Store those links in this THERAPISTS array for now (later: in Strapi under therapist.gcalBookingUrl).
 */

const THERAPISTS = [
  {
    id: "t1",
    name: "Dr. Sarah Kintu",
    title: "Clinical Psychologist",
    location: "Kampala",
    gcalBookingUrl: "https://calendar.app.google/WF7ot3rTXXCHcNmy7", // e.g. "https://calendar.google.com/calendar/u/0/appointments/schedules/.../bookings/..."
  },
  {
    id: "t2",
    name: "Michael Obbo",
    title: "Counseling Psychologist",
    location: "Entebbe",
    gcalBookingUrl: "",
  },
  {
    id: "t3",
    name: "Dr. Amina Nankya",
    title: "Psychiatrist",
    location: "Jinja",
    gcalBookingUrl: "",
  },
  {
    id: "t4",
    name: "Grace Atwine",
    title: "Family & Marriage Therapist",
    location: "Mbarara",
    gcalBookingUrl: "",
  },
  {
    id: "t5",
    name: "Ivan Musoke",
    title: "Addiction Counselor",
    location: "Kampala",
    gcalBookingUrl: "",
  },
  {
    id: "t6",
    name: "Dr. Linda Namatovu",
    title: "Child Psychologist",
    location: "Mukono",
    gcalBookingUrl: "",
  },
];

export default function AppointmentBooking() {
  const [query, setQuery] = useState("");

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();
    if (!q) return THERAPISTS;
    return THERAPISTS.filter(
      (t) =>
        t.name.toLowerCase().includes(q) ||
        t.title.toLowerCase().includes(q) ||
        t.location.toLowerCase().includes(q)
    );
  }, [query]);

  function openGoogle(url) {
    if (!url) {
      alert(
        "This therapist hasn’t provided a Google booking link yet. Ask the team to add their Appointment Schedule link."
      );
      return;
    }
    const safe = normalizeScheduleUrl(url);
    window.open(safe, "_blank", "noopener,noreferrer");
  }

  return (
    <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <header className="flex items-start justify-between gap-4 flex-wrap">
        <div>
          <h1 className="text-2xl font-semibold">Book a Session</h1>
          <p className="text-sm text-muted-foreground mt-1">
            Choose a therapist and book directly on Google Calendar (Appointment Schedules).
          </p>
        </div>
      </header>

      {/* Info banner */}
      <div className="mt-4 rounded-lg border border-border/60 bg-background p-4">
        <h3 className="font-medium">How this works</h3>
        <ul className="mt-2 text-sm list-disc pl-5 space-y-1 text-muted-foreground">
          <li>Google shows real availability and handles time zones and reminders.</li>
          <li>The therapist receives the booking automatically on their calendar.</li>
          <li>No login required for you; bookings open in a new tab on google.com.</li>
        </ul>
      </div>

      {/* Search */}
      <div className="mt-6">
        <input
          type="text"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="Search therapist, specialty, or location…"
          className="w-full px-3 py-2 rounded-md border border-border bg-background outline-none"
        />
      </div>

      {/* Grid */}
      <section className="mt-6 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {filtered.map((t) => (
          <article
            key={t.id}
            className="rounded-xl border border-border/60 bg-background p-4 shadow-sm"
          >
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-full therapeutic-gradient text-white font-semibold flex items-center justify-center">
                {initials(t.name)}
              </div>
              <div>
                <h3 className="font-medium">{t.name}</h3>
                <p className="text-sm text-muted-foreground">{t.title}</p>
                <p className="text-xs text-muted-foreground">{t.location}</p>
              </div>
            </div>

            <div className="mt-4 flex flex-wrap gap-2">
              <button
                type="button"
                onClick={() => openGoogle(t.gcalBookingUrl)}
                className="px-3 py-2 rounded-md text-sm therapeutic-gradient text-white hover:opacity-90"
              >
                Book via Google
              </button>

              {!t.gcalBookingUrl && (
                <span className="text-xs text-muted-foreground">
                  Link missing — add their Appointment Schedule URL.
                </span>
              )}
            </div>
          </article>
        ))}
      </section>

      {/* Optional fallback banner */}
      <div className="mt-6 text-xs text-muted-foreground">
        Don’t use Google? We can enable our in-app booking as a fallback later.
      </div>
    </div>
  );
}

function initials(name) {
  return name
    .split(" ")
    .map((n) => n[0])
    .slice(0, 2)
    .join("")
    .toUpperCase();
}

function normalizeScheduleUrl(url) {
  if (!url) return "";
  if (/^https?:\/\//i.test(url)) return url;
  return `https://${url}`;
}
