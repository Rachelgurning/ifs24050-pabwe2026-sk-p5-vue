<template>
  <div class="overflow-hidden rounded-xl border border-slate-200 bg-white focus-within:border-indigo-500 focus-within:ring-2 focus-within:ring-indigo-100">
    <Editor
      ref="editorRef"
      :initial-value="modelValue"
      initial-edit-type="markdown"
      preview-style="tab"
      height="280px"
      @change="syncValue"
    />
  </div>
</template>

<script setup>
import { ref } from 'vue';
import { Editor } from '@toast-ui/vue-editor';
import '@toast-ui/editor/dist/toastui-editor.css';

defineProps({ modelValue: { type: String, default: '' } });
const emit = defineEmits(['update:modelValue']);
const editorRef = ref(null);

function syncValue() {
  const markdown = editorRef.value?.invoke?.('getMarkdown') ?? '';
  emit('update:modelValue', markdown);
}
</script>
