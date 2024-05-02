<template>
  <v-card>
    <v-navigation-drawer
      v-model="drawer"
      color="#1E2937"
      floating
      class="pt-15"
    >
      <v-list
        dense
        nav
      >
        <v-list-item
          v-for="(item, index) in menuItems"
          :key="index"
          :prepend-icon="item.icon"
          :title="item.title"
          :to="item.value"
          :value="item.value"
        />
      </v-list>
    </v-navigation-drawer>
  </v-card>
</template>
<script setup>
import { ref, watch } from 'vue';
const props = defineProps({
  drawer: Boolean
});
const menuItems = [
  { icon: 'mdi-calendar-multiselect-outline', title: 'Asistencia', value: '/attendance', },
  { icon: 'mdi-account', title: 'Usuario', value: '/users' },
  { icon: 'mdi-account-multiple', title: 'pacientes', value: '/patients' },
  { icon: 'mdi-charity', title: 'Cargo', value: '/charges' },
  { icon: 'mdi-information', title: 'Acerca de Mi', value: '/about' }
];
const drawer = ref(props.drawer);

watch(() => props.drawer, (newValue) => {
  drawer.value = newValue;
});
</script>
<style scoped>
.items {
  display: flex;
  align-items: center;
}

.text-list {
  padding-left: 26px;
}
</style>