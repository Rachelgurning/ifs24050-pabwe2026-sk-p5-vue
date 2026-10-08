<template>
  <div class="space-y-6">
    <div class="flex items-center justify-between gap-3"><RouterLink to="/" class="inline-flex items-center gap-2 text-sm font-bold text-indigo-600 hover:underline">← Kembali ke dashboard</RouterLink><span v-if="store.aucation" class="badge" :class="closed ? 'badge-red' : 'badge-green'">{{ closed ? 'Ditutup' : 'Berlangsung' }}</span></div>
    <div v-if="store.isAucation && !store.aucation" class="space-y-5"><div class="h-80 animate-pulse rounded-3xl bg-white"></div><div class="h-40 animate-pulse rounded-3xl bg-white"></div></div>
    <div v-else-if="store.aucation" class="space-y-6">
      <section class="grid gap-6 lg:grid-cols-5">
        <div class="overflow-hidden rounded-3xl border border-slate-200 bg-white shadow-sm lg:col-span-3"><img :src="store.aucation.cover || placeholder" :alt="`Cover ${store.aucation.title}`" class="max-h-[560px] min-h-80 w-full object-cover" @error="fallback" /></div>
        <div class="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm lg:col-span-2">
          <p class="text-xs font-bold uppercase tracking-wider text-indigo-600">Detail Lelang</p>
          <h1 class="mt-3 text-3xl font-extrabold tracking-tight text-slate-900">{{ store.aucation.title }}</h1>
          <p class="mt-2 text-sm text-slate-500">Oleh {{ store.aucation.author?.name || store.aucation.user?.name || 'Pengguna' }}</p>
          <div class="mt-6 grid gap-3 sm:grid-cols-2 lg:grid-cols-1"><div class="rounded-2xl bg-slate-50 p-4"><p class="text-xs font-semibold uppercase text-slate-400">Harga awal</p><p class="mt-1 text-xl font-extrabold">{{ rupiah(store.aucation.start_bid) }}</p></div><div class="rounded-2xl bg-indigo-50 p-4"><p class="text-xs font-semibold uppercase text-indigo-400">Bid tertinggi</p><p class="mt-1 text-2xl font-extrabold text-indigo-700">{{ rupiah(highest) }}</p></div></div>
          <div class="mt-4 flex items-center gap-2 rounded-xl bg-slate-50 p-3 text-sm text-slate-600"><Clock3 :size="17"/> {{ closed ? `Berakhir ${date(store.aucation.closed_at)}` : `Batas ${date(store.aucation.closed_at)}` }}</div>
          <div class="mt-5 space-y-2">
            <button v-if="!isOwner && !closed" class="btn-primary w-full" type="button" @click="showBid = true">Ajukan Bid</button>
            <button v-if="store.aucation.my_bid" class="btn-secondary w-full" type="button" @click="removeBid">Batalkan Bid Saya</button>
            <div v-if="isOwner" class="grid grid-cols-2 gap-2"><button class="btn-secondary" type="button" @click="showChange = true">Ubah</button><button class="btn-secondary" type="button" @click="showCover = true">Ganti Cover</button><button class="col-span-2 rounded-xl bg-red-50 px-4 py-3 text-sm font-bold text-red-600 hover:bg-red-100" type="button" @click="removeAuction">Hapus Lelang</button></div>
          </div>
        </div>
      </section>
      <section class="grid gap-6 lg:grid-cols-3">
        <div class="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm lg:col-span-2"><h2 class="text-xl font-extrabold">Deskripsi Barang</h2><div class="mt-4"><MarkdownViewer :text="store.aucation.description" /></div></div>
        <div class="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm"><h2 class="text-xl font-extrabold">Riwayat Bid</h2><div class="mt-5 space-y-3"><div v-for="bid in store.aucation.bids || []" :key="bid.id" class="rounded-xl border border-slate-100 p-3"><div class="flex items-center justify-between gap-3"><span class="font-extrabold text-indigo-700">{{ rupiah(bid.bid) }}</span><span class="text-xs text-slate-400">{{ date(bid.created_at) }}</span></div><p v-if="bid.user?.name" class="mt-1 text-xs text-slate-500">{{ bid.user.name }}</p></div><p v-if="!(store.aucation.bids || []).length" class="rounded-xl bg-slate-50 p-5 text-center text-sm text-slate-500">Belum ada penawaran.</p></div></div>
      </section>
    </div>
    <div v-else class="rounded-3xl border border-dashed border-slate-300 bg-white p-12 text-center"><h2 class="font-bold text-slate-800">Lelang tidak ditemukan</h2><p class="mt-1 text-sm text-slate-500">Periksa kembali ID lelang yang kamu buka.</p><RouterLink to="/" class="btn-primary mt-5 inline-block">Kembali</RouterLink></div>
    <BidModal :open="showBid" :current="highest" :loading="store.isBidAdd" @close="showBid = false" @submit="bid" />
    <ChangeModal :open="showChange" :item="store.aucation" :loading="store.isAucationChange" @close="showChange = false" @submit="change" />
    <ChangeCoverModal :open="showCover" :loading="store.isAucationChangeCover" @close="showCover = false" @submit="cover" />
  </div>
</template>
<script setup>
import { computed, onMounted, ref } from 'vue';
import { useRoute, useRouter } from 'vue-router';
import { Clock3 } from 'lucide-vue-next';
import { useAucationsStore } from '../states/aucationsStore';
import { useUsersStore } from '../../users/states/usersStore';
import { formatRupiah, formatDate, showConfirmDialog, showErrorDialog, showSuccessDialog } from '../../../helpers/toolsHelper';
import MarkdownViewer from '../components/MarkdownViewer.vue'; import BidModal from '../modals/BidModal.vue'; import ChangeModal from '../modals/ChangeModal.vue'; import ChangeCoverModal from '../modals/ChangeCoverModal.vue';
const route = useRoute(); const router = useRouter(); const store = useAucationsStore(); const users = useUsersStore();
const showBid = ref(false); const showChange = ref(false); const showCover = ref(false); const placeholder = 'https://placehold.co/1000x700?text=Delcom+Auction';
const closed = computed(() => new Date(store.aucation?.closed_at).getTime() <= Date.now());
const highest = computed(() => Math.max(Number(store.aucation?.start_bid || 0), ...(store.aucation?.bids || []).map((b) => Number(b.bid || 0))));
const isOwner = computed(() => Number(store.aucation?.user_id) === Number(users.profile?.id));
const rupiah = formatRupiah; const date = formatDate; const fallback = (e) => { e.target.src = placeholder; };
async function refresh() { const r = await store.fetchAucationDetail(route.params.aucationId); if (r.status !== 'success') showErrorDialog('Gagal', r.message || 'Lelang tidak ditemukan.'); }
onMounted(async () => { await users.fetchProfile(); await refresh(); });
async function bid(value) { const r = await store.addBid(route.params.aucationId, value); if (r.status === 'success') { showBid.value = false; await showSuccessDialog('Berhasil', 'Bid berhasil dikirim.'); await refresh(); } else showErrorDialog('Gagal', r.message || 'Bid gagal dikirim.'); }
async function removeBid() { const r = await store.deleteBid(route.params.aucationId); if (r.status === 'success') { await showSuccessDialog('Berhasil', 'Bid dibatalkan.'); await refresh(); } else showErrorDialog('Gagal', r.message || 'Gagal membatalkan bid.'); }
async function change(data) { const r = await store.updateAucation(route.params.aucationId, data); if (r.status === 'success') { showChange.value = false; await showSuccessDialog('Berhasil', 'Lelang diperbarui.'); await refresh(); } else showErrorDialog('Gagal', r.message || 'Gagal mengubah lelang.'); }
async function cover(file) { const r = await store.uploadCover(route.params.aucationId, file); if (r.status === 'success') { showCover.value = false; await showSuccessDialog('Berhasil', 'Cover diperbarui.'); await refresh(); } else showErrorDialog('Gagal', r.message || 'Gagal mengganti cover.'); }
async function removeAuction() { const c = await showConfirmDialog('Hapus lelang?', 'Data lelang ini akan dihapus permanen.'); if (!c.isConfirmed) return; const r = await store.deleteAucation(route.params.aucationId); if (r.status === 'success') { await showSuccessDialog('Berhasil', 'Lelang dihapus.'); router.replace('/'); } else showErrorDialog('Gagal', r.message || 'Gagal menghapus lelang.'); }
</script>
