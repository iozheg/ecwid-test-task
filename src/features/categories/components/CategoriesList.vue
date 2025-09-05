<script setup lang="ts">
import { useQueries, useQuery } from '@tanstack/vue-query';
import { categoriesQueryOptions } from '../api/categoriesQueryOptions';
import { productsQueryOptions } from '../api/productsQueryOptions';
import CategoryListItem from './CategoryListItem.vue';
import { useAppBar } from '@/composables/useAppBar';
import { useBreadcrumbs } from '@/composables/useBreadcrumbs';

const { setTitle } = useAppBar();
setTitle('Categories');

const { setBreadcrumbs } = useBreadcrumbs();
setBreadcrumbs([]);

const { data: categoriesData } = useQuery(
  categoriesQueryOptions({
    responseFields: ['id', 'name', 'parentId'],
  })
);

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
    mainCategoriesIds.value.map((id) =>
      productsQueryOptions({
        categoryId: id,
        limit: 3,
        responseFields: [
          'id',
          'name',
          'defaultDisplayedPriceFormatted',
          'sku',
          'imageUrl',
        ],
      })
    )
  ),
});
</script>

<template>
  <div>
    <CategoryListItem
      v-for="(category, index) in mainCategories"
      :key="category.id"
      :category="category"
      :products="productsData[index]?.data?.items || []"
    />
  </div>
</template>
