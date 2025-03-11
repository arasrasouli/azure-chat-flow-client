# Azure Chat Flow Client App

![Under Development](https://img.shields.io/badge/%F0%9F%9A%A7_UNDER_DEVELOPMENT_%F0%9F%9A%A7-FF9800)


![npm](https://img.shields.io/badge/npm-v11.1.0-blue?logo=npm)
![Vue](https://img.shields.io/badge/Vue-3.3.4-green?logo=vuedotjs)
![Nuxt](https://img.shields.io/badge/Nuxt-3.15.4-00DC82?logo=nuxtdotjs)
![TypeScript](https://img.shields.io/badge/TypeScript-7.25.9-3178C6?logo=typescript)
![Azure](https://img.shields.io/badge/Azure-0089D6?logo=microsoftazure)
![Blob Storage](https://img.shields.io/badge/Blob_Storage-0089D6?logo=microsoftazure)
![Service Bus](https://img.shields.io/badge/Service_Bus-0089D6?logo=microsoftazure)
![MS Auth](https://img.shields.io/badge/MS_Auth-0089D6?logo=microsoftazure)
![Microsoft Entra ID](https://img.shields.io/badge/Microsoft_Entra_ID-0089D6?logo=microsoftazure)
![Azure SignalR](https://img.shields.io/badge/Azure_SignalR-0089D6?logo=microsoftazure)



The **Azure Chat Flow Client App** is a Vue.js and Nuxt.js powered frontend for a chat application using Azure SignalR for real-time messaging. Integrated with Azure AD for authentication and Azure Table Storage for chat message storage. Designed for scalable and secure communication in cloud environments..  

## Features  
- **User Authentication** – Secure login with **Microsoft Authentication (MSAuth)**.  
- **File Upload** – Upload `.txt` files directly to **Azure Blob Storage**.
- **UNDER DEVELOPMENT...**

## Technologies Used  
- **Nuxt 3**  
- **Vue 3**  
- **TypeScript**  
- **Azure SignalR**  
- **MSAuth (Microsoft Authentication)**
- **Microsoft Entra ID**


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
NUXT_PUBLIC_AZURE_SIGNALR_CONNECTION_STRING="Endpoint=https://<signalr-resource-name>.service.signalr.net;AccessKey=<your-access-key>;Version=1.0;"
NUXT_PUBLIC_AZURE_SIGNALR_HUB_NAME=chatHub
NUXT_PUBLIC_API_BASE_URL=<api-url>
NUXT_PUBLIC_AZURE_SCOPES="User.Read.All"
```

## Related Repositories




