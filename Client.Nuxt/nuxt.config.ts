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

  css: ['~/assets/css/main.css'],

  components: [
    {
      path      : '~/components',
      pathPrefix: false,
    },
  ],

  // @ts-ignore
  ui: {
    colorMode: process.env.NUXT_ALLOW_COLOR_MODE === 'true' ? {
      preference: 'dark'
    } : false
  },

  runtimeConfig: {
    public: {
      apiBaseUrl: '',
      locale    : 'ru'
    },
  },
})