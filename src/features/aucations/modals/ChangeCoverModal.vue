<template>
  <div v-if="open" class="fixed inset-0 z-[60] flex items-center justify-center bg-slate-950/60 p-4" role="dialog" aria-modal="true" aria-labelledby="cover-title">
    <form class="w-full max-w-lg rounded-3xl bg-white p-6 shadow-2xl" @submit.prevent="submit"><div class="flex items-start justify-between gap-4"><div><h2 id="cover-title" class="text-2xl font-extrabold">Ganti Cover</h2><p class="mt-1 text-sm text-slate-500">Pilih gambar untuk cover barang lelang.</p></div><button type="button" class="rounded-xl p-2 text-slate-500 hover:bg-slate-100" aria-label="Tutup modal" @click="$emit('close')">✕</button></div>
      <label for="cover-file" class="mt-6 flex cursor-pointer flex-col items-center justify-center rounded-2xl border-2 border-dashed border-slate-300 p-8 text-center hover:border-indigo-400"><span class="font-bold text-slate-700">Pilih gambar</span><span class="mt-1 text-xs text-slate-500">JPG, PNG, WEBP</span><input id="cover-file" class="sr-only" type="file" accept="image/*" required @change="pick" /></label><img v-if="preview" :src="preview" alt="Pratinjau cover" class="mt-4 h-48 w-full rounded-2xl object-cover" />
      <div class="mt-6 flex gap-3"><button type="button" class="btn-secondary flex-1" @click="$emit('close')">Batal</button><button class="btn-primary flex-1" type="submit" :disabled="!file || loading">{{ loading ? 'Mengunggah...' : 'Upload Cover' }}</button></div>
    </form>
  </div>
</template>
<script setup>
import { ref, watch, onBeforeUnmount } from 'vue'; const props = defineProps({ open: Boolean, loading: Boolean }); const emit = defineEmits(['close', 'submit']); const file = ref(null); const preview = ref('');
watch(() => props.open, (v) => { if (!v) { file.value = null; if (preview.value) URL.revokeObjectURL(preview.value); preview.value = ''; } });
function pick(e) { const selected = e.target.files?.[0]; if (!selected) return; file.value = selected; if (preview.value) URL.revokeObjectURL(preview.value); preview.value = URL.createObjectURL(selected); }
function submit() { if (file.value) emit('submit', file.value); }
onBeforeUnmount(() => { if (preview.value) URL.revokeObjectURL(preview.value); });
</script>
