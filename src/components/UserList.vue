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
      <UserListTable :items="items" />
    </div>
  </v-container>
</template>

  <script setup>
  import UserListTable from '@/components/UserListTable.vue'
  import { ref } from 'vue';
  const items = ref([
      {
          id: 1,
          nombres: 'ismaelito',
          apellidos: 'sandobal',
          userName:'isai'
      },
      {
          id: 2,
          nombres: 'juan',
          apellidos: 'mamani',
          userName:'juansito'
      },

  ])

  </script>