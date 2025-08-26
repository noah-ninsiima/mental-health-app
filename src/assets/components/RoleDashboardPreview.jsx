import { User, Stethoscope, Shield } from "lucide-react";

const roles = [
  {
    icon: User,
    role: "Youth",
    description: "Track mood, book therapy, and access resources.",
  },
  {
    icon: User,
    role: "Parent/Teacher",
    description: "Guide and support young people's mental health",
  },
  {
    icon: Stethoscope,
    role: "Therapist",
    description: "Manage clients, sessions, and therapy notes.",
  },
  {
    icon: Shield,
    role: "Admin",
    description: "Oversee the platform and analytics securely.",
  },
];

function RoleDashboardPreview() {
  return (
    <section className="py-20 bg-background">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <h2 className="text-3xl sm:text-4xl font-bold mb-4">Choose Your Role</h2>
          <p className="text-lg text-muted-foreground">
            Dashboards are customized for different users of{" "}
            <span className="text-gradient">MindRafiki</span>.
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-8">
          {roles.map((r, index) => (
            <div
              key={index}
              className="p-6 rounded-2xl bg-muted/30 border border-gray-200 hover:shadow-lg transition"
            >
              <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center mb-6">
                <r.icon className="h-6 w-6 text-primary" />
              </div>
              <h3 className="text-xl font-semibold mb-3">{r.role}</h3>
              <p className="text-muted-foreground">{r.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

export default RoleDashboardPreview;