<template>
  <div class="dashboard-container">
    <h2>{{ getWelcomeMessage() }}</h2>
    <div>
      <h2>Messenger</h2>

    </div>
  </div>
</template>

<script setup>
import { pageData, getWelcomeMessage } from "./dashboard";
import "~/assets/pages/dashboard.css";

useHead({
  title: pageData.title,
});
</script>