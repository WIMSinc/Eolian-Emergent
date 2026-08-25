import { defineCliConfig } from "sanity/cli";

export default defineCliConfig({
  api: {
    projectId: process.env.SANITY_STUDIO_PROJECT_ID,
    dataset: process.env.SANITY_STUDIO_DATASET || "production",
  },
  // No `deployment.appId` on purpose. It used to pin the Studio application
  // behind eolian.sanity.studio, but that application belonged to project
  // n2qolqrd, which no longer exists — pinning an appId from a deleted project
  // makes `sanity deploy` fail rather than fall back. The first deploy against
  // the current project creates a new application and writes its appId back
  // into this file, at which point it is worth committing so later deploys stop
  // prompting for a hostname.
});
