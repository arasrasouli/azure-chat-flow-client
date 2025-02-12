import { ref } from 'vue';

const username = ref('');
const password = ref('');
const errorMessage = ref('');

const handleLogin = (router: any) => {
  if (username.value === 'admin' && password.value === 'password') {
    router.push('/dashboard'); 
  } else {
    errorMessage.value = 'Invalid username or password';
  }
};

export { username, password, errorMessage, handleLogin };