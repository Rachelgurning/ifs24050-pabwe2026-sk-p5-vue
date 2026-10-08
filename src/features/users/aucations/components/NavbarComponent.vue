<template>
  <header class="bg-white shadow-sm border-b px-6 py-4 flex justify-between items-center">
    <h1 class="text-xl font-bold text-indigo-600">Delcom Auction Dashboard</h1>
    <button @click="handleLogout" class="bg-red-500 text-white px-4 py-2 rounded text-sm hover:bg-red-600">Keluar</button>
  </header>
</template>

<script setup>
import { useAuthStore } from '../../auth/states/authStore';
import { useRouter } from 'vue-router';
const authStore = useAuthStore();
const router = useRouter();

function handleLogout() {
  authStore.logout();
  router.push('/auth/login');
}
</script>