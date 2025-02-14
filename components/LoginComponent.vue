<template>
    <button v-if="!isAuthenticatedRef" @click="handleLogin">Login</button>
    <button v-else @click="handleLogout">Logout</button>
</template>
  
<script setup>
import { useMSAuth } from "~/composables/useMSAuth";
import { useRouter } from "vue-router";

const { signIn, signOut, isAuthenticated, getAccounts } = useMSAuth();
const router = useRouter();

const isAuthenticatedRef = useState("isAuthenticated", () => isAuthenticated());

const handleLogin = async () => {
  await signIn();
  isAuthenticatedRef.value = isAuthenticated();

  if (isAuthenticatedRef.value) {
    router.push("/dashboard");
  }
};

const handleLogout = async () => {
  await signOut();
  isAuthenticatedRef.value = isAuthenticated();
  if (!isAuthenticatedRef.value) {
    router.push("/home");
  }  
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