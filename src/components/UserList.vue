<template>
  <v-container fluid>
    <div>
      <div class="d-flex justify-end">
        <v-btn class="ma-1" color="primary" @click="openAddModal">
          + Registrar
        </v-btn>
      </div>
      <UserListTable
        :items="items"
        @edit-item="openEditModal"
        @delete-item="openDeleteModal"
      />
    </div>
    <user-edit-modal
      :open="isEditOpen"
      :user="selectedUser"
      @close="isEditOpen = false"
      @save="updateUser"
    />
    <user-delete-modal
      :open="isDeleteOpen"
      :user="selectedUser"
      @close="isDeleteOpen = false"
      @confirm="deleteUser"
    />
    <user-add-modal
      :open="isAddOpen"
      @close="isAddOpen = false"
      @save="addUser"
    />
  </v-container>
</template>

<script setup>
import { ref, onMounted } from "vue";
import UserListTable from "@/components/UserListTable.vue";
import UserEditModal from "@/components/UserEditModal.vue";
import UserDeleteModal from "@/components/UserDeleteModal.vue";
import UserAddModal from "@/components/UserCreateModal.vue";
import { Users as UsersAPI } from "@/services/users";
let items = ref([]);

const isAddOpen = ref(false);
const isEditOpen = ref(false);
const isDeleteOpen = ref(false);
const selectedUser = ref({});
const getUsers = async () => {
  try {
    const users = await UsersAPI.getAllUsers();
    items.value = users;
  } catch (error) {
    console.error("Error fetching users:", error);
  }
};
onMounted(() => {
  getUsers();
});
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

const addUser = () => {
  getUsers();
};

const updateUser = () => {
  getUsers();
};

const deleteUser = async (userToDelete) => {
  console.log(userToDelete)
  await UsersAPI.deleteUserById({ userId: userToDelete.id });
  getUsers();
  isDeleteOpen.value = false;
};
</script>
