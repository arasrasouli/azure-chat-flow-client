<template>
  <div>
    <button v-if="!isAuthenticated" @click="handleSignIn">Sign In</button>
    <button v-if="isAuthenticated" @click="handleSignOut">Sign Out</button>
  </div>
</template>

<script setup>
import { useMSAuth } from "~/composables/useMSAuth";
import { useRouter } from "vue-router";
import "~/assets/components/login.css";

const { isAuthenticated, signIn, signOut } = useMSAuth();
const router = useRouter();
const emit = defineEmits(["auth-updated"]);

const handleSignIn = async () => {
  await signIn();
  emit("auth-updated", true);
  router.push("/dashboard");
};

const handleSignOut = async () => {
  await signOut();
  emit("auth-updated", false);
  router.push("/");
};

</script>