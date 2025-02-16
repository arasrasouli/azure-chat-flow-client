<template>
  <div class="dashboard-container">
    <h2>{{ getWelcomeMessage() }}</h2>
    <div>
      <h2>Upload File</h2>
      <FileUpload />
    </div>
  </div>
</template>

<script setup>
import { pageData, getWelcomeMessage } from './dashboard';
import FileUpload from "~/components/FileUpload.vue";
import './dashboard.css';
useHead({
  title: pageData.title,
});
</script>