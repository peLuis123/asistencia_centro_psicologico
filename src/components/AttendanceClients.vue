<template>
  <v-container fluid>
    <AsistenciaTable :items="items" />
  </v-container>
</template>

<script setup>
import AsistenciaTable from "@/components/AttendanceTable.vue";
import { ref, onMounted } from "vue";
import { Patients as PatientsAPI } from "@/services/patients";
let items = ref([]);
onMounted(() => {
  getPatients();
});
const getPatients = async () => {
  try {
    const patients = await PatientsAPI.getAllPatients();
    items.value = patients;
  } catch (error) {
    console.error("Error fetching patients:", error);
  }
};
</script>