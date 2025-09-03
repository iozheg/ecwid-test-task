<template>
  <v-app-bar color="primary">
    <v-app-bar-nav-icon
      variant="text"
      @click.stop="drawer = !drawer"
    ></v-app-bar-nav-icon>

    <v-toolbar-title>{{ title }}</v-toolbar-title>

    <template v-if="$vuetify.display.mdAndUp">
      <!-- <v-btn icon="mdi-magnify" variant="text"></v-btn>

      <v-btn icon="mdi-filter" variant="text"></v-btn> -->
    </template>

    <!-- <v-btn icon="mdi-dots-vertical" variant="text"></v-btn> -->
  </v-app-bar>

  <v-navigation-drawer v-model="drawer" temporary>
    <v-list :items="items"></v-list>
  </v-navigation-drawer>
  <v-main>
    <v-container>
      <router-view />
    </v-container>
  </v-main>

  <AppFooter />
</template>

<script lang="ts" setup>
import { useAppBar } from '@/composables/useAppBar';

const drawer = ref(false);
const group = ref(null);

const items = ['Categories'];

const { title } = useAppBar();

watch(group, () => {
  drawer.value = false;
});
</script>
