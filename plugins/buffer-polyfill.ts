import { defineNuxtPlugin } from '#app';
import { Buffer } from 'buffer';
import process from "process";

export default defineNuxtPlugin(() => {
  globalThis.Buffer = Buffer;
  globalThis.process = process;
});
