<template>
  <div>
    <button v-if="!isAuthenticated" @click="handleSignIn">Sign In</button>
    <button v-if="isAuthenticated" @click="handleSignOut">Sign Out</button>
  </div>
</template>

<script setup>
import { useMSAuth } from '~/composables/useMSAuth';
import { useRouter } from 'vue-router';
import { watch } from 'vue';
import '~/assets/components/login.css';

const { isAuthenticated, signIn, signOut } = useMSAuth();
const router = useRouter();
const emit = defineEmits(['auth-updated']);

const handleSignIn = async () => {
  await signIn();
  afterSignIn();
};

const afterSignIn = async () => {
  emit('auth-updated', true);
  router.push('/dashboard');
}; 

const handleSignOut = async () => {
  await signOut();
  afterSignOut();
};

const afterSignOut = async () => {
  emit('auth-updated', false);
  router.push('/');
}; 

watch(isAuthenticated, (newVal) => {
  if (newVal) {
    afterSignIn();
    console.log('Sign-in detected in Login component');
  } else {
    afterSignOut();
    console.log('Sign-out detected in Login component');
  }
});
</script>