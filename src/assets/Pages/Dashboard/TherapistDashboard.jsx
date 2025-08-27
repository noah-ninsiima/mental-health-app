import { Calendar, Clock, DollarSign, MessageCircle } from "lucide-react";

export default function TherapistDashboard() {
  const today = [
    { time: "09:00", client: "Asha N.", type: "Follow-up" },
    { time: "11:30", client: "Brian K.", type: "Initial consult" },
    { time: "15:00", client: "Samuel O.", type: "CBT session" },
  ];
  const metrics = [
    { label: "This week sessions", value: "14" },
    { label: "Pending requests", value: "3" },
    { label: "Earnings (30d)", value: "$1,240" },
  ];

  return (
    <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <header className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-semibold">Therapist Dashboard</h1>
          <p className="text-sm text-muted-foreground">Today’s schedule & requests</p>
        </div>
        <button className="px-3 py-2 rounded-md text-sm therapeutic-gradient text-white">
          Open Calendar
        </button>
      </header>

      {/* Metrics */}
      <section className="grid grid-cols-1 sm:grid-cols-3 gap-4 mt-6">
        {metrics.map((m) => (
          <div key={m.label} className="rounded-xl border border-border/60 p-4 bg-background">
            <p className="text-sm text-muted-foreground">{m.label}</p>
            <p className="text-2xl font-semibold mt-2">{m.value}</p>
          </div>
        ))}
      </section>

      {/* Today’s schedule & inbox */}
      <section className="grid grid-cols-1 lg:grid-cols-2 gap-4 mt-6">
        <div className="rounded-xl border border-border/60 bg-background">
          <div className="p-4 border-b border-border/60 font-medium flex items-center gap-2">
            <Clock className="h-4 w-4" /> Today’s Schedule
          </div>
          <div className="p-4 divide-y divide-border/60">
            {today.map((s, i) => (
              <div key={i} className="py-3 flex items-center justify-between text-sm">
                <div>
                  <p className="font-medium">{s.time} • {s.client}</p>
                  <p className="text-muted-foreground">{s.type}</p>
                </div>
                <button className="px-2 py-1 rounded-md border border-border hover:bg-muted">
                  Notes
                </button>
              </div>
            ))}
          </div>
        </div>

        <div className="rounded-xl border border-border/60 bg-background">
          <div className="p-4 border-b border-border/60 font-medium flex items-center gap-2">
            <MessageCircle className="h-4 w-4" /> Inbox (demo)
          </div>
          <div className="p-4 space-y-3 text-sm">
            <p className="text-muted-foreground">No new messages.</p>
            <button className="px-3 py-2 rounded-md border border-border hover:bg-muted w-fit">
              View all messages
            </button>
          </div>
        </div>
      </section>
    </div>
  );
}
