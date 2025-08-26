import { Lightbulb, Calendar, MessageCircle, Heart } from "lucide-react";

const steps = [
  {
    icon: Lightbulb,
    title: "1. Create Your Profile",
    description: "Sign up and complete a brief assessment to help us understand your mental health goals and preferences.",
  },
  {
    icon: Calendar,
    title: "2. Book a Session",
    description: "Choose a licensed therapist and schedule a time that works for you.",
  },
  {
    icon: MessageCircle,
    title: "3. Start Talking",
    description: "Join video, phone, or in-person sessions and begin your journey.",
  },
  {
    icon: Heart,
    title: "4. Track Progress",
    description: "Use tools to monitor mood, habits, and therapy milestones.",
  },
];

function HowItWorks() {
  return (
    <section className="py-20 bg-muted/50 relative overflow-hidden">
      <div className="absolute inset-0 opacity-[0.03] bg-grid-slate-100"></div>
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <h2 className="text-3xl sm:text-4xl font-bold mb-4">How {" "}
                  <span className="text-gradient">MindRafiki</span>{" "}
          Works  
          </h2>
          <p className="text-lg text-muted-foreground">
            Getting started with your mental health journey is simple. 
            Follow these four easy steps to begin accessing personalized care and support.
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
          {steps.map((step, index) => (
            <div
              key={index}
              className="p-6 rounded-2xl bg-background border border-gray-200 hover:shadow-lg transition-shadow"

            >
              <div className="w-12 h-12 rounded-xl therapeutic-gradient flex items-center justify-center mb-6">
                <step.icon className="h-6 w-6 text-white" />
              </div>
              <h3 className="text-xl font-semibold mb-3">{step.title}</h3>
              <p className="text-muted-foreground">{step.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

export default HowItWorks;