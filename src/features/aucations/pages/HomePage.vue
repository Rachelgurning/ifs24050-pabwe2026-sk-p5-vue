<template>
  <section class="space-y-6" aria-labelledby="dashboard-title">
    <div class="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
      <div>
        <h1 id="dashboard-title" class="page-title">Dashboard Lelang</h1>
        <p class="page-subtitle">
          Kelola dan ikuti lelang barang dari Delcom Auction.
        </p>
      </div>

      <button type="button" class="btn-primary" @click="showAdd = true">
        + Tambah Lelang
      </button>
    </div>

    <div
      class="flex flex-wrap gap-2"
      role="tablist"
      aria-label="Filter lelang"
    >
      <button
        v-for="tab in tabs"
        :key="tab.key"
        type="button"
        class="tab"
        :class="activeTab === tab.key ? 'tab-active' : ''"
        role="tab"
        :aria-selected="activeTab === tab.key"
        @click="activeTab = tab.key"
      >
        {{ tab.label }}
      </button>
    </div>

    <div>
      <label class="sr-only" for="auction-search-input">
        Cari lelang
      </label>
      <input
        id="auction-search-input"
        v-model="search"
        class="input bg-white"
        placeholder="Cari judul atau deskripsi lelang..."
        type="search"
      />
    </div>

    <output
      v-if="store.isAucation"
      class="block rounded-2xl bg-white p-10 text-center text-slate-600"
      aria-live="polite"
    >
      Memuat lelang...
    </output>

    <div
      v-else-if="filtered.length === 0"
      class="rounded-2xl bg-white p-10 text-center text-slate-600"
    >
      Belum ada lelang yang sesuai.
    </div>

    <div v-else class="grid gap-5 sm:grid-cols-2 xl:grid-cols-3">
      <article
        v-for="(item, index) in filtered"
        :key="item.id"
        class="overflow-hidden rounded-2xl border bg-white shadow-sm"
      >
        <img
          :src="item.cover || placeholder"
          :alt="`Cover lelang ${item.title}`"
          :loading="index === 0 ? 'eager' : 'lazy'"
          :fetchpriority="index === 0 ? 'high' : 'auto'"
          decoding="async"
          class="h-52 w-full object-cover"
          @error="fallback"
        />

        <div class="p-5">
          <div class="flex items-start justify-between gap-3">
            <h2 class="text-lg font-bold">{{ item.title }}</h2>
            <span
              class="badge"
              :class="isClosed(item) ? 'badge-red' : 'badge-green'"
            >
              {{ isClosed(item) ? 'Ditutup' : 'Berlangsung' }}
            </span>
          </div>

          <p class="mt-2 line-clamp-2 text-sm text-slate-600">
            {{ strip(item.description) }}
          </p>

          <p class="mt-4 text-sm text-slate-600">Harga awal</p>
          <p class="font-bold text-indigo-700">
            {{ rupiah(item.start_bid) }}
          </p>

          <p class="mt-1 text-sm text-slate-600">
            Bid tertinggi:
            <b class="text-slate-800">{{ rupiah(highest(item)) }}</b>
          </p>

          <p class="mt-1 text-xs text-slate-600">
            Berakhir {{ date(item.closed_at) }}
          </p>

          <RouterLink
            :to="`/aucations/${item.id}`"
            class="btn-secondary mt-4 block text-center"
          >
            Lihat Detail
          </RouterLink>
        </div>
      </article>
    </div>

    <AddModal
      :open="showAdd"
      :loading="store.isAucationAdd"
      @close="showAdd = false"
      @submit="add"
    />
  </section>
</template>

<script setup>
import { computed, ref, onMounted, watch } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { useAucationsStore } from '../states/aucationsStore'
import AddModal from '../modals/AddModal.vue'
import {
  formatRupiah,
  formatDate,
  showErrorDialog,
  showSuccessDialog,
} from '../../../helpers/toolsHelper'

const store = useAucationsStore()
const route = useRoute()
const router = useRouter()

const search = ref('')
const showAdd = ref(false)

const tabs = [
  { key: 'all', label: 'Semua Lelang' },
  { key: 'mine', label: 'Lelang Saya' },
  { key: 'open', label: 'Lelang Berlangsung' },
  { key: 'closed', label: 'Lelang Ditutup' },
]

const TAB_KEYS = new Set(tabs.map((tab) => tab.key))

const initialTab = String(route.query.tab || 'all')
const activeTab = ref(
  TAB_KEYS.has(initialTab) ? initialTab : 'all',
)

const placeholder = 'https://placehold.co/800x500?text=Delcom+Auction'

function isClosed(item) {
  return new Date(item.closed_at).getTime() <= Date.now()
}

function highest(item) {
  return Math.max(
    Number(item.start_bid || 0),
    ...(item.bids || []).map((bid) => Number(bid.bid || 0)),
  )
}

function rupiah(value) {
  return formatRupiah(value)
}

function date(value) {
  return formatDate(value)
}

function strip(value) {
  return String(value || '').replaceAll(/[#*_`]/g, '')
}

function fallback(event) {
  event.target.src = placeholder
}

const filtered = computed(() => {
  let auctions = store.aucations

  if (activeTab.value === 'open') {
    auctions = auctions.filter((item) => !isClosed(item))
  }

  if (activeTab.value === 'closed') {
    auctions = auctions.filter((item) => isClosed(item))
  }

  const query = search.value.toLowerCase()

  return query
    ? auctions.filter((item) =>
        `${item.title} ${item.description}`.toLowerCase().includes(query),
      )
    : auctions
})

async function load() {
  const params = {}

  if (activeTab.value === 'mine') {
    params.is_me = 1
  }

  if (activeTab.value === 'open') {
    params.is_closed = 1
  }

  if (activeTab.value === 'closed') {
    params.is_closed = 0
  }

  const result = await store.fetchAucations(params)

  if (result.status !== 'success') {
    await showErrorDialog(
      'Gagal',
      result.message || 'Gagal mengambil data lelang.',
    )
  }
}

watch(activeTab, (value) => {
  router.replace({
    query: {
      ...(value === 'all' ? {} : { tab: value }),
    },
  })

  load()
})

onMounted(load)

async function add(data) {
  const result = await store.createAucation(data)

  if (result.status === 'success') {
    showAdd.value = false
    await showSuccessDialog('Berhasil', 'Lelang berhasil ditambahkan.')
    await load()
  } else {
    showErrorDialog(
      'Gagal',
      result.message || 'Data lelang tidak valid.',
    )
  }
}
</script>
