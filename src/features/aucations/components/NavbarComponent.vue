<template>
  <header class="sticky top-0 z-40 border-b border-slate-200 bg-white/95 backdrop-blur">
    <div class="flex h-16 items-center justify-between px-4 sm:px-6">
      <div class="flex items-center gap-3">
        <button class="md:hidden rounded-xl border border-slate-200 p-2" type="button" aria-label="Buka menu" @click="$emit('menu')">
          <Menu :size="20" />
        </button>
        <RouterLink to="/" class="text-lg font-extrabold tracking-tight text-indigo-600">Delcom Auction</RouterLink>
      </div>
      <div class="flex items-center gap-2 sm:gap-3">
        <RouterLink to="/profile" class="hidden items-center gap-2 rounded-xl px-3 py-2 text-sm font-semibold text-slate-600 hover:bg-slate-100 sm:flex">
          <UserCircle :size="18" />
          <span>{{ auth.user?.name || 'Profil Saya' }}</span>
        </RouterLink>
        <button id="logout-button" data-testid="logout-button" class="rounded-xl bg-red-50 px-3 py-2 text-sm font-semibold text-red-600 hover:bg-red-100" type="button" @click="logout">Keluar</button>
      </div>
    </div>
  </header>
</template>
<script setup>
import { Menu, UserCircle } from 'lucide-vue-next';
import { useRouter } from 'vue-router';
import { useAuthStore } from '../../auth/states/authStore';
import { showConfirmDialog } from '../../../helpers/toolsHelper';

defineEmits(['menu']);
const router = useRouter();
const auth = useAuthStore();
async function logout() {
  const result = await showConfirmDialog('Keluar dari akun?', 'Sesi kamu akan diakhiri.');
  if (result.isConfirmed) {
    await auth.logout();
    router.replace('/auth/login');
  }
}
</script>
