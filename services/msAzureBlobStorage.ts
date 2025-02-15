import { BlobServiceClient, ContainerClient } from '@azure/storage-blob';

export class MSAzureBlobStorageService {
  private containerClient: ContainerClient;

  constructor(connectionString: string, containerName: string) {
    const blobServiceClient = BlobServiceClient.fromConnectionString(connectionString);
    this.containerClient = blobServiceClient.getContainerClient(containerName);
  }

  async uploadFile(file: File): Promise<void> {
    const blockBlobClient = this.containerClient.getBlockBlobClient(file.name);
    await blockBlobClient.uploadData(file, {
      blobHTTPHeaders: { blobContentType: file.type },
    });
  }
}