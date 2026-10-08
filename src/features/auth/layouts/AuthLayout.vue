<template>
  <div class="min-h-screen bg-slate-100 flex items-center justify-center p-4">
    <div class="w-full max-w-5xl overflow-hidden rounded-3xl bg-white shadow-xl md:grid md:grid-cols-2">
      <aside class="hidden md:flex bg-indigo-600 p-10 text-white flex-col justify-between" aria-label="Informasi Delcom Auction">
        <div>
          <div class="text-2xl font-bold">Delcom Auction</div>
          <p class="mt-4 text-white">Platform lelang barang berbasis API Delcom.</p>
        </div>
        <div class="rounded-2xl bg-white/10 p-6">
          <p class="text-lg font-semibold">Temukan barang. Ikuti lelang. Menangkan.</p>
          <p class="mt-2 text-sm text-white">Kelola lelang, bid, profil, dan pengguna dalam satu aplikasi.</p>
        </div>
      </aside>
      <main class="p-6 sm:p-10"><RouterView /></main>
    </div>
  </div>
</template>