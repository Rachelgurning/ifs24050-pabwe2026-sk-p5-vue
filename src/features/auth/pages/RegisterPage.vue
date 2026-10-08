<template>
  <section aria-labelledby="register-title">
    <div class="mb-8">
      <span class="inline-flex rounded-full bg-indigo-50 px-3 py-1 text-xs font-bold text-indigo-700">AKUN BARU</span>
      <h1 id="register-title" class="mt-4 text-3xl font-extrabold tracking-tight text-slate-900">Buat akun</h1>
      <p class="mt-2 text-sm leading-6 text-slate-500">Daftarkan akun untuk mulai mengikuti dan membuat lelang.</p>
    </div>
    <form class="space-y-5" @submit.prevent="handleRegister">
      <div><label for="register-name" class="label">Nama Lengkap</label><input id="register-name-input" data-testid="register-name-input" v-model.trim="name" class="input" autocomplete="name" required /></div>
      <div><label for="register-email" class="label">Email</label><input id="register-email-input" data-testid="register-email-input" v-model.trim="email" class="input" type="email" autocomplete="email" required /></div>
      <div><label for="register-password" class="label">Password</label><input id="register-password-input" data-testid="register-password-input" v-model="password" class="input" type="password" minlength="6" autocomplete="new-password" required /></div>
      <button id="register-submit-button" data-testid="register-submit-button" class="btn-primary w-full" type="submit" :disabled="authStore.isAuthRegister">{{ authStore.isAuthRegister ? 'Memproses...' : 'Daftar' }}</button>
    </form>
    <p class="mt-6 text-center text-sm text-slate-500">Sudah punya akun? <RouterLink class="font-bold text-indigo-600 hover:underline" to="/auth/login">Masuk</RouterLink></p>
  </section>
</template>
<script setup>
import { ref } from 'vue';
import { useRouter } from 'vue-router';
import { useAuthStore } from '../states/authStore';
import { showErrorDialog, showSuccessDialog } from '../../../helpers/toolsHelper';
const name = ref(''); const email = ref(''); const password = ref('');
const authStore = useAuthStore(); const router = useRouter();
async function handleRegister() {
  const res = await authStore.register({ name: name.value, email: email.value, password: password.value });
  if (res.status === 'success') { await showSuccessDialog('Berhasil', 'Registrasi berhasil. Silakan login.'); router.replace('/auth/login'); }
  else showErrorDialog('Registrasi gagal', res.message || 'Data registrasi tidak valid.');
}
</script>
