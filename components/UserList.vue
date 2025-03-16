<template>
  <div class="user-list">
    <h3>Users in Domain</h3>
    <select v-model="selectedUser" @change="emitSelectedUser">
      <option value="" disabled>Select a user</option>
      <option 
        v-for="azureUser in filteredUsers" 
        :key="azureUser.id" 
        :value="azureUser.userPrincipalName"
      >
        {{ azureUser.displayName }}
      </option>
    </select>
    <p v-if="errorMessage" class="error">{{ errorMessage }}</p>
  </div>
</template>

<script setup lang="ts">
import { computed, defineProps, onMounted, ref } from 'vue';
import { useAzureUsers } from '~/composables/useAzureUsers';
import '~/assets/components/userList.css';
import type { AdUser } from '~/types/userType';

const props = defineProps({
  currentUser: String,
});

const emit = defineEmits(['user-selected']);

const { users, errorMessage, getDomainUsers } = useAzureUsers();
const selectedUser = ref('');

console.log('UserList props:', { currentUser: props.currentUser });
console.log('Initial errorMessage:', errorMessage.value);

onMounted(async () => {
  await getDomainUsers();
  console.log('Post-fetch errorMessage:', errorMessage.value);
});

const filteredUsers = computed(() => {
  const currentUserId = props.currentUser ?? 'unknown';
  return users.value.filter(user => user.id !== currentUserId);
});

const emitSelectedUser = () => {
  const selected: AdUser | undefined = filteredUsers.value.find(
    user => user.userPrincipalName === selectedUser.value
  );
  
  if (selected) {
    emit('user-selected', selected);
  } else {
    console.warn('No user found for:', selectedUser.value);
  }
};
</script>
