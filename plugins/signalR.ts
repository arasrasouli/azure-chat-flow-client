import { defineNuxtPlugin } from '#app';
import { UseSignalR } from '~/composables/useSignalR';

export default defineNuxtPlugin((nuxtApp) => {
  const config = useRuntimeConfig();
  const signalR = new UseSignalR(config.public.API_BASE_URL);

  nuxtApp.vueApp.provide('signalR', signalR);
  return {
    provide: {
      signalR,
    },
  };
});