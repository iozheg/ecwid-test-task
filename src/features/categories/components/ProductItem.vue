<script setup lang="ts">
import { defineProps } from 'vue';
import type { Product } from '@/api/types';

defineProps<{
  product: Product;
}>();

const emits = defineEmits<{
  (e: 'add-to-cart', product: Product): void;
  (e: 'product-clicked', product: Product): void;
}>();

const goToProduct = (product: Product) => {
  emits('product-clicked', product);
};

const addToCart = (event: PointerEvent, product: Product) => {
  event.stopPropagation();
  emits('add-to-cart', product);
};
</script>

<template>
  <v-card
    variant="flat"
    link
    style="--v-hover-opacity: 0"
    @click="goToProduct(product)"
  >
    <v-img :src="product.imageUrl" height="300px" />
    <v-card-title class="text-body-1">{{ product.name }}</v-card-title>
    <v-card-text>{{ product.defaultDisplayedPriceFormatted }}</v-card-text>
    <v-card-actions>
      <v-btn
        color="deep-purple-lighten-2"
        text="BUY"
        block
        border
        @click="addToCart($event, product)"
      />
    </v-card-actions>
  </v-card>
</template>
