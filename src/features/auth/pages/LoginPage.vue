<template>
  <section aria-labelledby="login-title">
    <h1 id="login-title" class="text-2xl font-bold text-slate-900">Masuk ke akun</h1>
    <p class="mt-1 text-sm text-slate-600">Gunakan email dan password akun Delcom kamu.</p>
    <form class="mt-6 space-y-4" aria-label="Form masuk" @submit.prevent="handleLogin">
      <div><label class="label" for="login-email-input">Email</label><input id="login-email-input" data-testid="login-email-input" v-model="email" class="input" type="email" required autocomplete="email" /></div>
      <div><label class="label" for="login-password-input">Password</label><input id="login-password-input" data-testid="login-password-input" v-model="password" class="input" type="password" required autocomplete="current-password" /></div>
      <button id="login-submit-button" data-testid="login-submit-button" type="submit" class="btn-primary w-full" :disabled="authStore.isAuthLogin" :aria-busy="authStore.isAuthLogin">{{ authStore.isAuthLogin ? 'Memproses...' : 'Masuk' }}</button>
    </form>
    <p class="mt-5 text-center text-sm text-slate-600">Belum punya akun? <RouterLink class="font-semibold text-indigo-700 underline-offset-2 hover:underline" to="/auth/register">Daftar</RouterLink></p>
  </section>
</template>
<script setup>
import { ref } from 'vue';
import { useRouter } from 'vue-router';
import { useAuthStore } from '../states/authStore';
import { showSuccessDialog, showErrorDialog } from '../../../helpers/toolsHelper';
const email=ref(''); const password=ref(''); const authStore=useAuthStore(); const router=useRouter();
async function handleLogin(){ const res=await authStore.login({email:email.value.trim(),password:password.value}); if(res.status==='success'){await showSuccessDialog('Berhasil','Login berhasil.'); router.push('/');} else await showErrorDialog('Gagal',res.message||'Email atau password tidak valid.'); }
</script>