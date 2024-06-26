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
      :items="props.items"
      :search="search"
      :items-per-page-text="'Mostrar'"
    >
      <template #item.entrada="{ item }">
        {{ formatDate(item.entrada) || "-" }}
      </template>
      <template #item.salida="{ item }">
        {{ formatDate(item.salida) || "-" }}
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
        <v-btn v-else fab small color="yellow" @click="handleAction(item)">
          <v-icon>mdi-alert-circle-outline</v-icon>
        </v-btn>
      </template>
    </v-data-table>
  </v-card>
</template>

<script setup>
import { ref, watch } from "vue";
import { format } from "date-fns";
import { Patients as PatientsAPI } from "@/services/patients";
const props = defineProps({
  items: {
    type: Array,
    default: () => [],
  },
});

const search = ref("");

const items = ref(props.items);

const headers = ref([
  { key: "patientId", title: "ID", sortable: false },
  { key: "nombres", title: "PACIENTE" },
  { key: "dni", title: "CODIGO", sortable: false },
  { key: "paquete", title: "PAQUETE", sortable: false },
  { key: "entrada", title: "ENTRADA", sortable: false },
  { key: "salida", title: "SALIDA", sortable: false },
  { key: "actions", title: "acciones", sortable: false },
]);

const filteredItems = ref([]);

async function registrarAsistencia(item) {
  await PatientsAPI.saveEntry(item);
}

async function registrarSalida(item) {
  await PatientsAPI.saveExit(item);
}

function handleAction(item) {
  console.log(item.id);
}
function formatDate(dateStr) {
  if (!dateStr) return "-";
  const date = new Date(dateStr);
  const options = {
    day: "2-digit",
    month: "2-digit",
    year: "numeric",
    hour: "2-digit",
    minute: "2-digit",
  };
  return date.toLocaleDateString("es-ES", options);
}
</script>
