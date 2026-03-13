import { defineNuxtConfig } from "nuxt/config";

export default defineNuxtConfig({
  compatibilityDate: '2025-07-15',
  devtools         : { enabled: true },
  modules          : [
    '@nuxt/test-utils/module',
    '@nuxt/ui',
  ],

  alias: {
    '#components': './app/components',
  },

  css: ['./styles/main.css'],

  components: [
    {
      path      : '~/components',
      pathPrefix: false,
    },
  ],

  // @ts-ignore
  ui: {
    colorMode: false
  }
})