<script setup lang="ts">
import { useQueries, useQuery } from '@tanstack/vue-query';
import { categoriesQueryOptions } from '../api/categoriesQueryOptions';
import { productsQueryOptions } from '../api/productsQueryOptions';

const { data: categoriesData } = useQuery(categoriesQueryOptions());

const mainCategories = computed(() =>
  categoriesData.value
    ? categoriesData.value.items.filter(item => !item.parentId)
    : []
);
const mainCategoriesIds = computed(() =>
  mainCategories.value.map(item => item.id)
);

const productsData = useQueries({
  queries: computed(() =>
    mainCategoriesIds.value.map(id =>
      productsQueryOptions([id], 10)
    )
  ),
});
</script>

<template>
  <div>
    <h2>Categories</h2>
    <ul>
      <li v-for="(category, index) in mainCategories" :key="category.id">{{ category.name }}
        <ul>
          <li v-for="product in productsData[index]?.data?.items" :key="product.id">{{ product.name }}</li>
        </ul>
      </li>
    </ul>
  </div>
</template>
