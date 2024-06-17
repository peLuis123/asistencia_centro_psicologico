<template>
  <v-dialog v-model="props.open" max-width="500">
    <v-card>
      <v-card-title class="text-h5">Agregar Cargo</v-card-title>
      <v-card-text>
        <v-form ref="form" v-model="valid">
          <v-text-field
            v-model="newCharge.cargo"
            label="Cargo"
            required
          ></v-text-field>
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
import { ref } from "vue";
import { Packages as PackagesAPI } from "@/services/packages";

const props = defineProps({
  open: {
    type: Boolean,
    required: true,
  },
});

const emit = defineEmits(["close", "save"]);

const newCharge = ref({
  cargo: "",
});

const valid = ref(true);

const save = async () => {
  if (valid.value) {
    await PackagesAPI.createPackage(newCharge.value);
    newCharge.value.cargo = "";
    emit("save");
    emit("close");
  }
};

const cancel = () => {
  emit("close");
};
</script>
  