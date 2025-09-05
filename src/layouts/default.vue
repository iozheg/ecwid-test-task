<template>
  <v-app-bar color="primary">
    <v-app-bar-nav-icon
      variant="text"
      @click.stop="drawer = !drawer"
    ></v-app-bar-nav-icon>

    <v-toolbar-title>{{ title }}</v-toolbar-title>
    <v-btn stacked @click="goToShoppingCart">
      <v-badge
        location="top right"
        color="success"
        :content="cartStore.itemCount"
      >
        <v-icon>mdi-cart</v-icon>
      </v-badge>
    </v-btn>
  </v-app-bar>

  <v-navigation-drawer v-model="drawer" temporary>
    <v-list :items="items"></v-list>
  </v-navigation-drawer>
  <v-main>
    <v-container>
      <v-breadcrumbs :items="breadcrumbs" divider="/"></v-breadcrumbs>
      <router-view />
    </v-container>
  </v-main>

  <AppFooter />
</template>

<script lang="ts" setup>
import { useAppBar } from '@/composables/useAppBar';
import { useBreadcrumbs } from '@/composables/useBreadcrumbs';
import { useShoppingCartStore } from '@/stores/shoppingCart';

const drawer = ref(false);
const group = ref(null);

const items = ['Categories'];

const { title } = useAppBar();

const { breadcrumbs } = useBreadcrumbs();

const cartStore = useShoppingCartStore();
const router = useRouter();
const goToShoppingCart = () => {
  router.push('/shoppingcart');
};

watch(group, () => {
  drawer.value = false;
});
</script>
