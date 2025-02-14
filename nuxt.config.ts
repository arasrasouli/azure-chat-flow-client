export default defineNuxtConfig({
  devtools: { enabled: false },

  routeRules: {
    '/': { redirect: '/Home' },
  },

  compatibilityDate: '2025-02-12',

  runtimeConfig: {
    public: {
      AZURE_CLIENT_ID: process.env.NUXT_PUBLIC_AZURE_CLIENT_ID,
      AZURE_AUTHORITY: process.env.NUXT_PUBLIC_AZURE_AUTHORITY,
      AZURE_REDIRECT_URI: process.env.NUXT_PUBLIC_AZURE_REDIRECT_URI,
      AZURE_SECRET_VALUE: process.env.NUXT_PUBLIC_AZURE_SECRET_VALUE,
    },
  },
  plugins: ["~/plugins/msal.ts"],
});