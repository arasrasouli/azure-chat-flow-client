<script setup>
import { useHead } from 'nuxt/app';

useHead({
  title: 'Home',
});
</script>

<template>
  <div class="Home-container">
    <h2>Welcome...</h2>
  </div>
</template>

<style scoped>
.Home-container {
  text-align: center;
  margin-top: 50px;
}
</style>
