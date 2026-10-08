<template>
  <div class="space-y-6">
    <section><p class="text-xs font-bold uppercase tracking-wider text-indigo-600">Community</p><h1 class="page-title mt-1">Daftar Pengguna</h1><p class="page-subtitle">Direktori pengguna yang terdaftar di Delcom Auction.</p></section>
    <section class="rounded-2xl border border-slate-200 bg-white p-4 shadow-sm"><label for="user-search" class="sr-only">Cari pengguna</label><input id="user-search" v-model.trim="search" class="input !mt-0" placeholder="Cari nama atau email..." /></section>
    <section aria-labelledby="users-title" class="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm sm:p-6">
      <div class="mb-5 flex items-center justify-between"><h2 id="users-title" class="text-xl font-extrabold">Pengguna Terdaftar</h2><span class="rounded-full bg-slate-100 px-3 py-1 text-xs font-bold text-slate-600">{{ filtered.length }} pengguna</span></div>
      <div v-if="usersStore.isLoading" class="grid gap-4 sm:grid-cols-2 lg:grid-cols-3"><div v-for="i in 6" :key="i" class="h-24 animate-pulse rounded-2xl bg-slate-100"></div></div>
      <div v-else-if="!filtered.length" class="rounded-2xl bg-slate-50 p-10 text-center text-sm text-slate-500">Tidak ada pengguna yang cocok.</div>
      <div v-else class="grid gap-4 sm:grid-cols-2 lg:grid-cols-3"><article v-for="user in filtered" :key="user.id" class="flex items-center gap-4 rounded-2xl border border-slate-100 p-4"><img :src="user.photo || fallback" :alt="`Foto ${user.name}`" class="h-14 w-14 shrink-0 rounded-full bg-slate-100 object-cover" @error="fallbackImage"/><div class="min-w-0"><h3 class="truncate font-bold text-slate-900">{{ user.name || 'Pengguna' }}</h3><p class="truncate text-sm text-slate-500">{{ user.email || '-' }}</p></div></article></div>
    </section>
  </div>
</template>
<script setup>
import { computed, onMounted, ref } from 'vue'; import { useUsersStore } from '../states/usersStore';
const usersStore = useUsersStore(); const search = ref(''); const fallback = 'https://ui-avatars.com/api/?name=User&background=e2e8f0&color=334155'; const fallbackImage = (e) => { e.target.src = fallback; };
const filtered = computed(() => { const q = search.value.toLowerCase(); return q ? usersStore.users.filter((u) => `${u.name || ''} ${u.email || ''}`.toLowerCase().includes(q)) : usersStore.users; });
onMounted(() => usersStore.fetchUsers());
</script>
