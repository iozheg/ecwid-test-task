<template>
  <v-container>
    <v-row justify="center" align-content="center">
      <v-col md="8" xs="12">
        <v-sheet
          v-if="!visibleItems.length && !isLoading"
          class="d-flex flex-column align-center"
        >
          <div class="text-center mb-4">Your shopping cart is empty.</div>
          <v-btn to="/">Continue Shopping</v-btn>
        </v-sheet>

        <template v-else>
          <v-sheet
            v-for="item in visibleItems"
            :key="item.id"
            class="d-flex mb-6"
            style="height: 150px"
          >
            <v-img :src="item.product.thumbnailUrl" inline width="150" />
            <div>
              <div class="text-body-1 font-weight-bold">
                {{ item.product.name }}
              </div>
              <div class="text-subtitle-1 mb-4">
                {{ currencySign
                }}{{
                  item.product.price
                    ? `${(item.product.price * item.quantity).toFixed(2)}`
                    : '0.00'
                }}
              </div>
              <div>
                Quantity:
                <div class="d-flex align-center ga-2" style="width: 200px">
                  <v-number-input
                    control-variant="split"
                    :min="1"
                    density="compact"
                    variant="outlined"
                    hide-details
                    :model-value="item.quantity"
                    @update:model-value="
                      (value) => cartStore.setItemQuantity(item.id, value)
                    "
                  ></v-number-input>
                  <v-btn
                    icon="delete"
                    variant="text"
                    class="text-red"
                    density="comfortable"
                    @click="cartStore.removeFromCart(item.id)"
                  ></v-btn>
                </div>
              </div>
            </div>
          </v-sheet>
          <v-divider />
          <div class="text-h5 font-weight-bold mt-4">
            Total Price: {{ currencySign
            }}{{ totalPrice ? `${totalPrice.toFixed(2)}` : '0.00' }}
          </div>
          <v-btn
            color="primary"
            class="mt-4"
            :disabled="!cartStore.items.length"
            @click="placeOrder"
          >
            Place Order
          </v-btn>
        </template>
      </v-col>
    </v-row>
  </v-container>

  <v-dialog v-model="successDialog" max-width="500">
    <v-card>
      <v-card-text>
        Congratulations! Your order has been placed successfully.
      </v-card-text>

      <v-card-actions>
        <v-spacer></v-spacer>

        <v-btn text="Close" @click="successDialog = false"></v-btn>
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>

<script lang="ts" setup>
import { useAppBar } from '@/composables/useAppBar';
import { useBreadcrumbs } from '@/composables/useBreadcrumbs';
import { productsQueryOptions } from '@/features/categories/api/productsQueryOptions';
import { useShoppingCartStore } from '@/stores/shoppingCart';
import { useQuery } from '@tanstack/vue-query';

const { setTitle } = useAppBar();
setTitle('Shopping Cart');

const { setBreadcrumbs } = useBreadcrumbs();
setBreadcrumbs([{ title: 'Shopping Cart', to: '' }]);

const cartStore = useShoppingCartStore();

const { data, isLoading } = useQuery({
  ...productsQueryOptions({
    productIds: cartStore.items.map((item) => item.id),
    responseFields: [
      'id',
      'name',
      'price',
      'thumbnailUrl',
      'defaultDisplayedPriceFormatted',
    ],
  }),
  enabled: cartStore.items.length > 0,
});

const visibleItems = computed(() => {
  return cartStore.items
    .map((cartItem) => {
      const product = data.value?.items.find((item) => item.id === cartItem.id);
      return {
        ...cartItem,
        product: product!,
      };
    })
    .filter((item) => item.product);
});

const currencySign = computed(() => {
  return data.value?.items[0]?.defaultDisplayedPriceFormatted?.charAt(0) || '$';
});

const totalPrice = computed(() => {
  return data.value?.items.reduce((acc, item) => {
    const quantity =
      cartStore.items.find((cartItem) => cartItem.id === item.id)?.quantity ||
      0;
    return acc + item.price * quantity;
  }, 0);
});

const successDialog = ref(false);

const placeOrder = () => {
  successDialog.value = true;
  cartStore.clearCart();
};
</script>
