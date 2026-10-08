<template>
  <div class="min-h-screen bg-gray-100 flex flex-col">
    <!-- Navbar -->
    <header class="bg-white shadow-sm">
      <nav class="max-w-7xl mx-auto px-4 py-4 flex justify-between items-center">
        <router-link to="/" class="text-xl font-bold text-blue-600">Delcom Auction</router-link>
        <div class="space-x-4">
          <router-link to="/" class="text-gray-600 hover:text-blue-600">Beranda</router-link>
          <router-link to="/users" class="text-gray-600 hover:text-blue-600">Pengguna</router-link>
          <router-link to="/profile" class="text-gray-600 hover:text-blue-600">Profil</router-link>
          <router-link to="/auth/login" class="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700">Masuk</router-link>
        </div>
      </nav>
    </header>

    <!-- Konten Halaman -->
    <main class="flex-grow max-w-7xl w-full mx-auto px-4 py-6">
      <RouterView />
    </main>

    <!-- Footer -->
    <footer class="bg-white border-t py-4 text-center text-gray-500 text-sm">
      &copy; 2026 Delcom Auction - Institut Teknologi Del
    </footer>
  </div>
</template>