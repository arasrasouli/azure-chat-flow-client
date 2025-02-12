<template>
  <div class="dashboard-container">
    <h2>{{ getWelcomeMessage() }}</h2>
  </div>
</template>

<script setup lang="ts">
import { getWelcomeMessage } from './dashboard';
import { useRouter } from '#imports'; 
import './dashboard.css';

const router = useRouter();

useHead({
  title: 'Dashboard',
});
</script>