import { Users, UserCog, Calendar,DollarSign, Activity } from "lucide-react";

export default function AdminDashboard() {
  const stats = [
    { label: "Total Users", value: "12,430", icon: Users },
    { label: "Therapists", value: "214", icon: UserCog },
    { label: "Sessions (30d)", value: "1,287", icon: Calendar },
    { label: "Revenue (30d)", value: "UGx 500,000", icon: DollarSign },
  ];

  const recent = [
    { email: "sarah@example.com", role: "Therapist", date: "Aug 20" },
    { email: "ivan@example.com", role: "User", date: "Aug 20" },
    { email: "grace@example.com", role: "Therapist", date: "Aug 19" },
    { email: "james@example.com", role: "User", date: "Aug 18" },
  ];

  return (
    <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <header className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-semibold">Admin Dashboard</h1>
          <p className="text-sm text-muted-foreground">Overview & management</p>
        </div>
        <button className="px-3 py-2 rounded-md text-sm therapeutic-gradient text-white">
          New Announcement
        </button>
      </header>

      {/* Stats */}
      <section className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mt-6">
        {stats.map(({ label, value, icon: Icon }) => (
          <div key={label} className="rounded-xl border border-border/60 p-4 bg-background">
            <div className="flex items-center justify-between">
              <p className="text-sm text-muted-foreground">{label}</p>
              <Icon className="h-4 w-4" />
            </div>
            <p className="text-2xl font-semibold mt-2">{value}</p>
          </div>
        ))}
      </section>

      {/* Recent signups */}
      <section className="mt-6 rounded-xl border border-border/60 bg-background">
        <div className="flex items-center justify-between p-4 border-b border-border/60">
          <h2 className="font-medium flex items-center gap-2">
            <Activity className="h-4 w-4" /> Recent Signups
          </h2>
          <button className="text-sm underline">View all</button>
        </div>
        <div className="divide-y divide-border/60">
          {recent.map((r, i) => (
            <div key={i} className="p-4 flex items-center justify-between text-sm">
              <div>
                <p className="font-medium">{r.email}</p>
                <p className="text-muted-foreground">{r.role}</p>
              </div>
              <span className="text-muted-foreground">{r.date}</span>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}
