import { defineStore } from 'pinia';
import { ref, computed } from 'vue';
import { loginApi, registerApi, logoutApi } from '../api/authApi';
import { getAccessToken, putAccessToken } from '../../../helpers/apiHelper';

export const useAuthStore = defineStore('auth', () => {
  const token = ref(getAccessToken());
  const user = ref(null);
  const isAuthLogin = ref(false);
  const isAuthRegister = ref(false);
  const isAuthLogout = ref(false);
  const isAuthenticated = computed(() => Boolean(token.value));

  async function login(credentials) {
    isAuthLogin.value = true;
    const res = await loginApi(credentials);
    if (!res.error && res.status === 'success') {
      token.value = res.data?.token || '';
      user.value = res.data?.user || null;
      putAccessToken(token.value);
    }
    isAuthLogin.value = false;
    return res;
  }

  async function register(payload) {
    isAuthRegister.value = true;
    const res = await registerApi(payload);
    isAuthRegister.value = false;
    return res;
  }

  async function logout() {
    isAuthLogout.value = true;
    const res = await logoutApi();
    token.value = '';
    user.value = null;
    putAccessToken('');
    isAuthLogout.value = false;
    return res;
  }

  return { token, user, isAuthenticated, isAuthLogin, isAuthRegister, isAuthLogout, login, register, logout };
});
