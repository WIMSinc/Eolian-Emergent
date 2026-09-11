import { pageMetadata, howToSchema } from "@/lib/seo";
import { SECTIONS } from "@/data/acquireGuide";
import AcquireContent from "./AcquireContent";

export const metadata = pageMetadata({
  title: "How to Acquire ARTAK",
  description: "A step-by-step guide for DoD units and contracting officers on purchasing the ARTAK Squad Kit using Simplified Acquisition Procedures under FAR Part 13.",
  path: "/acquire",
});

/**
 * Pull the ordered steps out of a guide section.
 *
 * Reading them from data/acquireGuide.js rather than restating them here is
 * the point: the page renders the same array, so the schema cannot describe a
 * procedure the page does not show.
 */
function stepsFrom(sectionId) {
  const section = SECTIONS.find((s) => s.id === sectionId);
  const block = section?.blocks.find((b) => b.type === "steps");
  return block?.items ?? [];
}

/**
 * Three HowTo entities, because /acquire genuinely documents three different
 * procedures for three different readers — the unit, the contracting shop, and
 * the KO. One merged HowTo would misdescribe all three.
 *
 * Any section whose steps go missing drops out rather than emitting an empty
 * HowTo, so a content edit can never publish a procedure with no steps in it.
 */
const HOW_TOS = [
  {
    id: "start-here",
    name: "How to Buy the ARTAK Squad Kit",
    description:
      "The six steps a DoD unit follows to purchase the ARTAK Squad Kit with O&M funds, below the $350,000 Simplified Acquisition Threshold.",
  },
  {
    id: "field-guide",
    name: "Buying ARTAK Under Simplified Acquisition Procedures",
    description:
      "The eleven-step process a contracting shop follows to acquire ARTAK under FAR Part 13 and DFARS Part 213.",
  },
  {
    id: "ko-fast-start",
    name: "ARTAK KO Fast Start Guide",
    description:
      "What a contracting officer confirms, documents, and files to award ARTAK at or below the $350,000 Simplified Acquisition Threshold.",
  },
];

const schemas = HOW_TOS.map(({ id, name, description }) => {
  const steps = stepsFrom(id);
  return steps.length
    ? howToSchema({ name, description, steps, path: `/acquire#${id}` })
    : null;
}).filter(Boolean);

export default function Page() {
  return (
    <>
      {schemas.map((schema, i) => (
        <script
          key={i}
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
        />
      ))}
      <AcquireContent />
    </>
  );
}
