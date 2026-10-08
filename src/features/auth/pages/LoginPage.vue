<template>
  <section aria-labelledby="login-title">
    <div class="mb-8">
      <span class="inline-flex rounded-full bg-indigo-50 px-3 py-1 text-xs font-bold text-indigo-700">DELcom AUCTION</span>
      <h1 id="login-title" class="mt-4 text-3xl font-extrabold tracking-tight text-slate-900">Masuk ke akun</h1>
      <p class="mt-2 text-sm leading-6 text-slate-500">Gunakan email dan password akun Delcom untuk mengelola lelang.</p>
    </div>
    <form class="space-y-5" @submit.prevent="handleLogin">
      <div>
        <label for="login-email" class="label">Email</label>
        <input id="login-email" v-model.trim="email" class="input" type="email" autocomplete="email" placeholder="nama@email.com" required />
      </div>
      <div>
        <label for="login-password" class="label">Password</label>
        <input id="login-password" v-model="password" class="input" type="password" autocomplete="current-password" placeholder="Masukkan password" required />
      </div>
      <button class="btn-primary flex w-full items-center justify-center" type="submit" :disabled="authStore.isAuthLogin">
        {{ authStore.isAuthLogin ? 'Memproses...' : 'Masuk' }}
      </button>
    </form>
    <p class="mt-6 text-center text-sm text-slate-500">Belum punya akun? <RouterLink class="font-bold text-indigo-600 hover:underline" to="/auth/register">Daftar sekarang</RouterLink></p>
  </section>
</template>
<script setup>
import { ref } from 'vue';
import { useRoute, useRouter } from 'vue-router';
import { useAuthStore } from '../states/authStore';
import { showSuccessDialog, showErrorDialog } from '../../../helpers/toolsHelper';
const email = ref('');
const password = ref('');
const authStore = useAuthStore();
const router = useRouter();
const route = useRoute();
async function handleLogin() {
  const res = await authStore.login({ email: email.value, password: password.value });
  if (res.status === 'success') {
    await showSuccessDialog('Berhasil', 'Login berhasil.');
    router.replace(typeof route.query.redirect === 'string' ? route.query.redirect : '/');
  } else {
    showErrorDialog('Login gagal', res.message || 'Email atau password tidak valid.');
  }
}
</script>
