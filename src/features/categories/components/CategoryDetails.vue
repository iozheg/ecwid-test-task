<script setup lang="ts">
import { defineProps } from 'vue';
import type { Category, Product } from '@/api/types';
import { useAppBar } from '@/composables/useAppBar';
import { useQuery } from '@tanstack/vue-query';
import { categoriesQueryOptions } from '../api/categoriesQueryOptions';
import { productsQueryOptions } from '../api/productsQueryOptions';
import ProductItem from './ProductItem.vue';
import { useBreadcrumbs } from '@/composables/useBreadcrumbs';

const props = defineProps<{
  category: Category;
}>();

const { setTitle } = useAppBar();
setTitle(props.category.name);

const { setBreadcrumbs } = useBreadcrumbs();
setBreadcrumbs([
  {
    title: props.category.name,
    href: `/category/${props.category.id}`,
  },
]);

const { data: subCategories } = useQuery(
  categoriesQueryOptions({
    parentId: props.category.id,
    responseFields: ['id', 'name', 'parentId'],
  })
);

const selectedSubCategory = ref<number | null>(null);
const filterCategories = computed(() => {
  const subcategories = [];
  if (selectedSubCategory.value) {
    subcategories.push(selectedSubCategory.value);
  }
  return subcategories;
});

const productQuery = computed(() => {
  return productsQueryOptions({
    categoryId: props.category.id,
    subcategoriesIds: filterCategories.value,
    includeProductsFromSubcategories: true,
    responseFields: [
      'id',
      'name',
      'defaultDisplayedPriceFormatted',
      'sku',
      'imageUrl',
    ],
  });
});

const { data: productsData } = useQuery(productQuery);

const addToCart = (product: Product) => {
  console.log('Adding to cart:', product);
};

const router = useRouter();

const goToProduct = (product: Product) => {
  router.push(`/product/${product.id}`);
};
</script>

<template>
  <v-container>
    <v-row v-if="subCategories?.items.length">
      <v-col cols="12">
        <v-chip-group
          v-model="selectedSubCategory"
          selected-class="text-primary"
          column
        >
          <v-chip
            v-for="subcategory in subCategories.items"
            :key="subcategory.id"
            :value="subcategory.id"
          >
            {{ subcategory.name }}
          </v-chip>
        </v-chip-group>
      </v-col>
    </v-row>
    <v-row>
      <v-col
        v-for="product in productsData?.items"
        :key="product.id"
        cols="6"
        sm="6"
        md="4"
      >
        <ProductItem
          :product="product"
          @add-to-cart="addToCart($event)"
          @product-clicked="goToProduct($event)"
        />
      </v-col>
    </v-row>
  </v-container>
</template>
