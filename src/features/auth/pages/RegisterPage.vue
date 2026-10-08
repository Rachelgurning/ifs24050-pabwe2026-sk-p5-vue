<template>
  <div>
    <h1 class="text-2xl font-bold text-slate-900">Buat akun</h1>
    <p class="mt-1 text-sm text-slate-500">Daftarkan akun baru untuk menggunakan Delcom Auction.</p>
    <form class="mt-6 space-y-4" @submit.prevent="handleRegister">
      <div><label class="label">Nama Lengkap</label><input v-model="name" class="input" required /></div>
      <div><label class="label">Email</label><input v-model="email" class="input" type="email" required /></div>
      <div><label class="label">Password</label><input v-model="password" class="input" type="password" minlength="6" required /></div>
      <button class="btn-primary w-full" :disabled="authStore.isAuthRegister">{{ authStore.isAuthRegister ? 'Memproses...' : 'Daftar' }}</button>
    </form>
    <p class="mt-5 text-center text-sm text-slate-500">Sudah punya akun? <RouterLink class="font-semibold text-indigo-600" to="/auth/login">Masuk</RouterLink></p>
  </div>
</template>
<script setup>
import { ref } from 'vue'; import { useRouter } from 'vue-router'; import { useAuthStore } from '../states/authStore'; import { showSuccessDialog, showErrorDialog } from '../../../helpers/toolsHelper';
const name=ref(''); const email=ref(''); const password=ref(''); const authStore=useAuthStore(); const router=useRouter();
async function handleRegister(){ const res=await authStore.register({name:name.value.trim(),email:email.value.trim(),password:password.value}); if(res.status==='success'){await showSuccessDialog('Berhasil','Registrasi berhasil, silakan login.'); router.push('/auth/login');} else await showErrorDialog('Gagal',res.message||'Data tidak valid.'); }
</script>
