<script setup lang="ts">
const { data: page } = await useAsyncData(() => {
  return queryCollection("docs").path("/").first();
});
useSeoMeta({
  title: page.value?.title,
  description: page.value?.description,
});
if (!page.value) {
  throw createError({
    statusCode: 404,
    statusMessage: "Page not found",
    fatal: true,
  });
}
</script>

<template>
  <div class="container">
    <ContentRenderer v-if="page" :value="page" class="prose" />
    <div v-else>Page not found</div>
  </div>
</template>
