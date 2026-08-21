import { defineConfig } from "sanity";
import { structureTool } from "sanity/structure";
import { visionTool } from "@sanity/vision";
import { post } from "./schemas/post";

/**
 * Standalone Studio for eolianvr.com content.
 *
 * Kept out of the Next app on purpose: embedding it would pull the full Sanity
 * toolkit (~hundreds of MB) into the marketing site's build for the benefit of
 * a single author. Deploy with `npm run deploy` to get a hosted Studio at
 * <projectId>.sanity.studio instead.
 */
export default defineConfig({
  name: "eolianvr",
  title: "EolianVR Content",
  projectId: process.env.SANITY_STUDIO_PROJECT_ID,
  dataset: process.env.SANITY_STUDIO_DATASET || "production",
  plugins: [structureTool(), visionTool()],
  schema: { types: [post] },
});
