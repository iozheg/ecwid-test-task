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
        <v-icon icon="shopping_cart"></v-icon>
      </v-badge>
    </v-btn>
  </v-app-bar>

  <v-navigation-drawer v-model="drawer" temporary>
    <v-list>
      <v-list-item v-for="item in navigationItems" :key="item.to" :to="item.to">
        {{ item.title }}
      </v-list-item>
    </v-list>
  </v-navigation-drawer>
  <v-main>
    <v-container>
      <v-breadcrumbs :items="breadcrumbs" divider="/"></v-breadcrumbs>
      <router-view />
    </v-container>
  </v-main>
</template>

<script lang="ts" setup>
import { useAppBar } from '@/composables/useAppBar';
import { useBreadcrumbs } from '@/composables/useBreadcrumbs';
import { useShoppingCartStore } from '@/stores/shoppingCart';

const drawer = ref(false);
const group = ref(null);

const navigationItems = [
  { title: 'Categories', to: '/' },
  { title: 'Shopping Cart', to: '/shoppingcart' },
];

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
