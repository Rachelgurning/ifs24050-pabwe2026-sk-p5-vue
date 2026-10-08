<template>
<div class="space-y-6"><div><h1 class="page-title">Daftar Pengguna</h1><p class="page-subtitle">Direktori seluruh pengguna yang terdaftar di Delcom Auction.</p></div>
<div class="rounded-2xl bg-white border border-slate-200 overflow-hidden"><div v-if="usersStore.isLoading" class="p-8 text-center text-slate-500">Memuat pengguna...</div><div v-else-if="!usersStore.users.length" class="p-8 text-center text-slate-500">Belum ada data pengguna.</div><div v-else class="divide-y divide-slate-100"><div v-for="user in usersStore.users" :key="user.id" class="flex items-center gap-4 p-5"><img :src="user.photo || fallback" class="h-12 w-12 rounded-full object-cover bg-slate-100" @error="fallbackImage"/><div class="min-w-0"><p class="font-semibold text-slate-900">{{user.name}}</p><p class="text-sm text-slate-500">{{user.email}}</p></div></div></div></div></div>
</template>
<script setup>
import { onMounted } from 'vue'; import { useUsersStore } from '../states/usersStore'; const usersStore=useUsersStore(); const fallback='https://ui-avatars.com/api/?name=User'; const fallbackImage=(e)=>{e.target.src=fallback}; onMounted(()=>usersStore.fetchUsers());
</script>
