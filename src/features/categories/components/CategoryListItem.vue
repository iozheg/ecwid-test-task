<script setup lang="ts">
import { defineProps } from 'vue';
import type { Category, Product } from '@/api/types';

const props = defineProps<{
  category: Category;
  products: Product[];
}>();

const addToCart = (event: PointerEvent, product: Product) => {
  event.stopPropagation();
  console.log('Adding to cart:', product);
};

const goToProduct = (product: Product) => {
  console.log('Navigating to product:', product);
};
</script>

<template>
  <v-sheet rounded>
    <v-container align-items="left" class="pl-0 pr-0">
      <v-row>
        <v-col>
          <v-btn variant="flat" size="large">{{ props.category.name }}</v-btn>
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
          <v-card
            variant="flat"
            link
            style="--v-hover-opacity: 0"
            @click="goToProduct(product)"
          >
            <v-img :src="product.imageUrl" height="300px" />
            <v-card-title class="text-body-1">{{ product.name }}</v-card-title>
            <v-card-text>{{
              product.defaultDisplayedPriceFormatted
            }}</v-card-text>
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
        </v-col>
      </v-row>
    </v-container>
  </v-sheet>
</template>
