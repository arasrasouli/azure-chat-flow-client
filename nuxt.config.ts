export default defineNuxtConfig({
  devtools: { enabled: false },

  routeRules: {
    '/': { redirect: '/Home' },
  },

  compatibilityDate: '2025-02-12',
});