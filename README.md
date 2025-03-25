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



The **Azure Chat Flow Client App** is a modern chat application frontend built with **Vue.js** and **Nuxt.js**, leveraging **Azure SignalR** for real-time messaging. It integrates **Microsoft Authentication (MSAuth)** via **Microsoft Entra ID** for secure user authentication and uses **Azure Table Storage** for persistent chat message storage. Designed for scalable, secure, and efficient communication in cloud environments.

### Related Repositories
[Azure ChatFlow Server](https://github.com/arasrasouli/Azure-ChatFlow-Server)

## Features
- **User Authentication**: Secure login powered by **Microsoft Authentication (MSAuth)** with **Microsoft Entra ID**.
- **Real-Time Messaging**: Send and receive messages instantly using **Azure SignalR**.
- **Chat History**: Load and display chat history from **Azure Table Storage** with deduplication based on unique `rowKey`.
- **Local Storage Sync**: Persist chat messages locally for offline access and seamless session restoration.
- **UNDER DEVELOPMENT**: Additional features in progress (e.g., notification system, file/photo upload, chat UI improvements).

## Technologies Used
- **Nuxt 3**: Server-side rendering and static site generation for optimal performance.
- **Vue 3**: Reactive and component-based frontend framework.
- **Vue.js**: Powers the interactive UI components and reactivity (aligned with Vue 3).
- **TypeScript**: Static typing for robust, maintainable code.
- **Azure SignalR**: Real-time messaging service for scalable communication.
- **MSAuth (Microsoft Authentication)**: Secure authentication and user listing from Microsoft Entra ID.
- **Azure Table Storage**: Persistent storage for chat history.
- **Azure Blob Storage**: Planned for future file/photo upload capabilities.

## Key Processes
- **Authentication Service**: Handles user login via **MSAuth** with **Microsoft Entra ID**, providing secure access and user identity.
- **User Management Service**: Retrieves a list of domain users from **Microsoft Entra ID** for chat participant selection (via `UserList` component).
- **SignalR Connection Service**: Manages real-time connections to **Azure SignalR** through `UseSignalR`, ensuring stable communication with the backend.
- **Messaging Service**: Facilitates sending, receiving, and loading chat history using `SignalRService`, with messages stored in **Azure Table Storage** and deduplicated by `rowKey`.
- **Real-Time Synchronization**: Keeps chats, SignalR connection status, and user login states in sync across clients, leveraging `UseSignalR` and `localStorage`.
- **Notification Service**: Planned feature to manage real-time alerts for new messages or events.
- **File Management Service**: Planned feature to handle file/photo uploads using **Azure Blob Storage**.

## Project Structure


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




