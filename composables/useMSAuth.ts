import { ref, computed } from 'vue';
import { useRuntimeConfig, useNuxtApp } from '#app';
import { MSAuth } from '~/services/msAuth';

const authenticated = ref(false);

export const useMSAuth = () => {
  const config = useRuntimeConfig();
  const nuxtApp = useNuxtApp();
  const msAuth = new MSAuth(config, nuxtApp);

  const checkAuth = () => {
    authenticated.value = msAuth.isAuthenticated();
  };

  return {
    initialize: async () => {
      await msAuth.initialize();
      checkAuth();
    },
    signIn: async () => {
      await msAuth.signIn();
      checkAuth();
    },
    acquireTokenSilent: () => msAuth.acquireTokenSilent(),
    getAccounts: () => msAuth.getAccounts(),
    isAuthenticated: computed(() => authenticated.value),
    signOut: async () => {
      await msAuth.signOut();
      authenticated.value = false;
    },
  };
};