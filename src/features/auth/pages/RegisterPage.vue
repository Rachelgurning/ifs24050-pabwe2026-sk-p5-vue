<template>
  <section aria-labelledby="register-title">
    <h1 id="register-title" class="text-2xl font-bold text-slate-900">Buat akun</h1>
    <p class="mt-1 text-sm text-slate-600">Daftarkan akun baru untuk menggunakan Delcom Auction.</p>
    <form class="mt-6 space-y-4" aria-label="Form registrasi" @submit.prevent="handleRegister">
      <div><label class="label" for="register-name-input">Nama Lengkap</label><input id="register-name-input" data-testid="register-name-input" v-model="name" class="input" required autocomplete="name" /></div>
      <div><label class="label" for="register-email-input">Email</label><input id="register-email-input" data-testid="register-email-input" v-model="email" class="input" type="email" required autocomplete="email" /></div>
      <div><label class="label" for="register-password-input">Password</label><input id="register-password-input" data-testid="register-password-input" v-model="password" class="input" type="password" minlength="6" required autocomplete="new-password" /></div>
      <button type="submit" class="btn-primary w-full" :disabled="authStore.isAuthRegister" :aria-busy="authStore.isAuthRegister">{{ authStore.isAuthRegister ? 'Memproses...' : 'Daftar' }}</button>
    </form>
    <p class="mt-5 text-center text-sm text-slate-600">Sudah punya akun? <RouterLink class="font-semibold text-indigo-700 underline-offset-2 hover:underline" to="/auth/login">Masuk</RouterLink></p>
  </section>
</template>
<script setup>
import { ref } from 'vue'; import { useRouter } from 'vue-router'; import { useAuthStore } from '../states/authStore'; import { showSuccessDialog, showErrorDialog } from '../../../helpers/toolsHelper';
const name=ref(''); const email=ref(''); const password=ref(''); const authStore=useAuthStore(); const router=useRouter();
async function handleRegister(){ const res=await authStore.register({name:name.value.trim(),email:email.value.trim(),password:password.value}); if(res.status==='success'){await showSuccessDialog('Berhasil','Registrasi berhasil, silakan login.'); router.push('/auth/login');} else await showErrorDialog('Gagal',res.message||'Data tidak valid.'); }
</script>