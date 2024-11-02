// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  devtools: { enabled: true },
  // routeRules: {
  //   '/blog': { isr: 3600 },
  //   '/blog/**': { isr: true },
  // },
  postcss: {
    plugins: {
      tailwindcss: {},
      autoprefixer: {},
    },
  },
  css: ["/layouts/global.css"],
  colorMode: {
    preference: 'light'
  },
  modules: [
    '@nuxt/image-edge',
    '@nuxt/image',
    '@nuxt/ui',
    '@nuxtjs/supabase',
    '@zadigetvoltaire/nuxt-gtm',
    'nuxt-scheduler',
    '@nuxt/content',
    'nuxt-disqus',
    'nuxt-swiper',
    "@unlok-co/nuxt-stripe"
  ],
disqus: {
  shortname: "instantroom",
},
// content: {
//   markdown: {
//     remarkPlugins: ["remark-reading-time"],
//   },
// },
  supabase: {
    redirectOptions: {
      login: '/login',
      callback: '/confirm',
      include: ['/settings(/*)?', '/generator(/*)', '/design(/*)'],
      exclude: [],
      cookieRedirect: false,
    }
  },
  stripe: {
    // Server
    server: {
      key: process.env.NUXT_STRIPE_SECRET,
      options: {
        // your api options override for stripe server side
        // https://github.com/stripe/stripe-node?tab=readme-ov-file#configuration
      },
      // CLIENT
    },
    client: {
      key: process.env.NUXT_PUBLIC_STRIPE_KEY,
      // your api options override for stripe client side https://stripe.com/docs/js/initializing#init_stripe_js-options
      options: {},
    },
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