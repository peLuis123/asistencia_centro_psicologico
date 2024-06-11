<template>
  <v-container fluid>
    <div>
      <div class="d-flex justify-end">
        <v-btn class="ma-1" color="primary" @click="openAddModal">
          + Registrar
        </v-btn>
      </div>
      <ChargesListTable :items="items" @edit-item="openEditModal" @delete-item="openDeleteModal" />
    </div>
    <charge-edit-modal
      :open="isEditOpen"
      :charge="selectedCharge"
      @close="isEditOpen = false"
      @save="updateCharge"
    />
    <charge-delete-modal
      :open="isDeleteOpen"
      :charge="selectedCharge"
      @close="isDeleteOpen = false"
      @confirm="deleteCharge"
    />
    <charge-add-modal :open="isAddOpen" @close="isAddOpen = false" @save="addCharge" />
  </v-container>
</template>

<script setup>
import ChargesListTable from "@/components/ChargesListTable.vue";
import ChargeEditModal from "@/components/ChargeEditModal.vue";
import ChargeDeleteModal from "@/components/ChargeDeleteModal.vue";
import ChargeAddModal from "@/components/ChargeCreateModal.vue";
import { ref, onMounted } from "vue";
import { Packages as PackagesAPI } from "@/services/packages";

let items = ref([]);

const isAddOpen = ref(false);
const isEditOpen = ref(false);
const isDeleteOpen = ref(false);
const selectedCharge = ref({});

const getCharges = async () => {
  try {
    const charges = await PackagesAPI.getAllPackages();
    items.value = charges;
  } catch (error) {
    console.error("Error fetching charges:", error);
  }
};

onMounted(() => {
  getCharges();
});

const openAddModal = () => {
  isAddOpen.value = true;
};

const openEditModal = (charge) => {
  console.log(charge)
  selectedCharge.value = { ...charge };
  isEditOpen.value = true;
};

const openDeleteModal = (charge) => {
  selectedCharge.value = { ...charge };
  isDeleteOpen.value = true;
};

const addCharge = () => {
  getCharges();
};

const updateCharge = () => {
  getCharges();
};

const deleteCharge = async (chargeToDelete) => {
  await PackagesAPI.deletePackageById({ packageId: chargeToDelete.id });
  getCharges();
  isDeleteOpen.value = false;
};
</script>
