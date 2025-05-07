<script setup lang="ts">
import type { LanguageKey } from "~/types";
const languageIcons: Record<LanguageKey, string> = {
  txt: "text",
  text: "text",
  json: "json",
  js: "js-official",
  ts: "typescript-official",
  html: "html",
  css: "css",
  vue: "vue",
  shell: "shell",
  bash: "shell",
  mdc: "markdown",
  md: "markdown",
  yaml: "light-yaml",
  yml: "light-yaml",
  python: "python",
  py: "python",
  c: "c",
  cpp: "cpp",
  csharp: "csharp",
};

const props = withDefaults(
  defineProps<{
    code?: string;
    language?: string | null;
    filename?: string | null;
    highlights?: string | [];
    meta?: string | null;
    class?: string | null;
  }>(),
  {
    code: "",
    language: null,
    filename: null,
    highlights: () => [],
    meta: null,
    class: null,
  },
);

const copied = ref(false);

const languageIcon = computed(() => {
  const normalizedLang = props.language?.toLowerCase() as LanguageKey;
  return languageIcons[normalizedLang];
});

const copyCode = async () => {
  try {
    const code = props.code;
    await navigator.clipboard.writeText(code);
    copied.value = true;
    setTimeout(() => {
      copied.value = false;
    }, 2000);
  } catch (err) {
    console.error("Не удалось скопировать код:", err);
  }
};

// console.log(props);
</script>

<template>
  <div class="ring-1 ring-gray-200 rounded-md">
    <header
      v-if="filename"
      class="flex justify-between px-4 py-2 bg-white text-gray-600 rounded-t-md"
    >
      <div class="flex items-center gap gap-2 font-mono text-sm">
        <UIcon :name="`vscode-icons:file-type-${languageIcon}`" />
        <span v-if="filename">{{ filename }}</span>
      </div>
      <UButton
        :icon="copied ? 'mdi:check' : 'mdi:content-copy'"
        variant="outline"
        size="xs"
        color="neutral"
        class="cursor-pointer"
        :ui="{
          leadingIcon: 'text-gray-600',
        }"
        @click="copyCode"
      />
    </header>
    <div class="relative">
      <UButton
        v-if="!filename"
        :icon="copied ? 'mdi:check' : 'mdi:content-copy'"
        variant="outline"
        size="xs"
        color="neutral"
        class="cursor-pointer absolute top-3 right-4"
        :ui="{
          leadingIcon: 'text-gray-600',
        }"
        @click="copyCode"
      />
      <pre
        :class="[
          $props.class,
          'mt-0 rounded-t-none bg-gray-100 border-t-1 border-gray-200',
          language === 'text' || language === 'txt' ? 'text-gray-500' : '',
        ]"
      ><slot /></pre>
    </div>
  </div>
</template>

<style>
pre code .line {
  display: block;
}
</style>
