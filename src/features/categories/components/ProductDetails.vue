<script setup lang="ts">
import type { Product, ProductOptionChoice } from '@/api/types';
import { useAppBar } from '@/composables/useAppBar';

const props = defineProps<{
  product: Product;
}>();

const { setTitle } = useAppBar();
setTitle(props.product.name);

const images = computed(() => {
  return [
    {
      id: 0,
      url: props.product.imageUrl,
      smallThumbnailUrl: props.product.imageUrl,
    },
    ...props.product.galleryImages,
  ];
});

const size = ref<ProductOptionChoice | null>(null);
const sizeOptions = props.product.options?.find((o) => o.type === 'SIZE');
if (sizeOptions) {
  const sizeChoices = sizeOptions.choices || [];
  size.value = sizeChoices[sizeOptions.defaultChoice] || null;
}

const addToCart = () => {
  // Add the product to the cart with the selected size
};
</script>

<template>
  <v-container>
    <v-row
      ><v-col cols="12" md="6" sm="12">
        <v-carousel>
          <v-carousel-item
            v-for="image in images"
            :key="image.id"
            :src="image.url"
            cover
          ></v-carousel-item>
        </v-carousel>
      </v-col>
      <v-col cols="12" md="6" sm="12">
        <div class="text-h5 font-weight-bold mb-2">
          {{ props.product.name }}
        </div>
        <div class="text-subtitle-1 font-weight-bold mb-8">
          {{ props.product.defaultDisplayedPriceFormatted }}
        </div>
        <v-sheet v-if="sizeOptions" class="mb-8">
          <div>{{ sizeOptions.nameTranslated.nl }}:</div>
          <v-btn-toggle v-model="size" mandatory variant="outlined">
            <v-btn
              v-for="choice in sizeOptions.choices"
              :key="choice.text"
              :value="choice"
            >
              {{ choice.textTranslated.nl }}
            </v-btn>
          </v-btn-toggle>
        </v-sheet>

        <v-btn class="mb-8" color="primary" @click="addToCart"
          >Add to Cart</v-btn
        >

        <div class="text-subtitle-1" v-html="props.product.description"></div>
      </v-col>
    </v-row>
  </v-container>
</template>
