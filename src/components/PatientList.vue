<template>
  <v-container fluid>
    <div>
      <div class="d-flex justify-end">
        <v-btn class="ma-1" color="primary" @click="openAddModal">
          + Registrar
        </v-btn>
      </div>
      <PatientListTable
        :items="items"
        @edit-item="openEditModal"
        @delete-item="openDeleteModal"
      />
    </div>
    <patient-add-modal
      :open="isAddOpen"
      @close="isAddOpen = false"
      @save="addPatient"
    />
    <patient-edit-modal
      :open="isEditOpen"
      :patient="selectedPatient"
      @close="isEditOpen = false"
      @save="updatePatient"
    />
    <patient-delete-modal
      :open="isDeleteOpen"
      :patient="selectedPatient"
      @close="isDeleteOpen = false"
      @confirm="deletePatient"
    />
  </v-container>
</template>

<script setup>
import PatientListTable from "@/components/PatientListTable.vue";
import PatientAddModal from "@/components/PatientAddModal.vue";
import PatientEditModal from "@/components/PatientEditModal.vue";
import PatientDeleteModal from "@/components/PatientDeleteModal.vue";
import { ref, onMounted } from "vue";
import { Patients as PatientsAPI } from "@/services/patients";

let items = ref([]);
const isAddOpen = ref(false);
const isEditOpen = ref(false);
const isDeleteOpen = ref(false);
const selectedPatient = ref({});

const getPatients = async () => {
  try {
    const patients = await PatientsAPI.getAllPatients();
    items.value = patients;
  } catch (error) {
    console.error("Error fetching patients:", error);
  }
};

onMounted(() => {
  getPatients();
});

const openAddModal = () => {
  isAddOpen.value = true;
};

const openEditModal = (patient) => {
  selectedPatient.value = { ...patient };
  isEditOpen.value = true;
};

const openDeleteModal = (patient) => {
  selectedPatient.value = { ...patient };
  isDeleteOpen.value = true;
};

const addPatient =  () => {
  getPatients();
};

const updatePatient =  () => {
  getPatients();
};

const deletePatient =  () => {
  getPatients();
};
</script>
