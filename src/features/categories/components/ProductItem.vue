<script setup lang="ts">
import type { Product } from '@/api/types';
import { useShoppingCartStore } from '@/stores/shoppingCart';

defineProps<{
  product: Product;
}>();

const emits = defineEmits<{
  (e: 'product-clicked', product: Product): void;
}>();

const goToProduct = (product: Product) => {
  emits('product-clicked', product);
};

const cartStore = useShoppingCartStore();
const addToCart = (event: PointerEvent, product: Product) => {
  event.stopPropagation();
  cartStore.addToCart({
    id: product.id,
    quantity: 1,
  });
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
