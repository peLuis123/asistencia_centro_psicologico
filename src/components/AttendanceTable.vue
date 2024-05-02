<!-- eslint-disable vue/valid-v-slot -->
<template>
  <v-card

    flat
  >
    <template #text>
      <v-text-field
        v-model="search"
        label="Search"
        prepend-inner-icon="mdi-magnify"
        variant="outlined"
        hide-details
        single-line
      />
    </template>

    <v-data-table
      :headers="headers"
      :items="items"
      :search="search"
      :items-per-page-text="'Mostrar'"
    >
      <template #item.actions="{ item }">
        <v-btn
          fab
          small
          color="red"
          size="25"
          @click="handleAction(item)"
        >
          <v-icon>mdi-delete</v-icon>
        </v-btn>
      </template>
    </v-data-table>
  </v-card>
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
watch(() => search, (newValue) => {
    search.value = newValue;
});

const items = ref(props.items);
watch(() => props.items, (newValue) => {
    items.value = newValue;
});

const headers = ref([
    { key: 'id', title: 'ID', sortable: false, },
    { key: 'nombres', title: 'EMPLEADO' },
    { key: 'dni', title: 'DNI', sortable: false, },
    { key: 'entrada', title: 'ENTRADA', sortable: false, },
    { key: 'salida', title: 'SALIDA', sortable: false, },
    { key: 'actions', title: 'actions', sortable: false, }
])

function handleAction (item) {
    console.log(item.id);
}
</script>