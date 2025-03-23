import { ref, computed, inject } from 'vue';
import { useRuntimeConfig, useNuxtApp } from '#app';
import { MSAuth } from '~/services/msAuth';
import type { UseSignalR } from '~/composables/useSignalR';

const authenticated = ref(false);

export const useMSAuth = () => {
  const config = useRuntimeConfig();
  const nuxtApp = useNuxtApp();
  const msAuth = new MSAuth(config, nuxtApp);
  const signalR = inject<UseSignalR>('signalR');

  const checkAuth = () => {
    authenticated.value = msAuth.isAuthenticated();
  };

  window.addEventListener('storage', async (event) => {
    if (event.key === 'msalSignOut' && event.newValue === 'true') {
      authenticated.value = false;
      await msAuth.signOut();
      console.log('Sign-out detected and enforced from another tab');
    //TODO: Improve condition
    } else if (event.key && event.key.indexOf('login.windows.net-refreshtoken') > 0 ) { 
      await msAuth.initialize();
      authenticated.value = msAuth.isAuthenticated();
      console.log('Sign-in detected from another tab');
    }
  });

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
      const accounts = msAuth.getAccounts();
      const userId = accounts[0]?.idTokenClaims?.oid || accounts[0]?.localAccountId || '';

      await msAuth.signOut();
      authenticated.value = false;

      if (signalR) {
        try {
          await signalR.signOut(userId);
          console.log('SignalR signed out successfully');
        } catch (error) {
          console.error('Failed to sign out SignalR:', error);
        }
      }

      localStorage.setItem('msalSignOut', 'true');
      setTimeout(() => localStorage.removeItem('msalSignOut'), 1000);
    },
  };
};