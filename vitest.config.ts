import { fileURLToPath } from "node:url";
import { defineVitestConfig } from "@nuxt/test-utils/config";

export default defineVitestConfig({
  test: {
    environment: "nuxt",
    globals: true,
    include: ["tests/**/*.{test,spec}.{js,mjs,cjs,ts,mts,cts,jsx,tsx}"],
    coverage: {
      include: [
        "components/**/*.{vue,ts}",
        "pages/**/*.{vue,ts}",
        "stores/**/*.{ts}",
        "services/**/*.{ts}",
        "composables/**/*.{ts}",
      ],
      reporter: ["text", "json", "html"],
    },
    environmentOptions: {
      nuxt: {
        rootDir: fileURLToPath(new URL("./", import.meta.url)),
        domEnvironment: "happy-dom",
    },
  },
});
