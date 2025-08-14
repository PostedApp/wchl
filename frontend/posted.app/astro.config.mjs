import { defineConfig } from "astro/config";
import react from "@astrojs/react";
import tailwind from "@astrojs/tailwind";

export default defineConfig({
  integrations: [react(), tailwind()],
  output: "static",
  server: {
    port: 5173,
  },
  redirects: {
    "/discord": "https://discord.gg/Ane3ppsEGU",
    "/twitter": "https://x.com/tryposted",
    "/github": "https://github.com/PostedApp",
    "/wchl_pitch": "https://storage.posted.app/wchl_pitch_1",
    "/wchl_demo": "https://storage.posted.app/wchl_demo_1",
  },
});
