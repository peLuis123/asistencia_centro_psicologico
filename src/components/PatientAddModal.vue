<template>
  <v-dialog v-model="props.open" max-width="500">
    <v-card>
      <v-card-title class="text-h5">Agregar Paciente</v-card-title>
      <v-card-text>
        <v-form ref="form" v-model="valid">
          <v-text-field
            v-model="newPatient.nombres"
            label="Nombres"
            required
          ></v-text-field>
          <v-text-field
            v-model="newPatient.apellidos"
            label="Apellidos"
            required
          ></v-text-field>
          <v-text-field
            v-model="newPatient.dni"
            label="DNI"
            required
          ></v-text-field>
          <v-select
            v-model="newPatient.paquete"
            :items="packages"
            label="Paquete"
            required
          ></v-select>
          <v-date-picker
            v-model="newPatient.fechas"
            label="Fechas de Inicio"
            multiple
            required
          ></v-date-picker>
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
import { Patients as PatientsAPI } from "@/services/patients";
import { Packages as PackagesAPI } from "@/services/packages";

const props = defineProps({
  open: {
    type: Boolean,
    required: true,
  },
});

const emit = defineEmits(["close", "save"]);

const newPatient = ref({
  nombres: "",
  apellidos: "",
  dni: "",
  paquete: "",
  fechas: [],
  fechasInicio: [],
});

const valid = ref(true);
const packages = ref([]);

const fetchPackages = async () => {
  try {
    const allPackages = await PackagesAPI.getAllPackages();
    packages.value = allPackages.map((pkg) => pkg.cargo);
  } catch (error) {
    console.error("Error fetching packages:", error);
  }
};

fetchPackages();

const save = async () => {
  if (valid.value) {
    try {
      newPatient.value.fechas.forEach((date) => {
        newPatient.value.fechasInicio.push(date.toISOString());
      });

      if (newPatient.value.fechas.length > 0) {
        const earliestDate = newPatient.value.fechas.reduce(
          (earliest, date) => {
            return date < earliest ? date : earliest;
          }
        );

        newPatient.value.fechaInicio = earliestDate.toISOString();
      }
      newPatient.value.fechas = [];

      await PatientsAPI.createPatient(newPatient.value);
      newPatient.value = {
        nombres: "",
        apellidos: "",
        dni: "",
        paquete: "",
        fechas: [],
        fechasInicio: [],
      };

      emit("save");
      emit("close");
    } catch (error) {
      console.error("Error al guardar paciente:", error);
    }
  }
};

const cancel = () => {
  newPatient.value = {
    nombres: "",
    apellidos: "",
    dni: "",
    paquete: "",
    fechas: [],
    fechasInicio: [],
  };

  emit("close");
};
</script>
