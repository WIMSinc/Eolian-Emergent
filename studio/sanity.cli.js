import { defineCliConfig } from "sanity/cli";

export default defineCliConfig({
  api: {
    projectId: process.env.SANITY_STUDIO_PROJECT_ID,
    dataset: process.env.SANITY_STUDIO_DATASET || "production",
  },
  deployment: {
    // Identifies the deployed Studio at eolian.sanity.studio so `sanity deploy`
    // does not prompt for it again. Not a secret — it names the application,
    // and access is still governed by your Sanity login.
    appId: "pgrs079wfk81xyfimgdbu3mv",
  },
});
