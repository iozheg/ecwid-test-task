<script setup lang="ts">
import type { Category, Product } from '@/api/types';
import ProductItem from './ProductItem.vue';

const props = defineProps<{
  category: Category;
  products: Product[];
}>();

const addToCart = (product: Product) => {
  console.log('Adding to cart:', product);
};

const router = useRouter();

const goToCategory = (category: Category) => {
  router.push(`/category/${category.id}`);
};

const goToProduct = (product: Product) => {
  router.push(`/product/${product.id}`);
};
</script>

<template>
  <v-sheet rounded>
    <v-container align-items="left" class="pl-0 pr-0">
      <v-row>
        <v-col>
          <v-btn
            variant="flat"
            size="large"
            @click="goToCategory(props.category)"
            >{{ props.category.name }}</v-btn
          >
        </v-col>
      </v-row>
      <v-row>
        <v-col
          v-for="product in props.products"
          :key="product.id"
          cols="6"
          sm="6"
          md="4"
        >
          <ProductItem
            :product="product"
            @add-to-cart="addToCart"
            @product-clicked="goToProduct($event)"
          />
        </v-col>
      </v-row>
    </v-container>
  </v-sheet>
</template>
