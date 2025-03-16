<template>
  <div class="dashboard">
    <h1>Chat Dashboard</h1>
    <p v-if="isAuthenticated">Welcome, {{ currentUserName }}</p>
    <button v-else @click="signIn">Sign In with Azure AD</button>

    <div v-if="isAuthenticated" class="chat-container">
      <button @click="toggleConnectionHandler" :disabled="signalR.connectionStatusValue === 'Connecting...'">
        {{ signalR.isConnectedValue ? 'Disconnect' : 'Connect' }}
      </button>
      <UserList v-if="signalR.isConnectedValue" :current-user="currentUserId" @user-selected="handleUserSelected" />
      <Chat
        v-if="signalR.isConnectedValue && chatUserId"
        :sender-id="currentUserId"
        :sender-name="currentUserName"
        :receiver-id="chatUserId"
        :receiver-name="chatUserName"
      />
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue';
import { useMSAuth } from '~/composables/useMSAuth';
import { UseSignalR } from '~/composables/useSignalR';
import UserList from '~/components/UserList.vue';
import Chat from '~/components/Chat.vue';
import '~/assets/pages/dashboard.css';
import type { AdUser } from '~/types/userType';

const { initialize, signIn, isAuthenticated, getAccounts } = useMSAuth();
const signalR = new UseSignalR();

const currentUserName = ref<string>('');
const currentUserEmail = ref<string>('');
const currentUserId = ref<string>('');
const chatUserId = ref<string>('');
const chatUserName = ref<string>('');

const toggleConnectionHandler = async () => {
  try {
    if (signalR.isConnectedValue) {
      await signalR.disconnect(currentUserId.value);
      chatUserId.value = '';
      chatUserName.value = '';
    } else {
      await signalR.startConnection(currentUserId.value);
    }
  } catch (error) {
    console.error('Failed to toggle connection:', error);
  }
};

const handleUserSelected = (user: AdUser) => {
  chatUserId.value = user.id;
  chatUserName.value = user.displayName;
};

onMounted(async () => {
  try {
    await initialize();
    if (isAuthenticated.value) {
      const accounts = await getAccounts();
      if (accounts.length > 0) {
        currentUserName.value = accounts[0]?.name || 'Unknown User';
        currentUserEmail.value = accounts[0]?.username || 'unknown@domain.com';
        currentUserId.value = accounts[0]?.idTokenClaims?.oid || accounts[0]?.localAccountId || '';
        console.log('Dashboard user:', { 
          name: currentUserName.value, 
          email: currentUserEmail.value, 
          id: currentUserId.value,
          rawAccount: accounts[0]
        });
      } else {
        console.warn('No accounts found after authentication');
      }
    }
  } catch (error) {
    console.error('Initialization or SignalR connection failed:', error);
  }
});
</script>