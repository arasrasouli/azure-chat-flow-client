import { useRuntimeConfig, useNuxtApp } from "#app";
import { MSAuth } from "~/services/msAuth";

export const useMSAuth = () => {
  const config = useRuntimeConfig();
  const nuxtApp = useNuxtApp();

  const msAuth = new MSAuth(config, nuxtApp);

  return {
    initialize: () => msAuth.initialize(),
    signIn: () => msAuth.signIn(),
    acquireTokenSilent: () => msAuth.acquireTokenSilent(),
    getAccounts: () => msAuth.getAccounts(),
    isAuthenticated: () => msAuth.isAuthenticated(),
    signOut: () => msAuth.signOut(),
  };
};
