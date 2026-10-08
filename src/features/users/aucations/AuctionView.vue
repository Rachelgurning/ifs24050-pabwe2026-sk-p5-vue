<template>
  <div class="auction-container">
    <h2>Delcom Auction - Daftar Lelang</h2>
    <div v-for="item in items" :key="item.id" class="auction-item">
      <h3>{{ item.name }}</h3>
      <p>Harga Awal: {{ formatRupiah(item.startPrice) }}</p>
      <p>Tawaran Tertinggi: <strong>{{ formatRupiah(item.highestBid) }}</strong></p>
      <input type="number" v-model.number="item.userBid" placeholder="Masukkan penawaran" />
      <button @click="placeBid(item)">Tawar</button>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue';
import { formatRupiah } from '../../helpers/formatters';

const items = ref([
  { id: 1, name: 'Laptop Dell Latitude', startPrice: 3000000, highestBid: 3000000, userBid: 0 },
  { id: 2, name: 'Monitor LG 24 Inch', startPrice: 1200000, highestBid: 1200000, userBid: 0 }
]);

function placeBid(item) {
  if (item.userBid > item.highestBid) {
    item.highestBid = item.userBid;
    alert(`Berhasil menawar ${item.name} dengan harga ${formatRupiah(item.userBid)}`);
  } else {
    alert('Penawaran harus lebih tinggi dari tawaran saat ini!');
  }
}
</script>