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
import { ref, onMounted, inject, watch } from 'vue';
import { useMSAuth } from '~/composables/useMSAuth';
import { useRouter } from 'vue-router';
import UserList from '~/components/UserList.vue';
import Chat from '~/components/Chat.vue';
import type { UseSignalR } from '~/composables/useSignalR';
import type { AdUser } from '~/types/userType';

const { initialize, signIn, isAuthenticated, getAccounts } = useMSAuth();
const signalR = inject<UseSignalR>('signalR')!;
const router = useRouter();

const currentUserName = ref<string>('');
const currentUserId = ref<string>('');
const chatUserId = ref<string>('');
const chatUserName = ref<string>('');

onMounted(async () => {
  await initialize();
  updateUserData();
});

const updateUserData = async () => {
  if (isAuthenticated.value) {
    const accounts = getAccounts();
    if (accounts.length > 0) {
      currentUserName.value = accounts[0]?.name || 'Unknown User';
      currentUserId.value = accounts[0]?.idTokenClaims?.oid || accounts[0]?.localAccountId || '';
    } else {
      await initialize();
      const accounts = getAccounts();
      if (accounts.length > 0) {
        currentUserName.value = accounts[0]?.name || 'Unknown User';
        currentUserId.value = accounts[0]?.idTokenClaims?.oid || accounts[0]?.localAccountId || '';
      }
    }
  } else {
    currentUserName.value = '';
    currentUserId.value = '';
    chatUserId.value = '';
    chatUserName.value = '';
    router.push('/');
  }
};

watch(isAuthenticated, async (newVal) => {
  console.log('isAuthenticated changed in Dashboard:', newVal);
  await updateUserData();
});

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
</script>