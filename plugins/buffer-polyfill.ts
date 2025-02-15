import { defineNuxtPlugin } from '#app';
import { Buffer } from 'buffer';

export default defineNuxtPlugin(() => {
  globalThis.Buffer = Buffer;
});