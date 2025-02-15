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

const { isAuthenticated, acquireTokenSilent } = useMSAuth();

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

const uploadFile = async () => {
  if (!isAuthenticated()) {
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

<style scoped>
.upload-container {
  border: 1px solid #ddd;
  padding: 20px;
  text-align: center;
  max-width: 600px;
  margin: auto;
  border-radius: 8px;
  background: #f9f9f9;
}

input {
  margin-bottom: 10px;
}

button {
  padding: 10px 20px;
  margin: 10px;
  background-color: #0078d4;
  color: white;
  border: none;
  cursor: pointer;
  border-radius: 5px;
}

button:disabled {
  background: gray;
  cursor: not-allowed;
}

.error-message {
  color: red;
  font-size: 14px;
  margin-top: 5px;
}
</style>