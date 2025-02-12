<script setup>
import { useHead } from 'nuxt/app';

useHead({
  titleTemplate: (title) => (title ? `Text Analyzer App - ${title}` : 'Text Analyzer App'),
});
</script>
<template>
  <NuxtLayout>
    <NuxtPage />
  </NuxtLayout>
</template>
