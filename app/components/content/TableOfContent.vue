<template>
  <nav v-if="toc?.links?.length" class="toc-container">
    <div v-if="toc.title" class="toc-header">
      {{ toc.title }}
    </div>
    <ul class="toc-list">
      <li
        v-for="link in flattenLinks"
        :key="link.id"
        class="toc-item"
        :class="{
          active: activeIds.includes(link.id),
          [`toc-h${link.depth}`]: true,
          'has-children': link.children?.length,
        }"
      >
        <NuxtLink
          :to="`#${link.id}`"
          class="toc-link"
          @click.prevent="scrollTo(link.id)"
        >
          {{ link.text }}
        </NuxtLink>
      </li>
    </ul>
  </nav>
</template>

<script lang="ts" setup>
import type { Toc } from "~/types";

interface Props {
  toc?: Toc;
  contentSelector?: string;
}

const props = withDefaults(defineProps<Props>(), {
  toc: () => ({
    title: "",
    searchDepth: 2,
    depth: 3,
    links: [],
  }),
  contentSelector: ".prose",
});

// Преобразуем вложенную структуру в плоский массив
const flattenLinks = computed(() => {
  const result: Array<{
    id: string;
    text: string;
    depth: number;
    children?: Toc["links"];
  }> = [];

  const flatten = (links: Toc["links"], depth = 2) => {
    links?.forEach((link) => {
      result.push({ ...link, depth });
      if (link.children) flatten(link.children, depth + 1);
    });
  };

  flatten(props.toc?.links);
  return result;
});

const activeIds = ref<string[]>([]);

// Настраиваем IntersectionObserver для множества элементов
const setupObserver = () => {
  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        const id = entry.target.id;
        if (entry.isIntersecting) {
          if (!activeIds.value.includes(id)) {
            activeIds.value = [...activeIds.value, id];
          }
        } else {
          activeIds.value = activeIds.value.filter((item) => item !== id);
        }
      });

      // Сортируем по порядку в документе
      const elements = flattenLinks.value
        .filter((link) => activeIds.value.includes(link.id))
        .map((link) => document.getElementById(link.id))
        .filter(Boolean) as HTMLElement[];

      if (elements.length > 0) {
        const sortedIds = elements
          .sort((a, b) => a.offsetTop - b.offsetTop)
          .map((el) => el.id);

        activeIds.value = sortedIds;
      }
    },
    {
      rootMargin: "0px 0px -50% 0px",
      threshold: 0.5,
    },
  );

  // Наблюдаем все заголовки из toc
  flattenLinks.value.forEach((link) => {
    const element = document.getElementById(link.id);
    if (element) observer.observe(element);
  });

  return observer;
};

let observer: IntersectionObserver | null = null;

onMounted(() => {
  nextTick(() => {
    observer = setupObserver();

    // Инициализация по хэшу
    if (window.location.hash) {
      const id = window.location.hash.replace("#", "");
      if (!activeIds.value.includes(id)) {
        activeIds.value = [id];
      }
    }
  });
});

onBeforeUnmount(() => {
  observer?.disconnect();
});

// Плавный скролл к якорю
const scrollTo = (id: string) => {
  const element = document.getElementById(id);
  if (element) {
    const { y } = element.getBoundingClientRect();
    window.scrollTo({
      top: window.scrollY + y - 100,
      behavior: "smooth",
    });
    history.pushState({}, "", `#${id}`);
  }
};
</script>

<style scoped>
/* Стили остаются такими же, как в предыдущем примере */
.toc-container {
  position: sticky;
  top: 2rem;
  max-height: calc(100vh - 4rem);
  overflow-y: auto;
}

.toc-header {
  font-weight: 600;
  padding-bottom: 0.5rem;
  margin-bottom: 0.5rem;
  border-bottom: 1px solid #e5e7eb;
}

.toc-list {
  list-style: none;
  padding: 0;
  margin: 0;
  border-left: 1px solid #e5e7eb;
}

.toc-item {
  margin-bottom: 0.25rem;
  position: relative;
}

.toc-item:before {
  content: "";
  position: absolute;
  left: -1px;
  top: 0;
  height: 100%;
  width: 2px;
  background-color: transparent;
  transition: background-color 0.2s ease;
}

.toc-item.active:before {
  background-color: #3b82f6;
}

.toc-link {
  display: block;
  padding: 0.25rem 0;
  color: #6b7280;
  text-decoration: none;
  transition: all 0.2s ease;
  font-size: 0.875rem;
  line-height: 1.25rem;
}

.toc-item.active .toc-link {
  color: #1e40af;
  font-weight: 500;
}

/* Уровни вложенности */
.toc-h2 {
  padding-left: 1rem;
}

.toc-h3 {
  padding-left: 1.5rem;
  font-size: 0.8125rem;
}

.toc-h4 {
  padding-left: 2rem;
  font-size: 0.75rem;
}

.toc-link:hover {
  color: #3b82f6;
}
</style>
