import Appsignal from "@appsignal/javascript";

export default new Appsignal({
  key: "840e135a-2edf-47fe-9e5e-fa46aabf0c2c",
  uri: "https://error-tracker.staging.lol/collect",
  revision: process.env.VERCEL_GIT_COMMIT_SHA || process.env.NEXT_PUBLIC_VERCEL_GIT_COMMIT_SHA
});
