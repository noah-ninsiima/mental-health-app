import { Link, useLocation, useParams } from "react-router-dom";

export default function TherapistDetail() {
  const { id } = useParams();
  const { state } = useLocation();
  const t = state?.therapist; // passed from the list via Link state

  return (
    <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <Link to="/therapists" className="text-sm underline">&larr; Back to list</Link>

      {!t ? (
        <div className="mt-4">
          <h1 className="text-2xl font-semibold">Therapist #{id}</h1>
          <p className="text-muted-foreground mt-1">
            Opened directly. Full details will load once API is connected.
          </p>
        </div>
      ) : (
        <div className="mt-4">
          <h1 className="text-2xl font-semibold">{t.name}</h1>
          <p className="text-muted-foreground">{t.title}</p>

          <div className="mt-4 grid gap-3 text-sm">
            <div><span className="font-medium">Specialties:</span> {t.specialties.join(", ")}</div>
            <div><span className="font-medium">Location:</span> {t.location}</div>
            <div><span className="font-medium">Languages:</span> {t.languages.join(", ")}</div>
            <div><span className="font-medium">Mode:</span> {t.mode.join(" • ")}</div>
            <div><span className="font-medium">Rating:</span> {t.rating} ({t.sessions} sessions)</div>
            <div><span className="font-medium">Price:</span> UGX {t.price} / session</div>
          </div>

          <div className="mt-6 flex items-center gap-2">
            <Link
              to="/booking"
              className="px-3 py-2 rounded-md text-sm therapeutic-gradient text-white hover:opacity-90"
            >
              Book Session
            </Link>
            <Link
              to="/therapists"
              className="px-3 py-2 rounded-md text-sm border border-border hover:bg-muted"
            >
              Back to List
            </Link>
          </div>
        </div>
      )}
    </div>
  );
}
