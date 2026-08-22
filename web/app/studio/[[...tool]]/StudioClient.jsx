"use client";

import { NextStudio } from "next-sanity/studio";
import config from "@/sanity.config";

/**
 * Importing sanity.config from a server component pulls the whole `sanity`
 * package into the RSC graph, where swr resolves to its react-server build and
 * has no default export — which fails the build. Keeping the import behind a
 * client boundary resolves it with the browser condition instead.
 */
export default function StudioClient() {
  return <NextStudio config={config} />;
}
