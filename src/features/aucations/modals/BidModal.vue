<template>
  <div v-if="open" class="fixed inset-0 z-[60] flex items-center justify-center bg-slate-950/60 p-4" role="dialog" aria-modal="true" aria-labelledby="bid-title">
    <form class="w-full max-w-md rounded-3xl bg-white p-6 shadow-2xl" @submit.prevent="submit">
      <h2 id="bid-title" class="text-2xl font-extrabold">Ajukan Bid</h2><p class="mt-2 text-sm leading-6 text-slate-500">Penawaran harus lebih tinggi dari bid tertinggi saat ini.</p>
      <div class="mt-5 rounded-xl bg-indigo-50 p-4"><p class="text-xs font-semibold uppercase text-indigo-500">Bid tertinggi</p><p class="mt-1 font-extrabold text-indigo-700">{{ formatRupiah(current) }}</p></div>
      <div class="mt-5"><label for="bid-value" class="label">Nominal Penawaran</label><input id="bid-value" v-model.number="bid" class="input" type="number" :min="minimum" step="1" required /></div>
      <div class="mt-6 flex gap-3"><button type="button" class="btn-secondary flex-1" @click="$emit('close')">Batal</button><button class="btn-primary flex-1" type="submit" :disabled="loading">{{ loading ? 'Mengirim...' : 'Kirim Bid' }}</button></div>
    </form>
  </div>
</template>
<script setup>
import { computed, ref, watch } from 'vue'; import { formatRupiah } from '../../../helpers/toolsHelper';
const props = defineProps({ open: Boolean, current: { type: Number, default: 0 }, loading: Boolean }); const emit = defineEmits(['close', 'submit']); const bid = ref(0); const minimum = computed(() => Number(props.current || 0) + 1);
watch(() => props.open, (v) => { if (v) bid.value = minimum.value; });
function submit() { if (Number(bid.value) >= minimum.value) emit('submit', Number(bid.value)); }
</script>
