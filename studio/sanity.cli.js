import { defineCliConfig } from "sanity/cli";

export default defineCliConfig({
  api: {
    projectId: process.env.SANITY_STUDIO_PROJECT_ID,
    dataset: process.env.SANITY_STUDIO_DATASET || "production",
  },
  deployment: {
    // Identifies the Studio application behind eolian.sanity.studio so
    // `sanity deploy` does not prompt for a hostname again. Not a secret — it
    // names the application, and access is still governed by your Sanity login.
    //
    // This is a new application, created 2026-08-25 against project b4qwtn71.
    // The previous one belonged to the deleted project n2qolqrd; its appId was
    // removed rather than reused, because an appId pointing at a project that
    // no longer exists makes `sanity deploy` fail instead of falling back. The
    // eolian hostname was free again and was reclaimed, so the Studio URL is
    // unchanged even though the application behind it is not.
    appId: "stx1x12dctuosp6merrpebmt",
  },
});
