<template>
  <div class="flex min-h-screen bg-gray-100">
    <SidebarComponent />
    <div class="flex-1 flex flex-col">
      <NavbarComponent />
      <main class="p-6 flex-1">
        <RouterView />
      </main>
    </div>
  </div>
</template>

<script setup>
import SidebarComponent from '../components/SidebarComponent.vue';
import NavbarComponent from '../components/NavbarComponent.vue';
</script>