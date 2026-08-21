import { redirect } from "next/navigation";
import { pageMetadata } from "@/lib/seo";
import { useCaseData, slugs } from "@/data/artakUseCases";
import ArtakSubPageContent from "./ArtakSubPageContent";

/** Prerender all eight use-case pages at build time. */
export function generateStaticParams() {
  return slugs.map((slug) => ({ slug }));
}

export async function generateMetadata({ params }) {
  const { slug } = await params;
  const data = useCaseData[slug];
  if (!data) return {};
  return pageMetadata({
    title: `${data.title} — ${data.titleAccent}`,
    description: data.heroDesc,
    image: data.image,
    path: `/artak/${slug}`,
  });
}

export default async function Page({ params }) {
  const { slug } = await params;
  // Matches the CRA behaviour, which redirected unknown slugs to the ARTAK
  // overview rather than surfacing a 404.
  if (!useCaseData[slug]) redirect("/artak");
  return <ArtakSubPageContent slug={slug} />;
}
