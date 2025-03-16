export default defineNuxtConfig({
  devtools: { enabled: false },

  routeRules: {
    "/": { redirect: "/Home" },
  },

  compatibilityDate: "2025-02-12",

  runtimeConfig: {
    public: {
      AZURE_CLIENT_ID: process.env.NUXT_PUBLIC_AZURE_CLIENT_ID,
      AZURE_AUTHORITY: process.env.NUXT_PUBLIC_AZURE_AUTHORITY,
      AZURE_REDIRECT_URI: process.env.NUXT_PUBLIC_AZURE_REDIRECT_URI,
      AZURE_SECRET_VALUE: process.env.NUXT_PUBLIC_AZURE_SECRET_VALUE,
      AZURE_STORAGE_ACCOUNT_NAME: process.env.NUXT_PUBLIC_AZURE_STORAGE_ACCOUNT_NAME,
      AZURE_SAS_TOKEN: process.env.NUXT_PUBLIC_AZURE_SAS_TOKEN,
      AZURE_CONTAINER_NAME: process.env.NUXT_PUBLIC_AZURE_CONTAINER_NAME,
      AZURE_USE_EMULATOR: process.env.NUXT_PUBLIC_USE_EMULATOR,
      AZURE_SERVICE_BUS_CONNECTION_STRING: process.env.NUXT_PUBLIC_AZURE_SERVICE_BUS_CONNECTION_STRING,
      AZURE_SERVICE_BUS_QUEUE_NAME: process.env.NUXT_PUBLIC_AZURE_SERVICE_BUS_QUEUE_NAME,
      AZURE_SIGNALR_CONNECTION_STRING: process.env.NUXT_PUBLIC_AZURE_SIGNALR_CONNECTION_STRING,
      AZURE_SIGNALR_HUB_NAME: process.env.NUXT_PUBLIC_AZURE_SIGNALR_HUB_NAME,
      API_BASE_URL: process.env.NUXT_PUBLIC_API_BASE_URL,
      TEST_USERS: process.env.NUXT_PUBLIC_TEST_USERS || 'TestUser1,TestUser2,TestUser3',
      AZURE_SCOPES: process.env.NUXT_PUBLIC_AZURE_SCOPES || 'User.Read.All',     
    },
  },
  plugins: ["~/plugins/msal.ts", "~/plugins/buffer-polyfill.ts"],
  build: {
    extend(config, { isClient }) {
      if (isClient) {
        config.resolve.fallback = {
          ...config.resolve.fallback,
          buffer: require.resolve("buffer/"),
          process: require.resolve("process/"),
        };
      }
    },
  },
  devServer: {
    port: 3001
  }  
});
