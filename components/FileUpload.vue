<template>
  <div>
    <input type="file" @change="handleFileUpload" ref="fileInput" />
    <button @click="uploadFile" :disabled="isUploading">
      {{ isUploading ? "Uploading..." : "Upload" }}
    </button>

    <p v-if="selectedFile">
      {{ selectedFile.name }} ({{ fileSize }})
    </p>

    <p :style="{ color: uploadStatus.color }">{{ uploadStatus.message }}</p>
  </div>
</template>

<script setup lang="ts">
import { computed, ref } from "vue";
import { useMSAzureBlobStorage } from "~/composables/useMSAzureBlobStorage";
import { ifFileTypeIsTxt } from "~/utils/fileUtility";
import { useMSAuth } from '~/composables/useMSAuth';
import "~/assets/components/fileUpload.css";

const { isAuthenticated } = useMSAuth();

const {
  selectedFile,
  isUploading,
  uploadError,
  handleFileUpload,
  uploadFile: originalUploadFile,
} = useMSAzureBlobStorage();

const uploadStatus = ref<{ message: string; color: string }>({
  message: "",
  color: "black", 
});

const fileSize = computed(() => {
  if (!selectedFile.value) return "";
  const size = selectedFile.value.size / 1024 / 1024;
  return size.toFixed(2) + " MB";
});

const fileInput = ref<HTMLInputElement | null>(null);
const authenticated = ref(isAuthenticated.value);

const uploadFile = async () => {
  if (!authenticated) {
    uploadStatus.value = { message: "You must be signed in to upload files." , color: "red" };
    return;
  }

  if (!ifFileTypeIsTxt(selectedFile.value)) {
    uploadStatus.value = { message: "Only .txt files are allowed!" , color: "red" };
    return;
  }

  uploadStatus.value = { message: "Uploading..." , color: "black" };

  try {
    await originalUploadFile();

    if (!uploadError.value) {
      uploadStatus.value = { message: "Upload successful!" , color: "green" };

      resetFileInput();
    } else {
      uploadStatus.value = { message: "Error uploading the file. Please try again." , color: "red" };
    }
  } catch (error) {
    uploadStatus.value = { message: "Error uploading the file. Please try again." , color: "red" };
  }
};

const resetFileInput = () => {
  selectedFile.value = null;
  if (fileInput.value) {
    fileInput.value.value = "";
  }
};
</script>