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
    "@nuxtjs/tailwindcss",
    '@nuxt/image-edge',
    '@nuxt/image',
    '@nuxt/ui',
    '@nuxtjs/supabase',
  ],
  tailwindcss: {
    config: {
      plugins: [require("@tailwindcss/typography")],
    },
  },
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
      replicateApiToken: process.env.REPLICATE_API_TOKEN
    }
  },
})