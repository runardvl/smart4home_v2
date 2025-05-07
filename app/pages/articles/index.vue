<script setup lang="ts">
const { data: page } = await useAsyncData(() => {
  return queryCollection("docs").path("/articles").first();
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
  <ContentRenderer v-if="page" :value="page" />
  <div v-else>Page not found</div>
</template>
