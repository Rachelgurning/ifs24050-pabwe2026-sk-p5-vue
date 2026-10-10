<template>
  <div v-if="aucationsStore.aucation" class="max-w-4xl mx-auto bg-white rounded-lg shadow p-6 space-y-6">
    <div class="flex flex-col md:flex-row gap-6">
      <img :src="aucationsStore.aucation.cover || 'https://via.placeholder.com/400'" :alt="`Foto lelang ${aucationsStore.aucation.title}`" class="w-full md:w-1/2 h-72 object-cover rounded-lg shadow" />
      <div class="flex-1 space-y-4">
        <h2 class="text-3xl font-bold">{{ aucationsStore.aucation.title }}</h2>
        <p class="text-gray-700">{{ aucationsStore.aucation.description }}</p>
        <div class="border-t pt-4 space-y-2">
          <p class="text-sm text-gray-500">Harga Awal: <span class="font-semibold text-gray-800">{{ formatRupiah(aucationsStore.aucation.start_bid) }}</span></p>
          <p class="text-lg font-bold text-indigo-600">Tawaran Tertinggi: {{ formatRupiah(aucationsStore.aucation.highest_bid || aucationsStore.aucation.start_bid) }}</p>
        </div>

        <!-- Form Bidding -->
        <form @submit.prevent="handleBid" class="space-y-3 pt-4 border-t">
          <div>
            <label for="bid-amount-input" class="block text-sm font-medium text-gray-700">Nominal Tawaran (Bid)</label>
            <input id="bid-amount-input" v-model.number="bidAmount" type="number" class="mt-1 block w-full px-3 py-2 border rounded-md shadow-sm" required />
          </div>
          <button type="submit" class="w-full bg-indigo-600 text-white py-2 rounded-md hover:bg-indigo-700 font-medium">Kirim Tawaran</button>
        </form>
      </div>
    </div>
  </div>
  <div v-else class="text-center py-10 text-gray-500">Memuat detail lelang...</div>
</template>

<script setup>
import { ref, onMounted } from 'vue';
import { useRoute } from 'vue-router';
import { useAucationsStore } from '../states/aucationsStore';
import { formatRupiah, showSuccessDialog, showErrorDialog } from '../../../helpers/toolsHelper';

const route = useRoute();
const aucationsStore = useAucationsStore();
const bidAmount = ref(0);

onMounted(async () => {
  await aucationsStore.fetchAucationDetail(route.params.id);
  if (aucationsStore.aucation) {
    bidAmount.value = aucationsStore.aucation.highest_bid || aucationsStore.aucation.start_bid + 1000;
  }
});

async function handleBid() {
  const res = await aucationsStore.addBid(route.params.id, bidAmount.value);
  if (res.error === false || res.error == null) {
    await showSuccessDialog('Berhasil', 'Tawaran berhasil dikirim!');
    await aucationsStore.fetchAucationDetail(route.params.id);
  } else {
    await showErrorDialog('Gagal', res.message || 'Gagal mengirim tawaran.');
  }
}
</script>