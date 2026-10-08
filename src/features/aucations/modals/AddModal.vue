<template>
  <div v-if="open" class="fixed inset-0 z-[60] flex items-center justify-center bg-slate-950/60 p-4" role="dialog" aria-modal="true" aria-labelledby="add-auction-title" @keydown.esc="$emit('close')">
    <form class="max-h-[92vh] w-full max-w-3xl overflow-y-auto rounded-3xl bg-white p-6 shadow-2xl sm:p-7" @submit.prevent="submit">
      <div class="flex items-start justify-between gap-4"><div><p class="text-xs font-bold uppercase tracking-wider text-indigo-600">Auction</p><h2 id="add-auction-title" class="mt-1 text-2xl font-extrabold">Tambah Lelang</h2></div><button type="button" class="rounded-xl p-2 text-slate-500 hover:bg-slate-100" aria-label="Tutup modal" @click="$emit('close')">✕</button></div>
      <div class="mt-6 space-y-5"><div><label for="add-title" class="label">Judul Barang</label><input id="add-title" v-model.trim="form.title" class="input" placeholder="Contoh: Laptop ASUS VivoBook" required /></div><div><label class="label">Deskripsi Barang</label><MarkdownEditor v-model="form.description" /></div><div class="grid gap-4 sm:grid-cols-2"><div><label for="add-bid" class="label">Harga Awal</label><input id="add-bid" v-model.number="form.start_bid" class="input" type="number" min="1" step="1" required /></div><div><label for="add-close" class="label">Batas Waktu Penutupan</label><input id="add-close" v-model="form.closed_at" class="input" type="datetime-local" required /></div></div></div>
      <div class="mt-7 flex flex-col-reverse gap-3 sm:flex-row sm:justify-end"><button type="button" class="btn-secondary" @click="$emit('close')">Batal</button><button class="btn-primary sm:min-w-40" type="submit" :disabled="loading">{{ loading ? 'Menyimpan...' : 'Simpan Lelang' }}</button></div>
    </form>
  </div>
</template>
<script setup>
import { reactive, watch } from 'vue'; import MarkdownEditor from '../components/MarkdownEditor.vue';
const props = defineProps({ open: Boolean, loading: Boolean }); const emit = defineEmits(['close', 'submit']);
const form = reactive({ title: '', description: '', start_bid: 1000, closed_at: '' });
watch(() => props.open, (v) => { if (v) Object.assign(form, { title: '', description: '', start_bid: 1000, closed_at: '' }); });
function submit() { const d = new Date(form.closed_at); emit('submit', { ...form, closed_at: d.toISOString().slice(0, 19).replace('T', ' ') }); }
</script>
