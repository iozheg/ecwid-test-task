<template>
  <ProductDetails v-if="data && !isLoading" :product="data" />
</template>

<script lang="ts" setup>
import { productQueryOptions } from '@/features/categories/api/productsQueryOptions';
import ProductDetails from '@/features/categories/components/ProductDetails.vue';
import { useQuery } from '@tanstack/vue-query';

const route = useRoute('/product/[id]');
const { data, isLoading } = useQuery(
  productQueryOptions({
    id: Number(route.params.id),
    responseFields: [
      'id',
      'name',
      'description',
      'defaultDisplayedPriceFormatted',
      'sku',
      'imageUrl',
      'galleryImages(id, url, smallThumbnailUrl)',
      'options',
    ],
  })
);
</script>
