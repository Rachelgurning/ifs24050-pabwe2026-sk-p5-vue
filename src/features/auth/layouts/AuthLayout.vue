<template>
  <div class="min-h-screen bg-slate-100 flex items-center justify-center p-4">
    <div class="w-full max-w-5xl overflow-hidden rounded-3xl bg-white shadow-xl md:grid md:grid-cols-2">
      <div class="hidden md:flex bg-indigo-600 p-10 text-white flex-col justify-between">
        <div>
          <div class="text-2xl font-bold">Delcom Auction</div>
          <p class="mt-4 text-indigo-100">Platform lelang barang berbasis API Delcom.</p>
        </div>
        <div class="rounded-2xl bg-white/10 p-6">
          <p class="text-lg font-semibold">Temukan barang. Ikuti lelang. Menangkan.</p>
          <p class="mt-2 text-sm text-indigo-100">Kelola lelang, bid, profil, dan pengguna dalam satu aplikasi.</p>
        </div>
      </div>
      <div class="p-6 sm:p-10"><RouterView /></div>
    </div>
  </div>
</template>
