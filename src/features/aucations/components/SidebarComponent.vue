<template>
    <div v-if="open" class="fixed inset-0 z-40 bg-slate-950/50 md:hidden" aria-hidden="true" @click="$emit('close')"></div>
    <aside :class="['fixed inset-y-0 left-0 z-50 w-72 transform bg-slate-950 px-4 pt-20 text-white transition-transform md:static md:z-auto md:w-64 md:translate-x-0 md:pt-5', open ? 'translate-x-0' : '-translate-x-full']">
      <div class="mb-5 px-3">
        <p class="text-xs font-bold uppercase tracking-[0.18em] text-slate-500">Menu Utama</p>
      </div>
      <nav class="space-y-1" aria-label="Navigasi utama">
        <RouterLink v-for="item in items" :key="item.to" :to="item.to" class="flex items-center gap-3 rounded-xl px-3 py-3 text-sm font-semibold text-slate-300 hover:bg-slate-800 hover:text-white" active-class="bg-indigo-600 !text-white" @click="$emit('close')">
          <component :is="item.icon" :size="18" />
          {{ item.label }}
        </RouterLink>
      </nav>
    </aside>
</template>
<script setup>
import { LayoutDashboard, Gavel, Users, UserCircle } from 'lucide-vue-next';
defineProps({ open: Boolean });
defineEmits(['close']);
const items = [
  { to: '/', label: 'Dashboard Lelang', icon: LayoutDashboard },
  { to: '/?tab=mine', label: 'Lelang Saya', icon: Gavel },
  { to: '/users', label: 'Daftar Pengguna', icon: Users },
  { to: '/profile', label: 'Profil Saya', icon: UserCircle },
];
</script>
