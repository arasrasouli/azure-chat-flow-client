# Azure Chat Flow Client App

![npm](https://img.shields.io/badge/npm-v11.1.0-blue?logo=npm)
![Vue](https://img.shields.io/badge/Vue-3.3.4-green?logo=vuedotjs)
![Nuxt](https://img.shields.io/badge/Nuxt-3.15.4-00DC82?logo=nuxtdotjs)
![TypeScript](https://img.shields.io/badge/TypeScript-7.25.9-3178C6?logo=typescript)
![Azure](https://img.shields.io/badge/Azure-0089D6?logo=microsoftazure)
![Blob Storage](https://img.shields.io/badge/Blob_Storage-0089D6?logo=microsoftazure)
![Service Bus](https://img.shields.io/badge/Service_Bus-0089D6?logo=microsoftazure)
![MS Auth](https://img.shields.io/badge/MS_Auth-0089D6?logo=microsoftazure)

🚧 **UNDER DEVELOPMENT** 🚧  
The **Azure Chat Flow Client App** is a Vue.js and Nuxt.js powered frontend for a chat application using Azure SignalR for real-time messaging. Integrated with Azure AD for authentication and Azure Table Storage for chat message storage. Designed for scalable and secure communication in cloud environments..  

## Features  
- **User Authentication** – Secure login with **Microsoft Authentication (MSAuth)**.  
- **File Upload** – Upload `.txt` files directly to **Azure Blob Storage**.  
- **Background Processing** – Uses **Azure Service Bus** for handling text analysis asynchronously.  
- **Real-Time Status** – Get live updates on the analysis process.  

## Technologies Used  
- **Nuxt 3**  
- **Vue 3**  
- **TypeScript**  
- **Azure Table Storage**  
- **Azure Service Bus**  
- **MSAuth (Microsoft Authentication)**  

### Environment Variables  
Create a `.env` file in the project root and add the following:  

```sh
NUXT_PUBLIC_AZURE_CLIENT_ID=your-client-id
NUXT_PUBLIC_AZURE_AUTHORITY=https://login.microsoftonline.com/your-tenant-id
NUXT_PUBLIC_AZURE_REDIRECT_URI=http://localhost:3000
NUXT_PUBLIC_AZURE_SECRET_VALUE=your-secret-value
NUXT_PUBLIC_AZURE_STORAGE_ACCOUNT_NAME=your-storage-account-name
NUXT_PUBLIC_AZURE_SAS_TOKEN=your-sas-token
NUXT_PUBLIC_AZURE_CONTAINER_NAME=your-container-name
NUXT_PUBLIC_AZURE_USE_EMULATOR=true  # Set to false if using Azure services directly
NUXT_PUBLIC_AZURE_SERVICE_BUS_CONNECTION_STRING="<service-bus-namespace-connection-string>"
NUXT_PUBLIC_AZURE_SERVICE_BUS_QUEUE_NAME=<queue-name>
```

## Related Repositories




