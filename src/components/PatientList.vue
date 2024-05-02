<template>
  <v-container fluid>
    <div>
      <div class="d-flex justify-end">
        <v-btn
          class="ma-1"
          color="primary"
        >
          + Registrar
        </v-btn>
      </div>
      <PatientListTable :items="items" />
    </div>
  </v-container>
</template>

    <script setup>
    import PatientListTable from '@/components/PatientListTable.vue'
    import { ref } from 'vue';
    const items = ref([
        {
            id: 1,
            nombres: 'jose manuel',
            apellidos: 'quispe ponce',
            dni:'12345678',
            cargo:'cirujano'
        },
        {
            id: 2,
            nombres: 'josep ',
            apellidos: 'vega chavez',
            dni:'12345678',
            cargo:'odontologo'
        },
        {
            id: 3,
            nombres: 'erick ',
            apellidos: 'muleta paredez',
            dni:'12345678',
            cargo:'limpieza'
        },

    ])

    </script>