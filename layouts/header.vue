<template>
  <client-only>
    <header class="header">
      <h1>Azure Chat Flow Client</h1>
      <nav>
        <NuxtLink to="/">Home</NuxtLink>
        <NuxtLink v-if="authenticated" to="/dashboard">Dashboard</NuxtLink>
        <div class="auth-buttons">
          <LoginComponent @auth-updated="handleAuthChange" />
        </div>
      </nav>
    </header>
  </client-only>
</template>

<script setup lang="ts">
import { ref } from 'vue';
import { useMSAuth } from '~/composables/useMSAuth';
import LoginComponent from '~/components/LoginComponent.vue';
import "~/assets/layouts/header.css";

const { isAuthenticated } = useMSAuth();
const authenticated = ref(isAuthenticated.value);

const handleAuthChange = (status: boolean) => {
  authenticated.value = status;
};
</script>