import SEO from "@/components/SEO";

export default function Privacy() {
  return (
    <div data-testid="privacy-page">
      <SEO title="Privacy Policy" description="Privacy Policy for EolianVR, Inc. website and services." path="/privacy" />

      <section className="relative pt-32 pb-20 md:pt-40 md:pb-28">
        <div className="absolute inset-0 tactical-grid opacity-20" />
        <div className="relative max-w-[900px] mx-auto px-6 md:px-12">
          <div className="flex items-center gap-3 mb-4">
            <div className="w-8 h-px bg-[#FF0B1B]" />
            <span className="font-mono text-xs tracking-[0.2em] text-zinc-500 uppercase">Legal // Privacy</span>
          </div>
          <h1 className="font-heading text-4xl sm:text-5xl font-black uppercase tracking-tighter text-white leading-[0.95]">
            Privacy Policy
          </h1>
          <p className="mt-4 font-mono text-xs text-zinc-500 tracking-wider">Content coming soon.</p>
        </div>
      </section>

      <section className="pb-20 md:pb-28">
        <div className="max-w-[900px] mx-auto px-6 md:px-12">
          <p className="text-sm text-zinc-400 leading-relaxed">
            The Privacy Policy for EolianVR, Inc. will be published here shortly. Please check back soon or <a href="mailto:mike@eolianvr.com" className="text-[#FF0B1B] hover:text-white transition-colors">contact us</a> for questions.
          </p>
        </div>
      </section>
    </div>
  );
}
