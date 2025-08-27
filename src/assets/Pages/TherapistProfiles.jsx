import { useMemo, useState } from "react";
import { Link } from "react-router-dom";
import { Star, Calendar, Video, MapPin, MessageCircle } from "lucide-react";

/**
 * TherapistProfiles
 * - Responsive cards grid with search + filters
 * - Placeholder data; wire to your API later
 * - "Book Session" routes to /booking
 * - "View Profile" routes to /therapists/:id (passing state)
 */
export default function TherapistProfiles() {
  // ---- Placeholder data (replace with API later)
  const THERAPISTS = [
    {
      id: "t1",
      name: "Dr. Sarah Kintu",
      title: "Clinical Psychologist",
      specialties: ["Anxiety", "Trauma", "CBT"],
      rating: 4.9,
      sessions: 320,
      price: 350000,
      mode: ["Online", "In-person"],
      location: "Kampala",
      languages: ["English", "Luganda"],
    },
    {
      id: "t2",
      name: "Michael Obbo",
      title: "Counseling Psychologist",
      specialties: ["Adolescents", "Depression"],
      rating: 4.7,
      sessions: 210,
      price: 250000,
      mode: ["Online"],
      location: "Entebbe",
      languages: ["English"],
    },
    {
      id: "t3",
      name: "Dr. Amina Nankya",
      title: "Psychiatrist",
      specialties: ["Medication Mgmt", "Bipolar", "PTSD"],
      rating: 4.8,
      sessions: 410,
      price: 500000,
      mode: ["In-person", "Online"],
      location: "Jinja",
      languages: ["English", "Lusoga"],
    },
    {
      id: "t4",
      name: "Grace Atwine",
      title: "Family & Marriage Therapist",
      specialties: ["Couples", "Parenting"],
      rating: 4.6,
      sessions: 185,
      price: 300000,
      mode: ["Online"],
      location: "Mbarara",
      languages: ["English", "Runyankore"],
    },
    {
      id: "t5",
      name: "Ivan Musoke",
      title: "Addiction Counselor",
      specialties: ["Addiction", "Relapse Prevention"],
      rating: 4.5,
      sessions: 150,
      price: 280000,
      mode: ["In-person"],
      location: "Kampala",
      languages: ["English", "Luganda"],
    },
    {
      id: "t6",
      name: "Dr. Linda Namatovu",
      title: "Child Psychologist",
      specialties: ["Children", "Behavioral Issues", "School Support"],
      rating: 4.9,
      sessions: 260,
      price: 400000,
      mode: ["Online", "In-person"],
      location: "Mukono",
      languages: ["English", "Luganda"],
    },
  ];

  // ---- Filters
  const [query, setQuery] = useState("");
  const [specialty, setSpecialty] = useState("All");
  const [mode, setMode] = useState("All");
  const [maxPrice, setMaxPrice] = useState(60);

  const specialties = useMemo(() => {
    const s = new Set();
    THERAPISTS.forEach((t) => t.specialties.forEach((x) => s.add(x)));
    return ["All", ...Array.from(s).sort()];
  }, []);

  const filtered = useMemo(() => {
    return THERAPISTS.filter((t) => {
      const q = query.trim().toLowerCase();
      const matchesQuery =
        !q ||
        t.name.toLowerCase().includes(q) ||
        t.title.toLowerCase().includes(q) ||
        t.specialties.some((s) => s.toLowerCase().includes(q)) ||
        t.location.toLowerCase().includes(q);

      const matchesSpecialty = specialty === "All" || t.specialties.includes(specialty);
      const matchesMode = mode === "All" || t.mode.includes(mode);
      const matchesPrice = t.price <= maxPrice;

      return matchesQuery && matchesSpecialty && matchesMode && matchesPrice;
    });
  }, [THERAPISTS, query, specialty, mode, maxPrice]);

  return (
    <div className="min-h-screen">
      {/* Header / Hero */}
      <section className="border-b border-border/40 bg-background/95">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="flex items-start justify-between gap-4 flex-wrap">
            <div>
              <h1 className="text-2xl sm:text-3xl font-semibold">Therapist Profiles</h1>
              <p className="text-sm text-muted-foreground mt-1">
                Browse licensed therapists. Filter by specialty, mode, and price.
              </p>
            </div>
            <Link
              to="/booking"
              className="inline-flex items-center gap-2 px-4 py-2 rounded-md text-sm font-medium therapeutic-gradient text-white hover:opacity-90 transition-opacity duration-200 shadow"
            >
              <Calendar className="h-4 w-4" />
              Book a Session
            </Link>
          </div>

          {/* Filters */}
          <div className="mt-6 grid grid-cols-1 md:grid-cols-4 gap-4">
            <input
              type="text"
              placeholder="Search name, specialty, location…"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              className="w-full px-3 py-2 rounded-md border border-border bg-background outline-none"
            />

            <select
              value={specialty}
              onChange={(e) => setSpecialty(e.target.value)}
              className="w-full px-3 py-2 rounded-md border border-border bg-background"
            >
              {specialties.map((s) => (
                <option key={s} value={s}>
                  {s}
                </option>
              ))}
            </select>

            <select
              value={mode}
              onChange={(e) => setMode(e.target.value)}
              className="w-full px-3 py-2 rounded-md border border-border bg-background"
            >
              {["All", "Online", "In-person"].map((m) => (
                <option key={m} value={m}>
                  {m}
                </option>
              ))}
            </select>

            <div className="flex items-center gap-3">
              <label className="text-sm text-muted-foreground whitespace-nowrap">
                Max Price: UGX {maxPrice}
              </label>
              <input
                type="range"
                min={150000}
                max={1000000}
                step={1}
                value={maxPrice}
                onChange={(e) => setMaxPrice(Number(e.target.value))}
                className="w-full"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Results */}
      <section>
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-8">
          {filtered.length === 0 ? (
            <EmptyState />
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {filtered.map((t) => (
                <TherapistCard key={t.id} therapist={t} />
              ))}
            </div>
          )}
        </div>
      </section>
    </div>
  );
}

function TherapistCard({ therapist }) {
  const { id, name, title, specialties, rating, sessions, price, mode, location, languages } =
    therapist;

  return (
    <div className="rounded-xl border border-border/60 bg-background p-4 shadow-sm hover:shadow transition-shadow duration-200">
      {/* Avatar (initials) */}
      <div className="flex items-center gap-3">
        <div className="w-12 h-12 rounded-full therapeutic-gradient flex items-center justify-center text-white font-semibold">
          {initials(name)}
        </div>
        <div>
          <h3 className="font-medium">{name}</h3>
          <p className="text-sm text-muted-foreground">{title}</p>
        </div>
      </div>

      {/* Chips */}
      <div className="flex flex-wrap gap-2 mt-3">
        {specialties.slice(0, 3).map((s) => (
          <span key={s} className="px-2 py-0.5 text-xs rounded-full border border-border/60">
            {s}
          </span>
        ))}
        {specialties.length > 3 && (
          <span className="px-2 py-0.5 text-xs rounded-full border border-border/60">
            +{specialties.length - 3}
          </span>
        )}
      </div>

      {/* Stats */}
      <div className="mt-4 space-y-2 text-sm">
        <div className="flex items-center gap-2">
          <Star className="h-4 w-4" />
          <span className="font-medium">{rating}</span>
          <span className="text-muted-foreground">({sessions} sessions)</span>
        </div>
        <div className="flex items-center gap-2">
          <MapPin className="h-4 w-4" />
          <span>{location}</span>
        </div>
        <div className="flex items-center gap-2">
          <Video className="h-4 w-4" />
          <span>{mode.join(" • ")}</span>
        </div>
        <div className="flex items-center gap-2">
          <MessageCircle className="h-4 w-4" />
          <span>{languages.join(", ")}</span>
        </div>
      </div>

      {/* Price */}
      <div className="mt-3">
        <p className="text-sm text-muted-foreground">From</p>
        <p className="text-lg font-semibold">UGX {price} / session</p>
      </div>

      {/* Actions */}
      <div className="mt-4 flex items-center gap-2">
        <Link
          to={`/therapists/${id}`}
          state={{ therapist }}
          className="px-3 py-2 rounded-md text-sm border border-border hover:bg-muted"
        >
          View Profile
        </Link>
        <Link
          to="/booking"
          className="px-3 py-2 rounded-md text-sm therapeutic-gradient text-white hover:opacity-90"
        >
          Book Session
        </Link>
      </div>
    </div>
  );
}

function EmptyState() {
  return (
    <div className="border border-dashed border-border rounded-xl p-8 text-center">
      <h3 className="text-lg font-medium">No therapists match your filters</h3>
      <p className="text-sm text-muted-foreground mt-1">
        Try adjusting your search, changing specialty, or increasing max price.
      </p>
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
