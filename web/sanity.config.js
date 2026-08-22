import { defineConfig } from "sanity";
import { structureTool } from "sanity/structure";
import { visionTool } from "@sanity/vision";
import { post } from "./sanity/schemaTypes/post";

/**
 * Studio config, mounted at /studio by app/studio/[[...tool]]/page.jsx.
 *
 * Embedded in the marketing app rather than deployed separately: it ships in
 * the same deploy, needs no CORS entry because it is same-origin, and the
 * route is code-split so visitors to the marketing pages never download it.
 */
export default defineConfig({
  name: "eolianvr",
  title: "EolianVR Content",
  basePath: "/studio",
  projectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID,
  dataset: process.env.NEXT_PUBLIC_SANITY_DATASET || "production",
  plugins: [structureTool(), visionTool()],
  schema: { types: [post] },
});
