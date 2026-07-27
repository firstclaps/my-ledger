import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

// IMPORTANT: set `base` to "/<your-repo-name>/" (with slashes) before deploying.
// e.g. if your repo is github.com/venkat/my-ledger, use base: "/my-ledger/"
export default defineConfig({
  plugins: [react()],
  base: "/my-ledger/",
});
