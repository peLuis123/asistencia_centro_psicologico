<template>
  <v-dialog v-model="props.open" max-width="500">
    <v-card>
      <v-card-title class="text-h5">Agregar Usuario</v-card-title>
      <v-card-text>
        <v-form ref="form" v-model="valid">
          <v-text-field
            v-model="newUser.nombres"
            label="Nombres"
            required
          ></v-text-field>
          <v-text-field
            v-model="newUser.apellidos"
            label="Apellidos"
            required
          ></v-text-field>
          <v-text-field
            v-model="newUser.userName"
            label="Usuario"
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
    {{ newUser }}
  </v-dialog>
</template>
    
  <script setup>
import { ref, reactive } from "vue";

const props = defineProps({
  open: {
    type: Boolean,
    required: true,
  },
});

const emit = defineEmits(["close", "save"]);

const newUser = reactive({
  id: Math.floor(Math.random() * 10000),
  nombres: "",
  apellidos: "",
  userName: "",
});

const valid = ref(true);

const save = () => {
  if (valid.value) {
    console.log(newUser);
    emit("save", newUser);
    newUser.nombres = "";
    newUser.apellidos = "";
    newUser.userName = "";
  }
};

const cancel = () => {
  emit("close");
};
</script>
  