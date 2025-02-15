import { ref } from 'vue';
import { BlobServiceClient } from '@azure/storage-blob';

export const useMSAzureBlobStorage = () => {
  const selectedFile = ref<File | null>(null);
  const isUploading = ref(false);
  const uploadError = ref<string | null>(null);

  const config = useRuntimeConfig();
  const sasToken = config.public.AZURE_SAS_TOKEN;
  const accountName = config.public.AZURE_STORAGE_ACCOUNT_NAME;
  const containerName = config.public.AZURE_CONTAINER_NAME;
  const useEmulator = config.public.AZURE_USE_EMULATOR;
  
  const blobServiceUrl = useEmulator
    ? `http://127.0.0.1:10000/${accountName}${sasToken}`
    : `https://${accountName}.blob.core.windows.net${sasToken}`;

  const blobServiceClient = new BlobServiceClient(blobServiceUrl);
  const containerClient = blobServiceClient.getContainerClient(containerName);

  const handleFileUpload = (event: Event) => {
    const input = event.target as HTMLInputElement;
    if (input.files && input.files[0]) {
      selectedFile.value = input.files[0];
      uploadError.value = null;
    }
  };

  const uploadFile = async () => {
    if (!selectedFile.value) {
      uploadError.value = 'No file selected';
      return;
    }

    isUploading.value = true;
    uploadError.value = null;

    try {
      const blockBlobClient = containerClient.getBlockBlobClient(selectedFile.value.name);
      await blockBlobClient.uploadData(selectedFile.value, {
        blobHTTPHeaders: { blobContentType: selectedFile.value.type },
      });
      selectedFile.value = null;
    } catch (error) {
      uploadError.value = 'Failed to upload file';
      console.error('Upload error:', error);
    } finally {
      isUploading.value = false;
    }
  };

  return {
    selectedFile,
    isUploading,
    uploadError,
    handleFileUpload,
    uploadFile,
  };
};