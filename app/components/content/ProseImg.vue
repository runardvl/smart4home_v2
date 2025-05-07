<script lang="ts" setup>
import { withTrailingSlash, withLeadingSlash, joinURL } from "ufo";
import { useRuntimeConfig, computed } from "#imports";
const props = defineProps({
  src: {
    type: String,
    default: "",
  },
  alt: {
    type: String,
    default: "",
  },
  width: {
    type: [String, Number],
    default: void 0,
  },
  height: {
    type: [String, Number],
    default: void 0,
  },
});
const refinedSrc = computed(() => {
  if (props.src?.startsWith("/") && !props.src.startsWith("//")) {
    const _base = withLeadingSlash(
      withTrailingSlash(useRuntimeConfig().app.baseURL),
    );
    if (_base !== "/" && !props.src.startsWith(_base)) {
      return joinURL(_base, props.src);
    }
  }
  return props.src;
});
</script>

<template>
  <ClientOnly>
    <div class="max-w-fit">
      <ClientOnly>
        <NuxtImg
          :src="refinedSrc"
          :alt="props.alt"
          :width="props.width"
          :height="props.height"
          class="mb-1"
        />
      </ClientOnly>
      <span
        v-if="alt"
        class="block mt-2 mb-4 text-center text-sm text-gray-500"
        >{{ alt }}</span
      >
    </div>
  </ClientOnly>
</template>
