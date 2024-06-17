<template>
  <v-card flat>
    <template #text>
      <v-text-field
        v-model="search"
        label="Buscar"
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
      <template #item.fechaInicio="{ item }">
        {{ formatDate(item.fechaInicio) }}
      </template>

      <template #item.actions="{ item }">
        <v-btn
          fab
          class="mr-1"
          small
          color="yellow"
          size="25"
          @click="handleAction(item)"
        >
          <v-icon>mdi-square-edit-outline</v-icon>
        </v-btn>
        <v-btn fab small color="red" size="25" @click="handleAction2(item)">
          <v-icon>mdi-delete</v-icon>
        </v-btn>
      </template>
    </v-data-table>
  </v-card>
</template>
<script setup>
import { ref, watch } from "vue";

const props = defineProps({
  items: {
    type: Array,
    default: () => [],
  },
});

const search = ref("");

watch(
  () => search,
  (newValue) => {
    search.value = newValue;
  }
);

const items = ref(props.items);

watch(
  () => props.items,
  (newValue) => {
    items.value = newValue;
  }
);

const emit = defineEmits(["edit-item", "delete-item"]);

const headers = ref([
  { key: "id", title: "ID", sortable: false },
  { key: "nombres", title: "NOMBRES" },
  { key: "apellidos", title: "APELLIDOS", sortable: false },
  { key: "dni", title: "CODIGO", sortable: false },
  { key: "paquete", title: "PAQUETE", sortable: false },
  { key: "fechaInicio", title: "INICIO", sortable: false },
  { key: "actions", title: "ACCIONES", sortable: false },
]);

function formatDate(dateStr) {
  const date = new Date(dateStr);
  const options = { day: "2-digit", month: "2-digit", year: "numeric" };
  return date.toLocaleDateString("es-ES", options);
}

function handleAction(item) {
  emit("edit-item", item);
}

function handleAction2(item) {
  emit("delete-item", item);
}

</script>
