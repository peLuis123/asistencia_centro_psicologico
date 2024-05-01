<template>
  <v-app-bar
    color="primary"
    prominent
  >
    <v-app-bar-nav-icon
      variant="text"
      @click.stop="drawer = !drawer"
    />

    <v-toolbar-title>My files</v-toolbar-title>

    <v-spacer />

    <template v-if="$vuetify.display.mdAndUp">
      <v-btn
        icon="mdi-magnify"
        variant="text"
      />

      <v-btn
        icon="mdi-filter"
        variant="text"
      />
    </template>

    <v-btn
      icon="mdi-dots-vertical"
      variant="text"
    />
  </v-app-bar>
</template>
  <script setup>
//   import { ref } from 'vue'
//   const items = ref([
//       { id: 1, text: 'home', to: "/home" },
//       { id: 2, text: 'listings', to: "/listings" },
//       { id: 3, text: 'contact', to: "/contact" },
//       { id: 4, text: 'landing', to: "/landing" },
//       { id: 5, text: 'services', to: "/listings" },
//       { id: 6, text: 'about', to: "/listings" },
//       { id: 7, text: 'listing', to: "/listings" }
//   ]);
  </script>