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
      :items="filteredItems"
      :search="search"
      :items-per-page-text="'Mostrar'"
    >
      <template #item.entrada="{ item }">
        {{ item.entrada || "-" }}
      </template>
      <template #item.salida="{ item }">
        {{ item.salida || "-" }}
      </template>
      <template #item.actions="{ item }">
        <v-btn
          v-if="!item.entrada && !item.salida"
          fab
          small
          color="blue"
          @click="registrarAsistencia(item)"
        >
          <v-icon>mdi-check</v-icon> 
        </v-btn>
        <v-btn
          v-if="item.entrada && !item.salida"
          fab
          small
          color="green"
          @click="registrarSalida(item)"
        >
          <v-icon>mdi-exit-run</v-icon>
        </v-btn>
        <v-btn
          v-if="item.entrada && item.salida"
          fab
          small
          color="red"
          disabled
        >
          <v-icon>mdi-lock</v-icon>
        </v-btn>
        <v-btn fab small color="red" @click="handleAction(item)">
          <v-icon>mdi-delete</v-icon>
        </v-btn>
      </template>
    </v-data-table>
  </v-card>
</template>

<script setup>
import { ref, watch } from "vue";
import { format } from "date-fns";

const props = defineProps({
  items: {
    type: Array,
    default: () => [],
  },
});

const search = ref("");
const currentDate = ref(new Date());

watch(currentDate, (newValue) => {
  // Actualizar la lista filtrada cuando cambia la fecha actual
  filterPatientsByToday();
});

const items = ref(props.items);

watch(
  () => props.items,
  (newValue) => {
    items.value = newValue;
    filterPatientsByToday();
  }
);

const headers = ref([
  { key: "id", title: "ID", sortable: false },
  { key: "nombres", title: "PACIENTE" },
  { key: "dni", title: "CODIGO", sortable: false },
  { key: "paquete", title: "PAQUETE", sortable: false },
  { key: "entrada", title: "ENTRADA", sortable: false },
  { key: "salida", title: "SALIDA", sortable: false },
  { key: "actions", title: "acciones", sortable: false },
]);

const filteredItems = ref([]);

function filterPatientsByToday() {
  const today = format(currentDate.value, "yyyy-MM-dd");
  filteredItems.value = items.value.filter((item) => {
    
    return item.fechasInicio.some(
      (fecha) => format(new Date(fecha), "yyyy-MM-dd") === today
    );
  });
}

function registrarAsistencia(item) {
  console.log(item)
  item.entrada = new Date().toISOString()
}

function registrarSalida(item) {
  item.salida = new Date().toISOString()
}

function handleAction(item) {
  console.log(item.id);
}
</script>
