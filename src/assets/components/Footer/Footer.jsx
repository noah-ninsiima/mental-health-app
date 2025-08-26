function Footer() {
  return (
    <footer className="w-full bg-background border-t border-border px-6 py-8">
      <div className="max-w-7xl mx-auto text-center">
        <p className="text-sm text-muted-foreground">
          © {new Date().getFullYear()} MindRafiki. All rights reserved.
        </p>
      </div>
    </footer>
  );
}

export default Footer;