<template>
  <v-dialog v-model="props.open" max-width="500">
    <v-card>
      <v-card-title class="text-h5">Confirmar Eliminación</v-card-title>
      <v-card-text>
        ¿Está seguro que desea eliminar al usuario
        <strong>{{ props.user.nombres }} {{ props.user.apellidos }}</strong
        >?
      </v-card-text>
      <v-card-actions>
        <v-spacer></v-spacer>
        <v-btn color="green darken-1" text @click="confirm">Eliminar</v-btn>
        <v-btn color="red darken-1" text @click="cancel">Cancelar</v-btn>
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>
  
  <script setup>
import { defineProps, defineEmits } from "vue";
const props = defineProps({
  open: {
    type: Boolean,
    required: true,
  },
  user: {
    type: Object,
    required: true,
  },
});

const emit = defineEmits(["close", "confirm"]);

const confirm = () => {
  emit("confirm",props.user);
};

const cancel = () => {
  emit("close");
};
</script>
  