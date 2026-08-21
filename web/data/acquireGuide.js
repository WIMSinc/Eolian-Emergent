/**
 * Content for the "How to Acquire ARTAK" guide (/acquire).
 *
 * Transcribed from "How to Buy the ARTAK Squad Kit 7.31.26.docx". Kept as data
 * rather than JSX so the copy can be revised without touching layout code, and
 * so the regulatory text stays readable in diffs — several passages are direct
 * FAR/DFARS paraphrase where wording matters.
 *
 * Block types: p | list | steps | table | callout | template | note
 */

export const GUIDE_UPDATED = "31 July 2026";

export const DISCLAIMERS = [
  {
    label: "Document control",
    body: "Verify all thresholds, citations, vendor representations, delivery terms, cybersecurity requirements, and funding classifications against the current FAR, DFARS, DoD Financial Management Regulation, applicable Component supplements, and local policy before use. The information in this guide is current as of 31 July 2026. This guide is informational and does not replace a contracting officer's, comptroller's, counsel's, or authorizing official's determination.",
  },
  {
    label: "Regulatory changes",
    body: "Federal and DoD acquisition rules change frequently. Dollar thresholds — including the micro-purchase threshold and the $350,000 simplified acquisition threshold referenced throughout this guide — are adjusted periodically for inflation under 41 U.S.C. § 1908, and the FAR and DFARS are amended on a rolling basis through Federal Acquisition Circulars, DFARS publication notices, annual National Defense Authorization Act provisions, and ongoing FAR reform efforts. Clause numbering, cybersecurity requirements, and appropriation and funding rules may also change. Any threshold, citation, form, or procedure described here may be superseded after the date above.",
  },
  {
    label: "Verify before you act",
    body: "Confirm the current text of every citation directly with the authoritative source — FAR and DFARS at acquisition.gov, and the DoD Financial Management Regulation at comptroller.defense.gov/FMR. Component supplements, local acquisition instructions, and your servicing contracting office may impose additional or more restrictive requirements.",
  },
  {
    label: "No warranty; not legal advice",
    body: "This guide is provided for general informational purposes only, without warranty of any kind, express or implied, as to accuracy, completeness, or currency. It does not constitute legal, contracting, or fiscal-law advice, and it is not an official publication of, and has not been reviewed or endorsed by, the Department of Defense or any of its components. Consult your contracting officer, comptroller or resource manager, and legal counsel before taking any action described here.",
  },
];

export const SECTIONS = [
  {
    id: "start-here",
    label: "Start Here",
    title: "How to Buy the ARTAK Squad Kit",
    subtitle: "For units using O&M funds — under the $350K Simplified Acquisition Threshold",
    blocks: [
      {
        type: "p",
        text: "This guide uses the ARTAK Squad Kit as its running example, but we offer a variety of configurations — including custom builds and software-only licenses installed on existing hardware. Adjust as necessary, and reach out with any questions.",
      },
      { type: "h3", text: "What's in the Squad Kit" },
      {
        type: "list",
        items: [
          "8 Mixed Reality (XR) headsets",
          "1 Samsung tablet",
          "1 WiFi/LTE network node",
          "1 edge server",
          "3-year software subscription",
        ],
      },
      {
        type: "p",
        text: "It gives your team a live, 3D view of the battlefield and integrates with systems like ATAK and JADC2.",
      },
      { type: "h3", text: "Why you can buy it quickly" },
      {
        type: "list",
        items: [
          "If the unit comptroller and legal/contracting officials determine the requirement is a proper O&M expense under current fiscal guidance, available O&M funds may be used; the $350,000 SAT does not determine appropriation eligibility.",
          "Simplified process — faster than traditional contracting.",
          "Small business vendor — EolianVR qualifies, which DoD prefers.",
          "Flexible payment — a Government Purchase Card (GPC) may be used for smaller buys.",
        ],
      },
      { type: "h3", text: "Step by step" },
      {
        type: "steps",
        items: [
          {
            title: "Confirm the need",
            body: "Write one or two sentences on why you need ARTAK.",
            quote:
              "The ARTAK Squad Kit will improve our unit's mission planning and situational awareness by providing real-time 3D mapping.",
          },
          {
            title: "Check funding",
            body: "Talk to your S-4 or comptroller: do we have O&M funds available, and can we set aside $234,683 for this purchase? They'll provide the funding citation.",
          },
          {
            title: "Decide payment method",
            body: "Government Purchase Card — may pay directly if the total is at or below the standard $15,000 micro-purchase threshold, subject to cardholder authority and agency procedures. In some cases (overseas or contingency operations) limits are higher, up to $25K or more. Purchase Order — if the cost exceeds the applicable GPC limit, the contracting officer may issue a purchase order (for example SF 1449 or DD 1155), with payment through Wide Area Workflow (WAWF).",
          },
          {
            title: "Submit a purchase request",
            body: "Include item name and description (“ARTAK Squad Kit – AR/VR C2 platform”), cost of $234,683, the funding citation, and preferred payment method.",
          },
          {
            title: "Contracting Officer actions",
            body: "Your KO will confirm ARTAK isn't already on GSA or another mandatory source; obtain enough quotations or market information to promote competition to the maximum extent practicable and support price reasonableness (considering at least three sources when appropriate, documenting the basis under FAR 13.106-1(b) if only one source is reasonably available); confirm the vendor is registered in SAM.gov; then write and sign the order.",
          },
          {
            title: "Delivery and payment",
            body: "If GPC, the cardholder pays EolianVR directly. If PO/WAWF, the KO issues the order, you receive the kit, and the KO processes payment in WAWF. Establish the required delivery date in the solicitation and award after confirming the contractor can meet it — a 14-day after-receipt-of-order period may be used only when supported by the contractor's current quotation and accepted by the contracting officer. Your unit inspects the kit to confirm it's complete and working.",
          },
        ],
      },
      { type: "h3", text: "Common questions" },
      {
        type: "faq",
        items: [
          {
            q: "Do we need 3 quotes?",
            a: "No. The rule is “maximum practicable competition.” Usually KOs will seek at least three, but if that's not possible, document outreach.",
          },
          {
            q: "Can O&M pay for this?",
            a: "Maybe. O&M may be used only if the servicing comptroller and legal/contracting officials determine that the requirement is a bona fide need of the appropriation, satisfies purpose/time/amount requirements, and is properly classified as an expense under current DoD and Component fiscal guidance. The FAR SAT is separate and does not establish O&M eligibility.",
          },
          {
            q: "What about cybersecurity?",
            a: "The requiring activity and contracting officer must identify the information, system, cloud, telecommunications, supply-chain, and cybersecurity requirements that apply. Include DFARS 252.204-7012 and related clauses only when their prescriptions and applicability conditions are met; vendor representations must be independently verified.",
          },
          {
            q: "Do we need a schedule or other existing source?",
            a: "The contracting officer must check the applicable priorities and mandatory sources, existing contracts, schedules, and agency vehicles. An open-market purchase may be considered only after those checks and the required market research are documented.",
          },
        ],
      },
      {
        type: "callout",
        variant: "accent",
        title: "Bottom line",
        items: [
          "$15K or less — GPC may be used, subject to cardholder authority and agency procedures.",
          "Over $15K but not exceeding the $350K SAT — the KO may use simplified acquisition procedures; the comptroller must separately confirm the proper appropriation and O&M eligibility.",
          "Either method may be appropriate when supported by the acquisition record, delegated authority, current policy, and the contracting officer's, comptroller's, and counsel's determinations.",
        ],
      },
    ],
  },

  {
    id: "field-guide",
    label: "Field Guide",
    title: "Simplified Acquisition Field Guide",
    subtitle: "Using Simplified Acquisition Procedures under FAR Part 13 and DFARS Part 213",
    blocks: [
      {
        type: "p",
        text: "SAP applies to acquisitions at or below the current Simplified Acquisition Threshold of $350,000. The proper appropriation — including whether O&M funds are available and legally appropriate — must be confirmed separately by the unit comptroller and contracting/legal officials.",
      },
      { type: "h3", text: "Why use SAP for the ARTAK Squad Kit?" },
      {
        type: "list",
        items: [
          "Speed — SAP cuts red tape, allowing purchases in days, not months (FAR 13.106-2(b)(3)).",
          "Flexibility — buyers can use oral quotes, compare prices, and award without formal evaluations.",
          "O&M funds — potentially available only after the servicing comptroller and legal/contracting officials confirm expense classification, bona fide need, purpose/time/amount compliance, any system or unit-cost aggregation rules, and the current DoD/Component expense-investment threshold. COTS status and the FAR SAT do not by themselves authorize O&M funding.",
          "Small business — FAR Part 13 supports small-business participation. Verify the prospective contractor's current representations, size status for the assigned NAICS code, and eligibility before treating the acquisition as a small-business set-aside or award.",
          "No GSA required — as an open-market item, the ARTAK Squad Kit can be purchased directly, bypassing GSA schedules.",
          "Mission impact — the kit's 8 XR HMDs, tablet, WiFi/LTE network node, edge server, and 3-year software subscription enhance mission planning, C2, and situational awareness with real-time 3D maps and sensor data.",
        ],
      },
      { type: "h3", text: "Key thresholds" },
      {
        type: "table",
        headers: ["Threshold", "Amount", "Reference"],
        rows: [
          ["Simplified Acquisition Threshold (SAT)", "$350,000", "FAR 2.101, effective 1 Oct 2025"],
          ["Micro-Purchase Threshold (MPT)", "$15,000", "FAR 2.101"],
          ["Commercial products and services", "Through $9,000,000, or $15,000,000 for qualifying acquisitions", "FAR Subpart 13.5, FAR 13.500(c)"],
          ["Contingency / defense-support SAT", "$1,000,000 inside the U.S.; $2,000,000 outside", "FAR 2.101"],
        ],
      },
      {
        type: "note",
        text: "The $2,000 construction and $2,500 covered-service exceptions remain subject to FAR 2.101. O&M use is conditional on written confirmation from the servicing comptroller and, as applicable, legal counsel that the purchase is a proper expense under current DoD and Component fiscal guidance. Evaluate the complete system or requirement, not merely individual components, and do not treat the $350,000 SAT as a funding authority.",
      },
      { type: "h3", text: "What you need" },
      {
        type: "list",
        items: [
          "Valid requirement — a mission need for enhanced C2, mission planning, or situational awareness (e.g. real-time 3D mapping for tactical operations).",
          "Funding determination — available funds are not sufficient by themselves. Obtain comptroller confirmation that the appropriation is proper for the requirement and fiscal year, and obtain legal/contracting review when required, before submitting or obligating the purchase.",
          "Contracting Officer or GPC authority — use a contracting officer for an order above the applicable cardholder authority. A GPC holder may use the card only within the applicable micro-purchase threshold, delegated authority, and agency procedures, including any authorized exception.",
          "Three quotes — quotes from EolianVR and two other vendors. We'll help obtain them.",
        ],
      },
      { type: "h3", text: "The eleven steps" },
      {
        type: "steps",
        items: [
          {
            title: "Identify mission need",
            body: "Confirm your unit needs the kit and justify the mission need — improved C2, support to tactical operations. Who: you or the unit commander. Tip: attend our base demo to experience the kit's capabilities firsthand.",
          },
          {
            title: "Confirm O&M funding",
            body: "Ensure funds are available for $234,683 (FAR 32.702). Do not assume eligibility based on COTS status or price alone — the comptroller should classify the full requirement, including hardware, software, subscriptions, installation, training, support, and any items that function together as a system, under current DoD and Component expense/investment guidance. Obtain a fund cite via MIPR or equivalent. Who: S-4/comptroller.",
          },
          {
            title: "Submit purchase request",
            body: "Draft a brief scope of work describing the kit by function, performance, or essential characteristics (FAR 11.002(a)) — avoid restrictive specs. The contracting officer must determine and document whether the supplies and services meet the applicable FAR 2.101 definitions; vendor labeling alone does not establish the determination. Obtain J6/CIO approval for IT components (DFARS 213.301(3)). Who: S-4/admin.",
            template: {
              subject: "Purchase Request – ARTAK Squad Kit – $234,683",
              body: "Request PR for the ARTAK Squad Kit from EolianVR, $234,683, O&M-funded. SAM-registered small business, SAP-eligible under FAR Part 13. Supports [mission need]. Docs attached.",
            },
          },
          {
            title: "Route to Contracting Officer",
            body: "Forward the PR to your unit's KO or higher HQ contracting office. Who: S-4/chain of command.",
            template: {
              subject: "SAP Purchase Request – ARTAK Squad Kit – $234,683",
              body: "Requesting SAP under FAR Part 13 for ARTAK Squad Kit, $234,683. Three quotes will be provided. Supports [mission need]. Please advise if assistance is needed.",
            },
          },
          {
            title: "Conduct market research and obtain quotes",
            body: "Verify the kit is not available from GSA Advantage, AbilityOne, or Federal Prison Industries (FAR 8.002, DFARS 208). Solicit oral or written quotes from three sources including EolianVR (FAR 13.104(b), DFARS 213.104) — oral quotes are preferred unless over $25,000 (FAR 13.106-1(c)). Don't limit to well-known brands. If the kit's unique capabilities are only available from EolianVR, prepare a justification (FAR 13.106-1(b), DFARS 213.106-1). Document the sources contacted, the responses received, and the basis for any decision to proceed with limited competition or a single source. Who: KO or unit.",
          },
          {
            title: "Publicize (if applicable)",
            body: "At or below $20,000, the FAR 5.101 public-display requirement does not apply. Over $20,000 through $25,000, use public display or an appropriate electronic notice, subject to FAR 5.101 exceptions. Over $25,000, post on SAM.gov unless exempt (FAR 5.202(a)(12)). Publicizing may be waived in contingency operations (DFARS 213.301(3)). Who: KO.",
          },
          {
            title: "Solicit and evaluate quotes",
            body: "Use oral solicitation for efficiency; for over $25,000 issue a written RFQ unless exempt. Notify vendors of the award basis (FAR 13.106-1(a)(2)) and include commercial item clauses — FAR Part 52 commercial products and services, and DFARS 252.204-7012 if IT-related. Evaluate on stated criteria (FAR 12.602(a)) and select on best value (FAR 13.106-2). If only one quotation is received, document price reasonableness using appropriate market research and complete any required review. Who: KO.",
          },
          {
            title: "Verify contractor responsibility",
            body: "The contracting officer must verify active SAM registration, exclusions status, representations and certifications, UEI, CAGE code, responsibility information, and any acquisition-specific eligibility requirements before award. Ensure FAR 52.212-3 (over $2,500) or DFARS 252.212-7000 (over $100,000) certifications are provided — we include these in our Procurement Kit. Who: KO.",
          },
          {
            title: "Document the award",
            body: "Document that the price is fair (FAR 13.106-3). The contract file should include quotes, a market research summary, SAM/EPLS screenshots, the signed evaluation form and award rationale, any sole-source justification, and Determinations and Findings for commercial items or sole-source (FAR 1.704). Who: KO.",
          },
          {
            title: "Issue the purchase order",
            body: "Use SF 1449 or DD 1155 specifying quantity, delivery location (Block 15), delivery period, F.O.B. destination (Block 11; FAR 13.302), and payment terms and office address (Blocks 12, 18a). Include FAR 52.212-4, 52.212-5, DFARS 252.204-7012 for IT, and other applicable clauses. Send copies to EolianVR, your unit, and finance. Who: KO.",
          },
          {
            title: "Receive and close out",
            body: "Verify that all delivered supplies and services conform to the order's inspection, acceptance, performance, security, configuration, and documentation requirements, and record acceptance in the designated system. Use GPC for $25,000 or under if accepted, or process via WAWF (FAR 13.301, DFARS 213.301). Confirm receipt and payment, then close the file (FAR 4.804-1). Who: you/COR and finance.",
          },
        ],
      },
      { type: "h3", text: "Special considerations for O&M funds" },
      {
        type: "list",
        items: [
          "Expense/investment classification — before obligation, the servicing comptroller must apply the current DoD FMR and Component guidance to the complete requirement. If it is classified as an expense and satisfies purpose, time, amount, bona fide need, availability, and any system/unit-cost rules, O&M may be appropriate; otherwise use the applicable procurement or other appropriation. Obtain legal review when classification is uncertain.",
          "GPC use — may be used for $25,000 or under for quick payment; we accept GPC (DFARS 213.301).",
          "Research, development, test, and evaluation or prototype effort requires a separate purpose and appropriation analysis. Do not use O&M solely because an individual effort falls below a dollar threshold.",
        ],
      },
      { type: "h3", text: "Who can buy?" },
      {
        type: "p",
        text: "Any DoD unit with O&M funds and contracting support — infantry companies, aviation squadrons, SOF teams (e.g. MARSOC, Force Recon), intel battalions, combat logistics, communications, and engineering units.",
      },
      { type: "h3", text: "What EolianVR provides" },
      {
        type: "list",
        items: [
          "Quote — PDF for $234,683, valid through the stated date.",
          "CAGE / UEI / SAM — CAGE 7RLL6, UEI HHN2E2LNBSV5, SAM-registered.",
          "Product specs — brochure detailing components and capabilities.",
          "Past performance — current, verifiable records relevant to the requirement, identifying the contract or order, customer, scope, performance period, and source.",
          "Delivery terms — 14 days ARO, 1-year warranty, training, and support.",
          "WAWF registration for payment processing.",
          "Cover letter explaining SAP eligibility.",
          "SAP cheat sheet — one-pager for KOs (3 quotes, SF 1449, DD 2579, WAWF).",
          "Email templates for your S-4 and KO.",
          "Justification memo template for sole-source or urgent needs.",
          "DD 2579 guide and WAWF submission instructions.",
        ],
      },
      { type: "h3", text: "Example purchase scenario" },
      {
        type: "table",
        headers: ["Element", "Detail"],
        rows: [
          ["Unit", "2nd Reconnaissance Battalion"],
          ["Need", "ARTAK Squad Kit for C2 — $234,683"],
          ["Funding", "Appropriation to be determined and documented by the servicing comptroller after review of the complete requirement; O&M may be used only if approved as the proper appropriation under current guidance."],
          ["Action", "S-4 submits PR, KO collects 3 quotes (EolianVR's included), issues SF 1449"],
          ["Delivery", "14 days ARO"],
          ["Payment", "Via WAWF, paid in 30 days"],
        ],
      },
    ],
  },

  {
    id: "regulatory-basis",
    label: "Regulatory Basis",
    title: "Regulatory Basis and Compliance",
    subtitle: "Principal acquisition and fiscal-law considerations",
    blocks: [
      {
        type: "p",
        text: "This section identifies the principal acquisition and fiscal-law considerations associated with a potential purchase using Simplified Acquisition Procedures. The contracting officer, comptroller, counsel, cybersecurity officials, and other designated reviewers must make the applicable determinations based on the current requirement and acquisition record.",
      },
      { type: "h3", text: "1. Legal authority" },
      {
        type: "list",
        items: [
          "FAR 13.003(a) directs agencies to use simplified acquisition procedures to the maximum extent practicable for purchases not exceeding the SAT. The current SAT is $350,000 for most acquisitions (FAR 2.101). At $234,683, the Squad Kit falls below the SAT.",
          "FAR Subpart 13.5 authorizes simplified procedures for commercial products and services above the SAT through $9,000,000, or $15,000,000 for qualifying acquisitions described in FAR 13.500(c), when supported by market research.",
          "DFARS 213.000 supplements FAR Part 13 for DoD, emphasising flexibility for mission-critical acquisitions. DFARS 213.302 governs purchase orders, allowing unilateral awards for open-market items.",
        ],
      },
      { type: "h3", text: "2. O&M funding eligibility" },
      {
        type: "p",
        text: "The servicing comptroller must apply the current DoD Financial Management Regulation and applicable Component guidance to determine whether the complete requirement is an expense or investment and which appropriation is proper. The analysis should address purpose, time, amount, bona fide need, system aggregation, useful life, unit or system cost, and the treatment of associated software, subscriptions, installation, training, support, and data services.",
      },
      {
        type: "p",
        text: "Per DoD FMR Vol. 2A, Ch. 1, Para. 010201.B.2, categories that may be O&M-eligible include COTS equipment such as communication devices and IT hardware; supplies such as maintenance parts and training materials; and services such as training or technical support. These examples are illustrative only — classification depends on the complete requirement, intended use, useful life, unit/system cost, and applicable Component policy.",
      },
      {
        type: "p",
        text: "FAR 32.702 requires sufficient funds and a valid fund citation. The unit must verify fund availability through its S-4 or comptroller, ensuring the fund cite matches the purchase order.",
      },
      { type: "h3", text: "3. Procedural compliance" },
      {
        type: "p",
        text: "The field guide steps above align with FAR, DFARS, and the A2-60 to A2-63 checklist: requirements defined by function or performance (FAR 11.002(a)); funding verified (FAR 32.702); PR with funding documentation and J6/CIO approval for IT (DFARS 213.301(3)); KO oversight; mandatory-source checks and at least three quotes where practicable (FAR 8.002, FAR 13.104(b)); publicizing per FAR 5.101 and 5.202; evaluation on stated criteria (FAR 13.106-1(a)(2), FAR 12.602(a)); SAM and exclusions verification (FAR 9.405); price-reasonableness documentation (FAR 13.106-3); award on SF 1449 or DD 1155 (FAR 13.302); and inspection, payment, and closeout (FAR 4.804-1).",
      },
      { type: "h3", text: "4. Why units select ARTAK" },
      {
        type: "list",
        items: [
          "Enhanced C2 — real-time 3D maps and sensor data synchronise planning across echelons for infantry, SOF, intel, or logistics units.",
          "Operational readiness — training, support, and device-agnostic software improve mission planning and situational awareness.",
          "Rapid deployment — a 14-day delivery ARO meets urgent operational needs.",
          "Streamlined process — SAP avoids complex evaluations, enabling awards in days (FAR 13.106-2(b)(3)).",
          "Small business support — purchasing from EolianVR aligns with DoD small business goals (FAR 13.003(b), DFARS 219).",
          "Reduced KO workload — our Procurement Kit provides quote, specs, certifications, and WAWF instructions.",
        ],
      },
      { type: "h3", text: "5. Common review questions" },
      {
        type: "faq",
        items: [
          {
            q: "Is O&M funding appropriate?",
            a: "That determination rests with the servicing comptroller and, where required, legal counsel, applying the current DoD FMR and Component guidance to the complete requirement. COTS status and price alone do not establish eligibility.",
          },
          {
            q: "Is competition required?",
            a: "FAR 13.104(b) and DFARS 213.104 direct the contracting officer to promote competition to the maximum extent practicable. EolianVR provides one quote and assists with obtaining others. If unique capabilities justify a single source, a written justification is required (FAR 13.106-1(b)).",
          },
          {
            q: "Are mandatory sources required?",
            a: "FAR 8.002 and DFARS 208 require checking mandatory sources such as GSA and AbilityOne. An open-market purchase may proceed only after those checks and the required market research are documented.",
          },
          {
            q: "Is documentation sufficient?",
            a: "The contract file should include quotes, market research, SAM/exclusions checks, certifications, and a price-reasonableness memo, meeting FAR 13.106-3 and the A2-61/A2-62 checklist items.",
          },
          {
            q: "Is IT compliance addressed?",
            a: "IT components require J6/CIO approval (DFARS 213.301(3)) and inclusion of DFARS 252.204-7012 where its prescription and applicability conditions are met. We support compliance with certifications and technical specs.",
          },
        ],
      },
      {
        type: "callout",
        variant: "muted",
        title: "Conclusion",
        items: [
          "A unit may use SAP for the ARTAK Squad Kit if the contracting officer determines the acquisition is eligible under the current FAR and DFARS, the commercial-product determination is supported, the funding source is approved under current fiscal guidance, competition and price-reasonableness requirements are satisfied, and all required technical, cybersecurity, legal, and administrative approvals are documented.",
        ],
      },
    ],
  },

  {
    id: "sole-source",
    label: "Sole-Source Template",
    title: "Justification for Single Source Awards",
    subtitle: "IAW FAR 13.106-1 — over the micro-purchase threshold, not exceeding the SAT",
    blocks: [
      {
        type: "p",
        text: "In accordance with FAR 13.104, contracting officers must promote competition to the maximum extent practicable to obtain supplies and services from the source whose offer is most advantageous to the Government, considering the administrative cost of the purchase. When competition is not practicable, FAR 13.106-1(b) permits soliciting from a single source for purchases not exceeding the SAT if the CO determines that only one source is reasonably available — for example due to urgency, exclusive licensing, brand-name, or industrial mobilization. Per FAR 13.106-3(b)(3), COs must include statements explaining the absence of competition for single-source awards not exceeding the SAT.",
      },
      {
        type: "note",
        text: "The following is a template. The requiring activity should define the essential functional and performance characteristics needed for the mission. Any conclusion that only one source can satisfy those characteristics must be supported by contemporaneous market research, independent technical analysis, and the contracting officer's written determination.",
      },
      {
        type: "table",
        headers: ["Field", "Entry"],
        rows: [
          ["Acquisition plan action ID", "[Assigned by unit]"],
          ["Project / task no.", "[To be assigned by unit]"],
          ["Estimated amount", "$234,683 (one ARTAK Squad Kit, all components and services)"],
        ],
      },
      { type: "h3", text: "Brief description of supplies required and intended use" },
      {
        type: "p",
        text: "The [Unit Name] requires the purchase of the ARTAK Squad Kit, a commercial off-the-shelf augmented reality/virtual reality command and control platform from EolianVR. The kit includes 8 XR head-mounted displays, 1 Samsung tablet, 1 WiFi/LTE network node, 1 edge server, and a 3-year software subscription for the ARTAK app/cloud service, including training, support, data plan, installation, and case customization. The intended use is to enhance mission planning, situational awareness, and C2 by providing real-time 3D mapping and sensor data integration, synchronizing operations across echelons for tactical units such as infantry, Special Operations Forces, intelligence battalions, or combat logistics teams.",
      },
      { type: "h3", text: "Characteristics that may limit availability to one source" },
      {
        type: "list",
        items: [
          "Device-agnostic software — the ARTAK app operates across XR HMDs, tablets, and PCs, enabling flexible C2 in diverse operational environments.",
          "Real-time 3D mapping and sensor integration — 3D terrain visualization and sensor data fusion for mission planning and situational awareness in complex environments.",
          "Compact, all-inclusive package — a self-contained design supporting rapid deployment in austere environments without additional infrastructure.",
          "Proven performance — a track record of delivering AR/VR solutions to DoD customers including USSOCOM.",
          "Urgency — the pre-configured, ready-to-use design supports immediate deployment timelines.",
        ],
      },
      { type: "h3", text: "Description of market research conducted" },
      {
        type: "list",
        items: [
          "Reviewed mandatory sources — checked GSA Advantage, AbilityOne, and Federal Prison Industries catalogs (FAR 8.002, DFARS 208).",
          "Searched the commercial market — evaluated products from AR/VR vendors including Microsoft HoloLens (AR capabilities but no integrated VR, squad-level C2 software, or self-contained network solution), Magic Leap (enterprise-focused, requires additional infrastructure), and Oculus (consumer-focused, lacking DoD-specific C2 features and ruggedized design).",
          "Searched SAM.gov and the Federal Procurement Data System for vendors offering comparable C2 platforms.",
          "Consulted AR/VR industry contacts and reviewed vendor websites.",
        ],
      },
      { type: "h3", text: "Contracting Officer's certification" },
      {
        type: "p",
        text: "Purchase is approved in accordance with FAR 13.106-1(b). I certify that the foregoing justification is accurate and complete to the best of my knowledge and belief. Price reasonableness has been determined in accordance with FAR 13.106-3, based on market research and EolianVR's provided quote.",
      },
      {
        type: "note",
        text: "The price reasonableness determination is documented separately per FAR 13.106-3 and the Commercial Supply and Service SOP. EolianVR provides supporting documentation — quote and past performance data — to facilitate this process.",
      },
    ],
  },

  {
    id: "ko-fast-start",
    label: "KO Fast Start",
    title: "KO Fast Start Guide",
    subtitle: "For contracting officers — at or below the $350,000 SAT",
    blocks: [
      { type: "h3", text: "Quick overview" },
      {
        type: "table",
        headers: ["Item", "Details"],
        rows: [
          ["Product", "ARTAK Squad Kit — AR/VR Command & Control platform"],
          ["Vendor", "EolianVR (small business, SAM registered)"],
          ["UEI", "HHN2E2LNBSV5"],
          ["CAGE", "7RLL6"],
          ["Total price", "$234,683 per kit — below the Simplified Acquisition Threshold"],
          ["Contract type", "Purchase Order (SAP), open market"],
          ["Funding", "O&M, only if approved as the proper appropriation by the servicing comptroller and, when required, legal counsel; otherwise use the applicable procurement or other appropriation."],
          ["Delivery", "14 days ARO — FOB destination"],
          ["SAM status", "Active"],
          ["Payment", "WAWF or GPC (for $25,000 or under)"],
          ["Documentation provided", "Quote, spec sheet, SAM/exclusions screenshot, reps & certs, WAWF guide, price justification"],
        ],
      },
      { type: "h3", text: "Legal checklist" },
      {
        type: "steps",
        items: [
          {
            title: "Confirm simplified acquisition eligibility",
            body: "Total amount is at or below $350,000 (FAR 2.101). Product qualifies as a COTS item (FAR 2.101). SAP is mandatory if practicable under FAR 13.003(a). Funding source conditionally approved by the servicing comptroller after applying current DoD/Component fiscal guidance; document the appropriation determination and obtain legal review if the expense/investment classification is uncertain.",
          },
          {
            title: "Check vendor eligibility",
            body: "Confirm EolianVR is SAM registered (screenshot provided), verify not excluded, and collect FAR 52.212-3 / DFARS 252.212-7000 certifications (included).",
          },
          {
            title: "Conduct market research and competition",
            body: "Check GSA Advantage, AbilityOne, UNICOR (FAR 8.002) — ARTAK is not listed. Receive three quotes, oral or written (FAR 13.104(b)); EolianVR provides one and will help with others. If single source, complete the justification per FAR 13.106-1(b).",
          },
          {
            title: "Determine price reasonableness",
            body: "Evaluate quotes for price and delivery (FAR 13.106-2). Document the best-value determination or price-reasonableness memo (FAR 13.106-3). Include EolianVR past performance.",
          },
          {
            title: "Document the file",
            body: "PR and fund cite (MIPR, 2276, etc.); SOW; market research; quotes or single-source justification; SAM and exclusions check; reps & certs; evaluation and price memo; award document (SF 1449 or DD 1155).",
          },
        ],
      },
      { type: "h3", text: "Purchase order setup" },
      {
        type: "p",
        text: "Preferred form is SF 1449 for commercial items; DD 1155 is acceptable per DFARS 213.302.",
      },
      {
        type: "table",
        headers: ["Block", "Entry"],
        rows: [
          ["1", "Requisition number"],
          ["2", "Contract number (assigned by KO)"],
          ["4", "Order number"],
          ["9 / 17a", "EolianVR — CAGE 7RLL6, UEI HHN2E2LNBSV5"],
          ["11", "FOB destination"],
          ["12", "Payment via WAWF"],
          ["15", "Delivery address (unit or S-4 office)"],
          ["20", "Total price — $234,683"],
        ],
      },
      {
        type: "p",
        text: "Clause references: FAR 52.212-4 and 52.212-5; DFARS 252.204-7012 if IT-related; plus any applicable local clauses.",
      },
      { type: "h3", text: "Sample line item for SF 1449" },
      {
        type: "table",
        headers: ["CLIN", "Description", "Qty", "Unit price", "Total"],
        rows: [
          [
            "0001",
            "ARTAK Squad Kit — AR/VR C2 platform (8x XR HMDs, 1 tablet, LTE node, edge server, software, training, support)",
            "1",
            "$234,683",
            "$234,683",
          ],
        ],
      },
      { type: "h3", text: "Award and closeout" },
      {
        type: "list",
        items: [
          "Issue award via SF 1449 or DD 1155.",
          "Send a copy to EolianVR, the requiring unit, and DFAS.",
          "Confirm receipt and inspection (DD 250 or WAWF acceptance).",
          "Process payment via WAWF or GPC.",
          "Close out the file (FAR 4.804-1).",
        ],
      },
    ],
  },
];

export const CONTACT = {
  name: "Mike Simmons",
  role: "Co-Founder / COO, EolianVR",
  phone: "(305) 562-9639",
  phoneHref: "tel:+13055629639",
  email: "mike@eolianvr.com",
  uei: "HHN2E2LNBSV5",
  cage: "7RLL6",
};
