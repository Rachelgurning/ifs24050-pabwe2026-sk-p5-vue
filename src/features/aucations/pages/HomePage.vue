<template>
  <div class="space-y-6">
    <section class="rounded-3xl bg-gradient-to-br from-indigo-600 via-indigo-600 to-violet-600 p-6 text-white shadow-lg sm:p-8">
      <div class="flex flex-col gap-6 lg:flex-row lg:items-end lg:justify-between">
        <div>
          <span class="inline-flex rounded-full bg-white/15 px-3 py-1 text-xs font-bold uppercase tracking-wider">Auction Dashboard</span>
          <h1 class="mt-4 text-3xl font-extrabold tracking-tight sm:text-4xl">Temukan lelang terbaik.</h1>
          <p class="mt-2 max-w-2xl text-sm leading-6 text-indigo-100">Cari barang, pantau penawaran, dan kelola lelang kamu dalam satu tempat.</p>
        </div>
        <button class="rounded-xl bg-white px-5 py-3 text-sm font-bold text-indigo-700 shadow-sm hover:bg-indigo-50" type="button" @click="showAdd = true">+ Tambah Lelang</button>
      </div>
    </section>

    <section class="grid gap-4 sm:grid-cols-2 xl:grid-cols-4" aria-label="Ringkasan lelang">
      <div v-for="stat in stats" :key="stat.label" class="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
        <p class="text-sm font-medium text-slate-500">{{ stat.label }}</p><p class="mt-2 text-2xl font-extrabold text-slate-900">{{ stat.value }}</p>
      </div>
    </section>

    <section class="rounded-2xl border border-slate-200 bg-white p-4 shadow-sm sm:p-5">
      <div class="flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
        <div class="flex flex-wrap gap-2" role="tablist" aria-label="Filter lelang">
          <button v-for="tab in tabs" :key="tab.key" type="button" role="tab" :aria-selected="activeTab === tab.key" class="tab" :class="activeTab === tab.key ? 'tab-active' : ''" @click="setTab(tab.key)">{{ tab.label }}</button>
        </div>
        <div class="relative w-full lg:max-w-sm">
          <Search class="pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" :size="18" />
          <label class="sr-only" for="auction-search">Cari lelang</label>
          <input id="auction-search" v-model.trim="search" class="input !mt-0 pl-10" placeholder="Cari judul atau deskripsi..." />
        </div>
      </div>
    </section>

    <section aria-labelledby="auction-list-title">
      <div class="mb-4 flex items-end justify-between"><div><h2 id="auction-list-title" class="text-xl font-extrabold text-slate-900">Daftar Lelang</h2><p class="mt-1 text-sm text-slate-500">{{ filtered.length }} item ditemukan</p></div></div>
      <div v-if="store.isAucation" class="grid gap-5 sm:grid-cols-2 xl:grid-cols-3"><div v-for="i in 6" :key="i" class="h-96 animate-pulse rounded-2xl bg-white"></div></div>
      <div v-else-if="!filtered.length" class="rounded-2xl border border-dashed border-slate-300 bg-white p-12 text-center"><Gavel class="mx-auto text-slate-300" :size="44"/><h3 class="mt-4 font-bold text-slate-800">Belum ada lelang</h3><p class="mt-1 text-sm text-slate-500">Coba ubah filter pencarian atau buat lelang baru.</p></div>
      <div v-else class="grid gap-5 sm:grid-cols-2 xl:grid-cols-3">
        <article v-for="item in filtered" :key="item.id" class="group overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm transition hover:-translate-y-0.5 hover:shadow-lg">
          <div class="relative"><img :src="item.cover || placeholder" :alt="`Cover ${item.title}`" class="h-52 w-full object-cover" @error="fallback"/><span class="absolute left-3 top-3 badge" :class="isClosed(item) ? 'badge-red' : 'badge-green'">{{ isClosed(item) ? 'Ditutup' : 'Berlangsung' }}</span></div>
          <div class="p-5">
            <div class="flex items-start justify-between gap-3"><h3 class="line-clamp-2 text-lg font-extrabold text-slate-900">{{ item.title }}</h3><span v-if="isMine(item)" class="shrink-0 rounded-full bg-indigo-50 px-2 py-1 text-[11px] font-bold text-indigo-700">Milik saya</span></div>
            <p class="mt-2 line-clamp-2 min-h-10 text-sm leading-5 text-slate-500">{{ strip(item.description) }}</p>
            <div class="mt-4 grid grid-cols-2 gap-3"><div class="rounded-xl bg-slate-50 p-3"><p class="text-[11px] font-semibold uppercase text-slate-400">Harga awal</p><p class="mt-1 font-extrabold text-slate-900">{{ rupiah(item.start_bid) }}</p></div><div class="rounded-xl bg-indigo-50 p-3"><p class="text-[11px] font-semibold uppercase text-indigo-400">Bid tertinggi</p><p class="mt-1 font-extrabold text-indigo-700">{{ rupiah(highest(item)) }}</p></div></div>
            <p class="mt-4 flex items-center gap-2 text-xs text-slate-500"><Clock3 :size="15"/> {{ isClosed(item) ? `Berakhir ${date(item.closed_at)}` : `Ditutup ${date(item.closed_at)}` }}</p>
            <RouterLink :to="`/aucations/${item.id}`" class="btn-secondary mt-4 block text-center">Lihat Detail</RouterLink>
          </div>
        </article>
      </div>
    </section>
    <AddModal :open="showAdd" :loading="store.isAucationAdd" @close="showAdd = false" @submit="add" />
  </div>
</template>
<script setup>
import { computed, onMounted, ref, watch } from 'vue';
import { useRoute, useRouter } from 'vue-router';
import { Clock3, Gavel, Search } from 'lucide-vue-next';
import { useAucationsStore } from '../states/aucationsStore';
import { useUsersStore } from '../../users/states/usersStore';
import AddModal from '../modals/AddModal.vue';
import { formatRupiah, formatDate, showErrorDialog, showSuccessDialog } from '../../../helpers/toolsHelper';
const store = useAucationsStore(); const users = useUsersStore(); const route = useRoute(); const router = useRouter();
const search = ref(''); const showAdd = ref(false); const activeTab = ref(typeof route.query.tab === 'string' ? route.query.tab : 'all');
const tabs = [{ key: 'all', label: 'Semua Lelang' }, { key: 'mine', label: 'Lelang Saya' }, { key: 'open', label: 'Lelang Berlangsung' }, { key: 'closed', label: 'Lelang Ditutup' }];
const placeholder = 'https://placehold.co/800x500?text=Delcom+Auction';
const isClosed = (i) => new Date(i.closed_at).getTime() <= Date.now();
const highest = (i) => Math.max(Number(i.start_bid || 0), ...(i.bids || []).map((b) => Number(b.bid || 0)));
const strip = (v) => String(v || '').replace(/[#*_`>\[\]]/g, '').replace(/\([^)]*\)/g, '');
const isMine = (i) => Number(i.user_id) === Number(users.profile?.id);
const filtered = computed(() => { const q = search.value.toLowerCase(); return q ? store.aucations.filter((x) => `${x.title} ${x.description}`.toLowerCase().includes(q)) : store.aucations; });
const stats = computed(() => [{ label: 'Total lelang', value: store.aucations.length }, { label: 'Berlangsung', value: store.aucations.filter((x) => !isClosed(x)).length }, { label: 'Ditutup', value: store.aucations.filter(isClosed).length }, { label: 'Hasil pencarian', value: filtered.value.length }]);
const rupiah = formatRupiah; const date = formatDate; const fallback = (e) => { e.target.src = placeholder; };
async function load() { const params = {}; if (activeTab.value === 'mine') params.is_me = 1; if (activeTab.value === 'open') params.is_closed = 1; if (activeTab.value === 'closed') params.is_closed = 0; const r = await store.fetchAucations(params); if (r.status !== 'success') showErrorDialog('Gagal memuat lelang', r.message || 'Coba lagi.'); }
function setTab(tab) { activeTab.value = tab; router.replace({ query: tab === 'all' ? {} : { tab } }); }
watch(activeTab, load); onMounted(async () => { await users.fetchProfile(); await load(); });
async function add(data) { const r = await store.createAucation(data); if (r.status === 'success') { showAdd.value = false; await showSuccessDialog('Berhasil', 'Lelang berhasil ditambahkan.'); await load(); } else showErrorDialog('Gagal menambah lelang', r.message || 'Data lelang tidak valid.'); }
</script>
