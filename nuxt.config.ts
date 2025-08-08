export default defineNuxtConfig({
  devtools: {
    enabled: true,
    timeline: {
      enabled: true,
    },
  },

  modules: [
    "@nuxt/content",
    '@nuxthq/studio',
    '@nuxt/image-edge',
    '@nuxt/image',
    '@nuxt/ui',
    '@nuxtjs/supabase',
    '@zadigetvoltaire/nuxt-gtm',
    'nuxt-disqus',
    'nuxt-swiper',
    "@unlok-co/nuxt-stripe"
  ],

  disqus: {
  shortname: "instantroom",
},

  schemaOrg: {
    identity: {
      type: 'Organization',
      name: 'instantroom',
      logo: '/logo.png',
    }
  },

  router: {
    options: {
      scrollBehaviorType: "smooth",
    },
  },

  content: {
    markdown: {
      remarkPlugins: ["remark-reading-time"],
    },
  },

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
      },
    },
    client: {
      key: process.env.NUXT_PUBLIC_STRIPE_KEY,
      options: {},
    },
  },

  runtimeConfig: {
    public: {
      replicateApiToken: process.env.REPLICATE_API_TOKEN,
      defaultLocale: process.env.NUXT_PUBLIC_DEFAULT_LOCALE || 'pl',
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

  compatibilityDate: '2025-08-08',
})