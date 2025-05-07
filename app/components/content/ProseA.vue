<script lang="ts" setup>
const props = defineProps({
  href: {
    type: String,
    default: "",
  },
  target: {
    type: String,
    default: void 0,
    required: false,
  },
});
const isExternal = computed(() => {
  if (!props.href) return false;

  return props.href.startsWith("http");
});
</script>

<template>
  <NuxtLink
    :href="props.href"
    :target="isExternal ? '_blank' : null"
    :rel="isExternal ? 'noopener noreferrer' : null"
    class="font-bold border-b border-primary-400 no-underline hover:border-b-2 inline-flex items-center gap-1"
  >
    <slot />
    <UIcon v-if="isExternal" name="mdi:launch" />
  </NuxtLink>
</template>

<style scoped>
/* .external-link {
  @apply text-blue-600 hover:text-blue-800;
} */
</style>
