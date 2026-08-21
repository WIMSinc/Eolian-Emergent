import { pageMetadata } from "@/lib/seo";

export const metadata = pageMetadata({
  title: "Privacy Policy",
  description: "Privacy Policy for EolianVR, Inc. \u2014 how we collect, use, disclose, and safeguard your information.",
  path: "/privacy",
});


export default function Page() {
  return (
    <div data-testid="privacy-page">
      <section className="relative pt-32 pb-20 md:pt-40 md:pb-28">
        <div className="absolute inset-0 tactical-grid opacity-20" />
        <div className="relative max-w-[900px] mx-auto px-6 md:px-12">
          <div className="flex items-center gap-3 mb-4">
            <div className="w-8 h-px bg-[#FF0B1B]" />
            <span className="font-mono text-xs tracking-[0.2em] text-zinc-400 uppercase">Legal // Privacy</span>
          </div>
          <h1 className="font-heading text-4xl sm:text-5xl font-black uppercase tracking-tighter text-white leading-[0.95]">
            Privacy Policy
          </h1>
          <p className="mt-4 font-mono text-xs text-zinc-500 tracking-wider">Effective Date: May 8, 2026</p>
        </div>
      </section>

      <section className="pb-20 md:pb-28">
        <div className="max-w-[900px] mx-auto px-6 md:px-12 space-y-10">
          <p className="text-sm text-zinc-400 leading-relaxed">
            EolianVR, Inc. ("Eolian," "we," "our," or "us") respects your privacy and is committed to protecting personal information in accordance with applicable U.S. privacy laws and international best practices.
          </p>
          <div>
            <p className="text-sm text-zinc-400 leading-relaxed mb-2">This Privacy Policy explains how we collect, use, disclose, and safeguard information when you interact with:</p>
            <ul className="list-disc list-inside text-sm text-zinc-400 leading-relaxed space-y-1 ml-2">
              <li>our websites,</li>
              <li>software platforms,</li>
              <li>demos,</li>
              <li>communications,</li>
              <li>events,</li>
              <li>applications,</li>
              <li>and related services.</li>
            </ul>
          </div>

          <div>
            <h2 className="font-heading text-lg font-bold text-white uppercase tracking-wide mb-3">1. Information We Collect</h2>
            <p className="text-sm text-zinc-400 leading-relaxed mb-3">We may collect:</p>
            <h3 className="font-heading text-sm font-semibold text-zinc-300 uppercase tracking-wide mb-2">Personal Information</h3>
            <ul className="list-disc list-inside text-sm text-zinc-400 leading-relaxed space-y-1 ml-2 mb-4">
              <li>Name</li>
              <li>Email address</li>
              <li>Phone number</li>
              <li>Company/organization</li>
              <li>Job title</li>
              <li>Billing/contact information</li>
            </ul>
            <h3 className="font-heading text-sm font-semibold text-zinc-300 uppercase tracking-wide mb-2">Technical Information</h3>
            <ul className="list-disc list-inside text-sm text-zinc-400 leading-relaxed space-y-1 ml-2 mb-4">
              <li>IP address</li>
              <li>Browser type</li>
              <li>Device identifiers</li>
              <li>Operating system</li>
              <li>Website activity</li>
              <li>Referral URLs</li>
              <li>Cookie identifiers</li>
            </ul>
            <h3 className="font-heading text-sm font-semibold text-zinc-300 uppercase tracking-wide mb-2">Business & Government Inquiry Information</h3>
            <ul className="list-disc list-inside text-sm text-zinc-400 leading-relaxed space-y-1 ml-2 mb-4">
              <li>Procurement inquiries</li>
              <li>Proposal submissions</li>
              <li>Partnership discussions</li>
              <li>Demo requests</li>
              <li>Investor inquiries</li>
            </ul>
            <h3 className="font-heading text-sm font-semibold text-zinc-300 uppercase tracking-wide mb-2">Platform Usage Data</h3>
            <p className="text-sm text-zinc-400 leading-relaxed mb-2">Where applicable, software platforms may collect operational telemetry, diagnostics, logs, and user interaction data for:</p>
            <ul className="list-disc list-inside text-sm text-zinc-400 leading-relaxed space-y-1 ml-2">
              <li>security,</li>
              <li>support,</li>
              <li>analytics,</li>
              <li>and platform improvement.</li>
            </ul>
          </div>

          <div>
            <h2 className="font-heading text-lg font-bold text-white uppercase tracking-wide mb-3">2. How We Use Information</h2>
            <p className="text-sm text-zinc-400 leading-relaxed mb-2">We may use information to:</p>
            <ul className="list-disc list-inside text-sm text-zinc-400 leading-relaxed space-y-1 ml-2">
              <li>provide and improve Services;</li>
              <li>respond to inquiries;</li>
              <li>conduct demonstrations;</li>
              <li>support government or enterprise engagements;</li>
              <li>process transactions;</li>
              <li>maintain cybersecurity;</li>
              <li>detect fraud or misuse;</li>
              <li>comply with legal obligations;</li>
              <li>conduct analytics and performance optimization;</li>
              <li>support research and development.</li>
            </ul>
          </div>

          <div>
            <h2 className="font-heading text-lg font-bold text-white uppercase tracking-wide mb-3">3. Cookies & Tracking Technologies</h2>
            <p className="text-sm text-zinc-400 leading-relaxed mb-2">We may use:</p>
            <ul className="list-disc list-inside text-sm text-zinc-400 leading-relaxed space-y-1 ml-2 mb-3">
              <li>cookies,</li>
              <li>analytics tools,</li>
              <li>session storage,</li>
              <li>performance monitoring tools,</li>
              <li>and similar technologies.</li>
            </ul>
            <p className="text-sm text-zinc-400 leading-relaxed mb-2">Users may control cookies through browser settings and applicable consent tools.</p>
            <p className="text-sm text-zinc-400 leading-relaxed">Depending on jurisdiction, users may have rights to opt out of certain tracking technologies. Modern privacy frameworks increasingly require transparent cookie disclosures and consent handling.</p>
          </div>

          <div>
            <h2 className="font-heading text-lg font-bold text-white uppercase tracking-wide mb-3">4. Sharing of Information</h2>
            <p className="text-sm text-zinc-400 leading-relaxed mb-2">We may share information with:</p>
            <ul className="list-disc list-inside text-sm text-zinc-400 leading-relaxed space-y-1 ml-2 mb-3">
              <li>service providers,</li>
              <li>cloud hosting providers,</li>
              <li>analytics providers,</li>
              <li>legal/compliance advisors,</li>
              <li>government customers or contracting authorities where required,</li>
              <li>or in connection with mergers, acquisitions, or financing transactions.</li>
            </ul>
            <p className="text-sm text-zinc-400 leading-relaxed">We do not sell personal information in the traditional sense.</p>
          </div>

          <div>
            <h2 className="font-heading text-lg font-bold text-white uppercase tracking-wide mb-3">5. Data Security</h2>
            <p className="text-sm text-zinc-400 leading-relaxed mb-2">We implement commercially reasonable technical, administrative, and organizational safeguards designed to protect information against unauthorized access, disclosure, alteration, or destruction.</p>
            <p className="text-sm text-zinc-400 leading-relaxed">However, no system can be guaranteed completely secure.</p>
          </div>

          <div>
            <h2 className="font-heading text-lg font-bold text-white uppercase tracking-wide mb-3">6. Export-Controlled & Sensitive Information</h2>
            <p className="text-sm text-zinc-400 leading-relaxed mb-2">Users should not submit:</p>
            <ul className="list-disc list-inside text-sm text-zinc-400 leading-relaxed space-y-1 ml-2 mb-3">
              <li>classified information,</li>
              <li>ITAR-controlled data,</li>
              <li>CUI,</li>
              <li>export-controlled technical data,</li>
              <li>or sensitive operational information</li>
            </ul>
            <p className="text-sm text-zinc-400 leading-relaxed">through public website forms unless explicitly authorized.</p>
          </div>

          <div>
            <h2 className="font-heading text-lg font-bold text-white uppercase tracking-wide mb-3">7. Your Privacy Rights</h2>
            <p className="text-sm text-zinc-400 leading-relaxed mb-2">Depending on your jurisdiction, you may have rights to:</p>
            <ul className="list-disc list-inside text-sm text-zinc-400 leading-relaxed space-y-1 ml-2 mb-3">
              <li>access personal information,</li>
              <li>correct inaccuracies,</li>
              <li>delete personal information,</li>
              <li>opt out of certain data processing,</li>
              <li>appeal privacy decisions,</li>
              <li>or request data portability.</li>
            </ul>
            <p className="text-sm text-zinc-400 leading-relaxed mb-2">California residents may have additional rights under the California Consumer Privacy Act ("CCPA/CPRA").</p>
            <p className="text-sm text-zinc-400 leading-relaxed mb-3">Several U.S. states now maintain active privacy laws requiring updated disclosures and opt-out mechanisms.</p>
            <p className="text-sm text-zinc-400 leading-relaxed">To exercise rights, contact: <a href="mailto:mike@eolianvr.com" className="text-[#FF0B1B] hover:text-white transition-colors">mike@eolianvr.com</a></p>
          </div>

          <div>
            <h2 className="font-heading text-lg font-bold text-white uppercase tracking-wide mb-3">8. Global Privacy Control (GPC)</h2>
            <p className="text-sm text-zinc-400 leading-relaxed">Where legally required, we honor recognized browser-based opt-out preference signals, including Global Privacy Control ("GPC").</p>
          </div>

          <div>
            <h2 className="font-heading text-lg font-bold text-white uppercase tracking-wide mb-3">9. Data Retention</h2>
            <p className="text-sm text-zinc-400 leading-relaxed mb-2">We retain information only as long as reasonably necessary for:</p>
            <ul className="list-disc list-inside text-sm text-zinc-400 leading-relaxed space-y-1 ml-2">
              <li>operational purposes,</li>
              <li>contractual obligations,</li>
              <li>legal compliance,</li>
              <li>dispute resolution,</li>
              <li>or security purposes.</li>
            </ul>
          </div>

          <div>
            <h2 className="font-heading text-lg font-bold text-white uppercase tracking-wide mb-3">10. Third-Party Services</h2>
            <p className="text-sm text-zinc-400 leading-relaxed mb-2">Our Services may integrate with or reference third-party systems, including cloud providers, analytics platforms, mapping providers, hardware vendors, or government systems.</p>
            <p className="text-sm text-zinc-400 leading-relaxed">We are not responsible for third-party privacy practices.</p>
          </div>

          <div>
            <h2 className="font-heading text-lg font-bold text-white uppercase tracking-wide mb-3">11. Children's Privacy</h2>
            <p className="text-sm text-zinc-400 leading-relaxed">Our Services are not directed to children under 13, and we do not knowingly collect personal information from children.</p>
          </div>

          <div>
            <h2 className="font-heading text-lg font-bold text-white uppercase tracking-wide mb-3">12. International Transfers</h2>
            <p className="text-sm text-zinc-400 leading-relaxed">Information may be processed in the United States or other jurisdictions where our providers operate.</p>
          </div>

          <div>
            <h2 className="font-heading text-lg font-bold text-white uppercase tracking-wide mb-3">13. Changes to this Policy</h2>
            <p className="text-sm text-zinc-400 leading-relaxed">We may update this Privacy Policy periodically. Updates will be posted with a revised effective date.</p>
          </div>

          <div className="border-t border-zinc-800 pt-8">
            <h2 className="font-heading text-lg font-bold text-white uppercase tracking-wide mb-3">14. Contact Information</h2>
            <div className="font-mono text-sm text-zinc-400 space-y-1">
              <p className="text-white font-medium">EolianVR, Inc.</p>
              <p>12577 66th St.</p>
              <p>Largo, FL 33773</p>
              <p><a href="mailto:mike@eolianvr.com" className="text-[#FF0B1B] hover:text-white transition-colors">mike@eolianvr.com</a></p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
