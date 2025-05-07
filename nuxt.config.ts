// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  compatibilityDate: "2024-11-01",
  devtools: { enabled: true },
  modules: [
    "@nuxt/eslint",
    "@nuxt/image",
    "@nuxt/scripts",
    "@nuxt/content",
    "@vueuse/nuxt",
    "@nuxt/ui",
    "nuxt-typed-router",
  ],

  ui: {
    colorMode: false,
  },

  fonts: {
    families: [{ name: "Public Sans", provider: "google" }],
  },

  hooks: {
    // Define `@nuxt/ui` components as global to use them in `.md` (feel free to add those you need)
    "components:extend": (components) => {
      const globals = components.filter((c) =>
        ["UButton"].includes(c.pascalName),
      );

      globals.forEach((c) => (c.global = true));
    },
  },

  content: {
    preview: {
      api: "https://api.nuxt.studio",
      gitInfo: {
        name: "smart4home_v2",
        owner: "runardvl",
        url: "https://github.com/runardvl/smart4home_v2",
      },
    },
    build: {
      markdown: {
        toc: {
          depth: 4, // include h4 headings
        },
        highlight: {
          langs: ["c", "cpp", "csharp", "python", "md"],
          theme: {
            default: "material-theme-lighter",
          },
        },
      },
    },
  },

  css: ["~/assets/css/main.css"],

  routeRules: {
    // prerender index route by default
    "/": { prerender: true },
  },

  future: {
    compatibilityVersion: 4,
  },
});
