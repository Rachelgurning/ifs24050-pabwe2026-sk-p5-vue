import { defineStore } from 'pinia';
import { ref } from 'vue';

export const useAuthStore = defineStore('auth', () => {
  const user = ref(null);
  const isAuthenticated = ref(false);

  function login(username, password) {
    if (username === 'admin' && password === 'delcom2026') {
      user.value = { username, role: 'Administrator' };
      isAuthenticated.value = true;
      return true;
    }
    return false;
  }

  function logout() {
    user.value = null;
    isAuthenticated.value = false;
  }

  return { user, isAuthenticated, login, logout };
});