<template>
  <div class="space-y-6">
    <div class="flex justify-between items-center">
      <h2 class="text-2xl font-bold">Daftar Lelang Barang</h2>
      <button @click="showAddModal = true" class="bg-indigo-600 text-white px-4 py-2 rounded hover:bg-indigo-700">+ Tambah Lelang</button>
    </div>

    <!-- Filter Tabs -->
    <div class="flex space-x-2">
      <button @click="filter = {}" :class="['px-4 py-2 rounded', Object.keys(filter).length === 0 ? 'bg-indigo-600 text-white' : 'bg-white']">Semua</button>
      <button @click="filter = { is_me: true }" :class="['px-4 py-2 rounded', filter.is_me ? 'bg-indigo-600 text-white' : 'bg-white']">Lelang Saya</button>
    </div>

    <!-- Grid Lelang -->
    <div class="grid grid-cols-1 md:grid-cols-3 gap-6">
      <div v-for="item in aucationsStore.aucations" :key="item.id" class="bg-white rounded-lg shadow overflow-hidden flex flex-col">
        <img :src="item.cover || 'https://via.placeholder.com/300'" class="h-48 w-full object-cover" />
        <div class="p-4 flex-1 flex flex-col justify-between">
          <div>
            <h3 class="font-bold text-lg mb-1">{{ item.title }}</h3>
            <p class="text-gray-600 text-sm mb-2">Harga Awal: {{ formatRupiah(item.start_bid) }}</p>
            <p class="text-indigo-600 font-semibold">Tawaran Tertinggi: {{ formatRupiah(item.highest_bid || item.start_bid) }}</p>
          </div>
          <router-link :to="`/aucations/${item.id}`" class="mt-4 block text-center bg-gray-100 hover:bg-gray-200 py-2 rounded text-indigo-600 font-medium">Lihat Detail</router-link>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, watchEffect } from 'vue';
import { useAucationsStore } from '../states/aucationsStore';
import { formatRupiah } from '../../../helpers/toolsHelper';

const aucationsStore = useAucationsStore();
const filter = ref({});
const showAddModal = ref(false);

watchEffect(() => {
  aucationsStore.fetchAucations(filter.value);
});
</script>