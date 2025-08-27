import { Calendar, ShieldCheck, MessageCircle } from "lucide-react";

export default function GuardianDashboard() {
  const children = [
    { name: "Asha", age: 12, focus: "Anxiety support" },
    { name: "Brian", age: 9, focus: "School adjustment" },
  ];
  const upcoming = [
    { child: "Asha", therapist: "Dr. Kintu", date: "Aug 29, 10:00" },
    { child: "Brian", therapist: "G. Atwine", date: "Sep 1, 14:30" },
  ];

  return (
    <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <header>
        <h1 className="text-2xl font-semibold">Guardian Dashboard</h1>
        <p className="text-sm text-muted-foreground">
          Manage your dependents, track sessions, and message therapists.
        </p>
      </header>

      {/* Quick actions */}
      <section className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-6">
        <button className="rounded-xl border border-border/60 p-4 text-left hover:bg-muted">
          <ShieldCheck className="h-5 w-5 mb-2" />
          <p className="font-medium">Add Dependent</p>
          <p className="text-sm text-muted-foreground">Create a new child profile</p>
        </button>
        <button className="rounded-xl border border-border/60 p-4 text-left hover:bg-muted">
          <Calendar className="h-5 w-5 mb-2" />
          <p className="font-medium">Book Session</p>
          <p className="text-sm text-muted-foreground">Schedule with a therapist</p>
        </button>
        <button className="rounded-xl border border-border/60 p-4 text-left hover:bg-muted">
          <MessageCircle className="h-5 w-5 mb-2" />
          <p className="font-medium">Messages</p>
          <p className="text-sm text-muted-foreground">View secure messages</p>
        </button>
      </section>

      {/* Children & upcoming */}
      <section className="grid grid-cols-1 lg:grid-cols-2 gap-4 mt-6">
        <div className="rounded-xl border border-border/60 bg-background">
          <div className="p-4 border-b border-border/60 font-medium">Children</div>
          <div className="p-4 divide-y divide-border/60">
            {children.map((c) => (
              <div key={c.name} className="py-3">
                <p className="font-medium">{c.name} • {c.age}</p>
                <p className="text-sm text-muted-foreground">{c.focus}</p>
              </div>
            ))}
          </div>
        </div>

        <div className="rounded-xl border border-border/60 bg-background">
          <div className="p-4 border-b border-border/60 font-medium">Upcoming Sessions</div>
          <div className="p-4 divide-y divide-border/60">
            {upcoming.map((u, i) => (
              <div key={i} className="py-3 flex items-center justify-between text-sm">
                <div>
                  <p className="font-medium">{u.child}</p>
                  <p className="text-muted-foreground">{u.therapist}</p>
                </div>
                <span className="text-muted-foreground">{u.date}</span>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
