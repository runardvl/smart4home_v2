<script setup lang="ts">
const props = withDefaults(
  defineProps<{
    color?: string | null;
    size?: string | null;
    target?: string | null;
    to?: string | null;
    variant?: string | null;
  }>(),
  {
    color: "gray",
    size: "md",
  },
);
const slots = defineSlots();
</script>

<template>
  <main>
    <div>
      <h1>
        <slot v-if="slots.title" name="title" mdc-unwrap="p" />
      </h1>
      <slot name="description" class="some-paragraph" />
      <slot name="links" :mdc-unwrap="false">
        <UButton :color :size :target :to :variant />
      </slot>
    </div>
    <div>
      <NuxtImg src="/images/main-page/home-hero.svg" alt="" />
    </div>
  </main>
</template>
