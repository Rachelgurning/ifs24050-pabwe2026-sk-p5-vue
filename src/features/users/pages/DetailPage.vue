<script setup>
import { useRoute } from 'vue-router';
const route = useRoute();
</script>

<template>
  <div class="space-y-6">
    <div class="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
      <router-link to="/" class="text-blue-600 hover:underline text-sm mb-4 inline-block">&larr; Kembali ke Beranda</router-link>
      <h1 class="text-3xl font-bold text-gray-800">Detail Item Lelang #{{ route.params.id }}</h1>
      <p class="text-gray-600 mt-2">Informasi lengkap barang lelang, deskripsi, dan histori penawaran (bid).</p>
    </div>
  </div>
</template>