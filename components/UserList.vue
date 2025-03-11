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

<script setup>
import { computed, defineProps, onMounted, ref } from 'vue';
import { useAzureUsers } from '~/composables/useAzureUsers';
import '~/assets/components/userList.css';

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
  const current = props.currentUser || 'unknown';
  const filtered = users.value.filter(user => {
    const excludeByEmail = user.userPrincipalName !== current;
    const excludeByName = user.displayName !== current;
    console.log('Comparing:', {
      userPrincipalName: user.userPrincipalName,
      displayName: user.displayName,
      currentUser: current,
      excluded: excludeByEmail && excludeByName
    });
    return excludeByEmail && excludeByName;
  });
  console.log('Filtered users (excluding current user):', filtered.map(u => ({
    id: u.id,
    displayName: u.displayName,
    userPrincipalName: u.userPrincipalName
  })));
  return filtered;
});

const emitSelectedUser = () => {
  const selected = filteredUsers.value.find(user => user.userPrincipalName === selectedUser.value);
  console.log('Selected user:', { 
    userPrincipalName: selectedUser.value, 
    displayName: selected?.displayName 
  });
  emit('user-selected', {
    userPrincipalName: selectedUser.value,
    displayName: selected?.displayName || selectedUser.value
  });
};
</script>
