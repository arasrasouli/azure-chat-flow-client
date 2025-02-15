<template>
  <div>
    <button v-if="!isAuthenticated" @click="handleSignIn">Sign In</button>
    <button v-if="isAuthenticated" @click="handleSignOut">Sign Out</button>
  </div>
</template>

<script setup>
import { defineEmits } from 'vue';
import { useMSAuth } from '~/composables/useMSAuth';
import { useRouter } from 'vue-router';

const { isAuthenticated, signIn, signOut } = useMSAuth();
const router = useRouter();
const emit = defineEmits(['auth-updated']);

const handleSignIn = async () => {
  await signIn();
  emit('auth-updated', true);
  router.push("/dashboard");
};

const handleSignOut = async () => {
  await signOut();
  emit('auth-updated', false);
  router.push("/");
};

</script>

<style scoped>
button {
  margin: 5px;
  padding: 10px 20px;
  background: #0078d4;
  color: white;
  border: none;
  cursor: pointer;
  border-radius: 5px;
  transition: background 0.3s;
}

button:hover {
  background: #005ea2;
}

button.logout {
  background: #ff5c5c;
}

button.logout:hover {
  background: #cc4c4c;
}
</style>