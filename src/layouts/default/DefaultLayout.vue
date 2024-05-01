<template>
  <!-- en caso que quieras crear un sidebard y un app-bar se agrega aqui y ya se aplican a todas las rutas hijas -->

  <v-app>
    <default-view />
    <navigationDrawer />
    <navbar />
  </v-app>
</template>

<script setup>
import DefaultView from './ViewLayout.vue'
import navigationDrawer from '@/components/navigationDrawer.vue';
import navbar from '@/components/navBar.vue';
</script>
