<template>
  <div class="profile-card">
    <h2>Profil Pengguna</h2>
    <p><strong>Username:</strong> {{ authStore.user?.username || 'Tamu' }}</p>
    <p><strong>Role:</strong> {{ authStore.user?.role || '-' }}</p>
  </div>
</template>

<script setup>
import { useAuthStore } from '../auth/authStore';
const authStore = useAuthStore();
</script>