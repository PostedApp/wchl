import { defineConfig } from "astro/config";
import react from "@astrojs/react";
import tailwind from "@astrojs/tailwind";

export default defineConfig({
  integrations: [react(), tailwind()],
  redirects: {
    "/discord": "https://discord.gg/Ane3ppsEGU",
    "/twitter": "https://x.com/tryposted",
    "/github": "https://github.com/PostedApp",
  },
});
