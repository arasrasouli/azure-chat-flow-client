<template>
    <div class="layout">
      <HeaderComponent />
      <main class="content">
        <slot />
      </main>
      <FooterComponent />
    </div>
  </template>  
  
  <script setup>
  import HeaderComponent from "./header.vue";
  import FooterComponent from "./footer.vue";
  import "~/assets/layouts/default.css"
  </script>  