<template>
  <div class="overflow-hidden rounded-xl border border-slate-200 bg-white p-4">
    <Viewer :initial-value="text || '*Belum ada deskripsi.*'" />
  </div>
</template>

<script setup>
import { Viewer } from '@toast-ui/vue-editor';
import '@toast-ui/editor/dist/toastui-editor-viewer.css';

defineProps({ text: { type: String, default: '' } });
</script>
