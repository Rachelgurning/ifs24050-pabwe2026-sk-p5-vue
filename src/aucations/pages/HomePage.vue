<template>
  <div class="space-y-6">
    <div class="bg-white p-6 rounded-xl shadow-sm">
      <h1 class="text-3xl font-bold text-gray-800">Daftar Lelang Aktif</h1>
      <p class="text-gray-600 mt-2">Temukan berbagai penawaran menarik dan ikuti lelang secara real-time.</p>
    </div>

    <!-- Grid Produk Lelang (Contoh) -->
    <div class="grid grid-cols-1 md:grid-cols-3 gap-6">
      <div class="bg-white p-4 rounded-xl shadow-sm border hover:shadow-md transition">
        <div class="h-48 bg-gray-200 rounded-lg mb-4 flex items-center justify-center text-gray-400">Foto Barang</div>
        <h3 class="font-bold text-lg text-gray-800">Barang Lelang #1</h3>
        <p class="text-gray-500 text-sm mt-1">Bid Saat Ini: <span class="font-semibold text-blue-600">Rp 500.000</span></p>
        <router-link to="/aucations/1" class="mt-4 block text-center bg-blue-50 text-blue-600 py-2 rounded-lg font-medium hover:bg-blue-100">
          Lihat Detail
        </router-link>
      </div>
    </div>
  </div>
</template>