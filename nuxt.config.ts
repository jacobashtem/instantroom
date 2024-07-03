// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  devtools: { enabled: true },
  postcss: {
    plugins: {
      tailwindcss: {},
      autoprefixer: {},
    },
  },
  css: ["/layouts/global.css"],
  modules: [
    '@nuxt/image-edge',
    '@nuxt/image',
    '@nuxt/ui',
    '@nuxtjs/supabase',
    '@zadigetvoltaire/nuxt-gtm'
  ],
  supabase: {
    redirectOptions: {
      login: '/login',
      callback: '/confirm',
      include: ['/settings(/*)?', '/generator(/*)', '/design(/*)'],
      exclude: [],
      cookieRedirect: false,
    }
  },
  runtimeConfig: {
    public: {
      replicateApiToken: process.env.REPLICATE_API_TOKEN,
      gtm: {
        id: "GTM-KSNTQNG8",
        defer: false,
        compatibility: false,
        enabled: true,
        debug: true,
        loadScript: true,
        trackOnNextTick: false,
        devtools: true,
      },
    }
  },
})