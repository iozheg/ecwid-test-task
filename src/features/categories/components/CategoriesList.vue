<script setup lang="ts">
import { useQueries, useQuery } from '@tanstack/vue-query';
import { categoriesQueryOptions } from '../api/categoriesQueryOptions';
import { productsQueryOptions } from '../api/productsQueryOptions';
import CategoryListItem from './CategoryListItem.vue';
import { useAppBar } from '@/composables/useAppBar';

const { setTitle } = useAppBar();
setTitle('Categories');

const { data: categoriesData } = useQuery(categoriesQueryOptions());

const mainCategories = computed(() =>
  categoriesData.value
    ? categoriesData.value.items.filter((item) => !item.parentId)
    : []
);
const mainCategoriesIds = computed(() =>
  mainCategories.value.map((item) => item.id)
);

const productsData = useQueries({
  queries: computed(() =>
    mainCategoriesIds.value.map((id) => productsQueryOptions([id], 3))
  ),
});
</script>

<template>
  <div>
    <h2>Categories</h2>
    <CategoryListItem
      v-for="(category, index) in mainCategories"
      :key="category.id"
      :category="category"
      :products="productsData[index]?.data?.items || []"
    />
  </div>
</template>
