<template>
  <div class="dashboard-container">
    <h2>{{ getWelcomeMessage() }}</h2>
    <div>
    <h2>Upload File</h2>
    <FileUpload @file-selected="onFileSelected" @upload="handleUpload" />
  </div>
  </div>
</template>

<script setup>
import { getWelcomeMessage } from './dashboard';
import { useRouter } from '#imports'; 
import FileUpload from "~/components/FileUpload.vue";
import './dashboard.css';

const router = useRouter();

useHead({
  title: 'Dashboard',
});


const onFileSelected = (file) => {
  console.log("Selected File:", file);
};

const handleUpload = async (file) => {
  console.log("Uploading File:", file);
  // TODO: Call API or upload directly to Azure Storage
};
</script>
