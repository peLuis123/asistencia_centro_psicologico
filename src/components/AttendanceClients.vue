<template>
  <v-container fluid>
    <AsistenciaTable :items="items" />
  </v-container>
</template>

<script setup>
import AsistenciaTable from '@/components/AttendanceTable.vue'
import { ref } from 'vue';
const items = ref([
    {
        id: 13,
        nombres: 'juan quispe',
        dni: 77777787,
        entrada: '01/04/2023',
        salida: '04/04/2023'
    },
    {
        id: 14,
        nombres: 'ismael sandoval',
        dni: 77777788,
        entrada: '01/04/2023',
        salida: '04/04/2023'
    },
    {
        id: 21,
        nombres: 'prueba',
        dni: 77777789,
        entrada: '01/04/2023',
        salida: '04/04/2023'
    },
    {
        id: 22,
        nombres: 'carlos vargas',
        dni: 77777780,
        entrada: '01/04/2023',
        salida: '04/04/2023'

    },

])

</script>