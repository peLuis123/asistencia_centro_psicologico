<template>
  <v-dialog v-model="props.open" max-width="500">
    <v-card>
      <v-card-title class="text-h5">Editar Usuario</v-card-title>
      <v-card-text>
        <v-form ref="form" v-model="valid">
          <v-text-field
            v-model="editedUser.nombres"
            label="Nombres"
            required
          ></v-text-field>
          <v-text-field
            v-model="editedUser.apellidos"
            label="Apellidos"
            required
          ></v-text-field>
          <v-text-field
            v-model="editedUser.userName"
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
  </v-dialog>
</template>
  
  <script setup>
import { ref, reactive, watch } from "vue";
import { Users as UsersAPI } from "@/services/users";
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

const emit = defineEmits(["close", "save"]);
const editedUser = reactive({ ...props.user });
const valid = ref(true);
const save = async () => {
  if (valid.value) {
    await UsersAPI.updateUserById({data: editedUser} );
    emit("save");
    emit("close");
  }
};
const cancel = () => {
  emit("close");
};

watch(
  () => props.user,
  (newUser) => {
    Object.assign(editedUser, newUser);
  }
);
</script>
  