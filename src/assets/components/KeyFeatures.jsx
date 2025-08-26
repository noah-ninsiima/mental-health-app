import { Brain, ChartBar, FileText, Shield, Users } from "lucide-react";

const features = [
  {
    icon: Brain,
    title: "Licensed Therapists",
    description: "Connect with certified mental health professionals through secure video calls, voice sessions, or messaging. Choose the format that works best for you.",
  },
  {
    icon: ChartBar,
    title: "Mood Tracking",
    description: "Track your emotional well-being with daily mood logs, journal entries, and visual progress charts. Identify patterns and celebrate improvements.",
  },
  {
    icon: FileText,
    title: "Resources Library",
    description: "Access a comprehensive collection of articles, videos, worksheets, and guided exercises created by mental health experts.",
  },
  {
    icon: Shield,
    title: "Private & Secure",
    description: "Your sessions are encrypted and confidential.",
  },
  {
    icon: Users,
    title: "Community Support",
    description: "Join support groups and connect with others on the journey.",
  },
];

function KeyFeatures() {
  return (
    <section className="py-20 bg-background relative">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <h2 className="text-3xl sm:text-4xl font-bold mb-4">Everything You Need for your{" "}
                  <span className="text-gradient">Mental Wellness</span>{" "}</h2>
          <p className="text-lg text-muted-foreground">
            Comprehensive tools and support designed to help you build resilience, track progress, and maintain your mental health journey.
            </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {features.map((feature, index) => (
            <div
              key={index}
              className="p-6 rounded-2xl bg-muted/30 border border-gray-200 hover:shadow-md transition"
            >
              <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center mb-6">
                <feature.icon className="h-6 w-6 text-primary" />
              </div>
              <h3 className="text-xl font-semibold mb-3">{feature.title}</h3>
              <p className="text-muted-foreground">{feature.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

export default KeyFeatures;