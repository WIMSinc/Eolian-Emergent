import { defineConfig } from "sanity";
import { structureTool } from "sanity/structure";
import { visionTool } from "@sanity/vision";
import { post } from "./schemas/post";

/**
 * Standalone Studio for eolianvr.com content.
 *
 * Kept out of the Next app deliberately. Embedding it was tried and reverted:
 * pulling in the `sanity` toolkit took the site's dependency audit from 0 to 9
 * advisories, all transitives of @sanity/cli that never execute at runtime but
 * still sit in the tree the site is built from. Keeping the CMS out means the
 * deployed site depends on nothing it does not actually serve.
 *
 * Deploy with `npm run deploy` for a hosted Studio at <projectId>.sanity.studio.
 */
export default defineConfig({
  name: "eolianvr",
  title: "EolianVR Content",
  projectId: process.env.SANITY_STUDIO_PROJECT_ID,
  dataset: process.env.SANITY_STUDIO_DATASET || "production",
  plugins: [structureTool(), visionTool()],
  schema: { types: [post] },
});
