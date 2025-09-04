<template>
  <CategoryDetails v-if="data && !isLoading" :category="data" />
</template>

<script lang="ts" setup>
import { categoryQueryOptions } from '@/features/categories/api/categoriesQueryOptions';
import CategoryDetails from '@/features/categories/components/CategoryDetails.vue';
import { useQuery } from '@tanstack/vue-query';

const route = useRoute('/category/[id]');
const { data, isLoading } = useQuery(
  categoryQueryOptions(Number(route.params.id))
);
</script>
