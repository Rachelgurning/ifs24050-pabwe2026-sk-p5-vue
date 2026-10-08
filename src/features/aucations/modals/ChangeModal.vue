<template>
  <div v-if="open" class="fixed inset-0 z-[60] flex items-center justify-center bg-slate-950/60 p-4" role="dialog" aria-modal="true" aria-labelledby="change-auction-title">
    <form class="max-h-[92vh] w-full max-w-3xl overflow-y-auto rounded-3xl bg-white p-6 shadow-2xl" @submit.prevent="submit">
      <div class="flex items-start justify-between gap-4"><div><p class="text-xs font-bold uppercase tracking-wider text-indigo-600">Auction</p><h2 id="change-auction-title" class="mt-1 text-2xl font-extrabold">Ubah Lelang</h2></div><button type="button" class="rounded-xl p-2 text-slate-500 hover:bg-slate-100" aria-label="Tutup modal" @click="$emit('close')">✕</button></div>
      <div class="mt-6 space-y-5"><div><label for="change-title" class="label">Judul Barang</label><input id="change-title" v-model.trim="form.title" class="input" required /></div><div><label class="label">Deskripsi Barang</label><MarkdownEditor v-model="form.description" /></div><div class="grid gap-4 sm:grid-cols-2"><div><label for="change-bid" class="label">Harga Awal</label><input id="change-bid" v-model.number="form.start_bid" class="input" type="number" min="1" required /></div><div><label for="change-close" class="label">Batas Waktu</label><input id="change-close" v-model="form.closed_at" class="input" type="datetime-local" required /></div></div></div>
      <div class="mt-7 flex flex-col-reverse gap-3 sm:flex-row sm:justify-end"><button type="button" class="btn-secondary" @click="$emit('close')">Batal</button><button class="btn-primary sm:min-w-40" type="submit" :disabled="loading">{{ loading ? 'Menyimpan...' : 'Simpan Perubahan' }}</button></div>
    </form>
  </div>
</template>
<script setup>
import { reactive, watch } from 'vue'; import MarkdownEditor from '../components/MarkdownEditor.vue';
const props = defineProps({ open: Boolean, item: Object, loading: Boolean }); const emit = defineEmits(['close', 'submit']); const form = reactive({ title: '', description: '', start_bid: 0, closed_at: '' });
watch(() => props.item, (i) => { if (i) Object.assign(form, { title: i.title || '', description: i.description || '', start_bid: Number(i.start_bid || 0), closed_at: i.closed_at ? i.closed_at.slice(0, 16).replace(' ', 'T') : '' }); }, { immediate: true });
function submit() { const d = new Date(form.closed_at); emit('submit', { ...form, closed_at: d.toISOString().slice(0, 19).replace('T', ' ') }); }
</script>
