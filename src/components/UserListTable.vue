<template>
  <v-data-table :headers="headers" :items="items" :search="search" :items-per-page-text="'Mostrar'">
    <template #item.actions="{ item }">
      <v-btn fab class="mr-1" small color="yellow" size="25" @click="$emit('edit-item', item)">
        <v-icon>mdi-square-edit-outline</v-icon>
      </v-btn>
      <v-btn fab small color="red" size="25" @click="$emit('delete-item', item)">
        <v-icon>mdi-delete</v-icon>
      </v-btn>
    </template>
  </v-data-table>
</template>

<script setup>
import { ref, watch } from 'vue';

const props = defineProps({
  items: {
    type: Array,
    default: () => []
  }
});

const search = ref('');
const items = ref(props.items);
watch(() => props.items, (newValue) => {
  items.value = newValue;
});

const headers = ref([
  { key: 'id', title: 'ID', sortable: false },
  { key: 'name', title: 'NOMBRES' },
  // { key: 'apellidos', title: 'APELLIDOS', sortable: false },
  { key: 'usuario', title: 'USUARIO', sortable: false },
  { key: 'actions', title: 'ACCIONES', sortable: false }
]);
</script>
