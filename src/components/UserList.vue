<template>
  <v-container fluid>
    <div>
      <div class="d-flex justify-end">
        <v-btn class="ma-1" color="primary" @click="openAddModal">
          + Registrar
        </v-btn>
      </div>
      <UserListTable :items="items" @edit-item="openEditModal" @delete-item="openDeleteModal" />
    </div>
    <user-edit-modal :open="isEditOpen" :user="selectedUser" @close="isEditOpen = false" @save="updateUser" />
    <user-delete-modal :open="isDeleteOpen" :user="selectedUser" @close="isDeleteOpen = false" @confirm="deleteUser" />
    <user-add-modal :open="isAddOpen" @close="isAddOpen = false" @save="addUser" />
  </v-container>
</template>

<script setup>
import { ref } from 'vue';
import UserListTable from '@/components/UserListTable.vue';
import UserEditModal from '@/components/UserEditModal.vue';
import UserDeleteModal from '@/components/UserDeleteModal.vue';
import UserAddModal from '@/components/UserCreateModal.vue';

const items = ref([
  {
    id: 1,
    nombres: 'Ismaelito',
    apellidos: 'Sandobal',
    userName: 'isai'
  },
  {
    id: 2,
    nombres: 'Juan',
    apellidos: 'Mamani',
    userName: 'juansito'
  },
]);

const isAddOpen = ref(false);
const isEditOpen = ref(false);
const isDeleteOpen = ref(false);
const selectedUser = ref({});

const openAddModal = () => {
  isAddOpen.value = true;
};

const openEditModal = (item) => {
  selectedUser.value = { ...item };
  isEditOpen.value = true;
};

const openDeleteModal = (item) => {
  selectedUser.value = { ...item };
  isDeleteOpen.value = true;
};

const addUser = (newUser) => {
  items.value.push(newUser);
  isAddOpen.value = false;
};

const updateUser = (updatedUser) => {
  const index = items.value.findIndex(user => user.id === updatedUser.id);
  if (index !== -1) {
    items.value[index] = updatedUser;
  }
  isEditOpen.value = false;
};

const deleteUser = (userToDelete) => {
  items.value = items.value.filter(user => user.id !== userToDelete.id);
  isDeleteOpen.value = false;
};
</script>
