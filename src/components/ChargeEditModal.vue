<template>
  <v-dialog v-model="props.open" max-width="500">
    <v-card>
      <v-card-title class="text-h5">Editar Cargo</v-card-title>
      <v-card-text>
        ss{{charge}}
        <v-form ref="form" v-model="valid">
          <v-text-field v-model="editedCharge.id" label="ID" readonly></v-text-field> 
          <v-text-field v-model="editedCharge.cargo" label="Cargo" required></v-text-field>
        </v-form>
      </v-card-text>
      <v-card-actions>
        <v-spacer></v-spacer>
        <v-btn color="green darken-1" text @click="save">Guardar</v-btn>
        <v-btn color="red darken-1" text @click="cancel">Cancelar</v-btn>
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>

<script setup>
import { ref, reactive,  watch } from "vue";
import { Packages as PackagesAPI } from "@/services/packages";

const props = defineProps({
  open: {
    type: Boolean,
    required: true,
  },
  charge: {
    type: Object,
    required: true,
  },
});

const emit = defineEmits(["close", "save"]);
const editedCharge = reactive({ ...props.charge });
const valid = ref(true);

const save = async () => {
  if (valid.value) {
    console.log(editedCharge)
    await PackagesAPI.updatePackageById(editedCharge);
    emit("save");
    emit("close");
  }
};

const cancel = () => {
  emit("close");
};
watch(
  () => props.charge,
  (newCharge) => {
    Object.assign(editedCharge, newCharge);
  }
);
</script>

  