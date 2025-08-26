function PageDemo() {
  return (
    <section className="py-20 bg-muted/50">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <h2 className="text-3xl sm:text-4xl font-bold mb-4">Explore the Demo</h2>
        <p className="text-muted-foreground max-w-2xl mx-auto mb-8">
          Try out the demo to see how booking sessions, tracking mood, and accessing
          resources works in <span className="text-gradient">MindRafiki</span>.
        </p>
        <a
          href="/booking"
          className="px-6 py-3 rounded-lg bg-primary text-white font-medium hover:bg-primary/90"
        >
          Book a Demo Session
        </a>
      </div>
    </section>
  );
}

export default PageDemo;