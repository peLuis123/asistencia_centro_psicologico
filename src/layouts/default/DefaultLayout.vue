<template>
  <!-- en caso que quieras crear un sidebard y un app-bar se agrega aqui y ya se aplican a todas las rutas hijas -->
  <v-app>
    <default-view />

    <navigationDrawer :drawer="drawer" />
    <navbar @some-event="test" />
  </v-app>
</template>

<script setup>
import DefaultView from './ViewLayout.vue'
import navigationDrawer from '@/components/NavigationDrawer.vue';
import navbar from '@/components/NavBar.vue';
import { ref } from 'vue';
const drawer = ref(true);
function test() {
  drawer.value = !drawer.value;
}

</script>
