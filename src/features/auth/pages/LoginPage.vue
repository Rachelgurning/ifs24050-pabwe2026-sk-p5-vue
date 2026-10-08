<template>
  <div>
    <h1 class="text-2xl font-bold text-slate-900">Masuk ke akun</h1>
    <p class="mt-1 text-sm text-slate-500">Gunakan email dan password akun Delcom kamu.</p>
    <form class="mt-6 space-y-4" @submit.prevent="handleLogin">
      <div><label class="label">Email</label><input v-model="email" class="input" type="email" required autocomplete="email" /></div>
      <div><label class="label">Password</label><input v-model="password" class="input" type="password" required autocomplete="current-password" /></div>
      <button class="btn-primary w-full" :disabled="authStore.isAuthLogin">{{ authStore.isAuthLogin ? 'Memproses...' : 'Masuk' }}</button>
    </form>
    <p class="mt-5 text-center text-sm text-slate-500">Belum punya akun? <RouterLink class="font-semibold text-indigo-600" to="/auth/register">Daftar</RouterLink></p>
  </div>
</template>
<script setup>
import { ref } from 'vue';
import { useRouter } from 'vue-router';
import { useAuthStore } from '../states/authStore';
import { showSuccessDialog, showErrorDialog } from '../../../helpers/toolsHelper';
const email=ref(''); const password=ref(''); const authStore=useAuthStore(); const router=useRouter();
async function handleLogin(){ const res=await authStore.login({email:email.value.trim(),password:password.value}); if(res.status==='success'){await showSuccessDialog('Berhasil','Login berhasil.'); router.push('/');} else await showErrorDialog('Gagal',res.message||'Email atau password tidak valid.'); }
</script>
