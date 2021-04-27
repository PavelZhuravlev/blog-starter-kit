const env = {
  GTM_ID: process.env.GTM_ID || "GTM-XXXXXXX",
  BASE_URL: process.env.BASE_URL || "http://localhost:3000",
  STRAPI_URL: process.env.STRAPI_URL || "http://localhost:1337",
  CLOUDINARY_CLOUD_NAME: process.env.CLOUDINARY_CLOUD_NAME || "",
  ROUTES_TO_EXCLUDE: (process.env.ROUTES_TO_EXCLUDE || "")
    .split(",")
    .filter(Boolean),
};

export default {
  target: "static",
  publicRuntimeConfig: {
    baseUrl: env.BASE_URL,
    strapiUrl: env.STRAPI_URL,
    cldCloudName: env.CLOUDINARY_CLOUD_NAME,
  },
  head: {
    htmlAttrs: {
      lang: "en",
    },
    meta: [
      { charset: "utf-8" },
      { name: "viewport", content: "width=device-width, initial-scale=1" },
    ],
  },
  /*
   ** Global CSS
   */
  css: ["~/assets/scss/main"],
  plugins: [
    {
      src: "~/plugins/infinite-loading",
      mode: "client",
    },
    {
      src: "~/plugins/load-articles",
    },
    {
      src: "~/plugins/rias",
      mode: "client",
    },
  ],
  components: false,
  buildModules: [
    "@nuxtjs/style-resources",
    "@/modules/sitemapRouteGenerator",
    "nuxt-lazysizes",
    [
      "@nuxtjs/google-fonts",
      {
        useStylesheet: true,
        display: "swap",
        families: {
          Roboto: [400, 700],
        },
      },
    ],
  ],
  styleResources: {
    scss: [
      "bootstrap-4-grid/scss/breakpoints/mixins/_breakpoints.scss",
      "~assets/scss/abstracts/*.scss",
      "bourbon/core/_bourbon.scss",
    ],
  },
  lazySizes: {
    plugins: {
      blurUp: true,
    },
  },
  modules: [
    "@nuxtjs/markdownit",
    "@nuxtjs/strapi",
    "@nuxtjs/gtm",
    "@nuxtjs/sitemap",
    "@nuxtjs/robots",
    "vue-social-sharing/nuxt",
  ],
  strapi: {
    url: env.STRAPI_URL,
    entities: [
      {
        name: "articles",
        type: "collection",
      },
      {
        name: "categories",
        type: "collection",
      },
      {
        name: "homepage",
        type: "single",
      },
      {
        name: "global",
        type: "single",
      },
    ],
  },
  markdownit: {
    preset: "default",
    linkify: true,
    breaks: false,
    injected: true,
    html: true,
  },
  gtm: {
    id: env.GTM_ID,
  },
  sitemap: {
    path: "/sitemap.xml",
    hostname: env.BASE_URL,
    exclude: env.ROUTES_TO_EXCLUDE,
    defaults: {
      changefreq: "daily",
      priority: 1,
      lastmod: new Date(),
    },
  },
  robots: [
    {
      UserAgent: "*",
      Disallow: env.ROUTES_TO_EXCLUDE,
    },
  ],
};
