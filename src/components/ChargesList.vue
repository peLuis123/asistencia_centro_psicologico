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
      <ChargesListTable :items="items" />
    </div>
  </v-container>
</template>

      <script setup>
      import ChargesListTable from '@/components/ChargesListTable.vue'
      import { ref } from 'vue';
      const items = ref([
          {
              id: 1,
              cargo:'cirujano'
          },
          {
              id: 2,
              cargo:'odontologo'
          },
          {
              id: 3,
              cargo:'limpieza'
          },
          {
              id: 4,
              cargo:'farmacia'
          },
          {
              id: 5,
              cargo:'enfermera'
          },

      ])

      </script>