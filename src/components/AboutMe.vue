<template>
  <v-container>
    <v-card>
      <v-card-text>
        <v-row dense>
          <v-col cols="12" sm="6">
            <v-text-field v-model="nombres" label="Nombres*" required />
          </v-col>
          <v-col cols="12" sm="6">
            <v-text-field v-model="telefono" label="Telefono*" required />
          </v-col>

          <v-col cols="12" sm="6">
            <v-text-field v-model="ubicacion" label="Ubicacion*" required />
          </v-col>
          <v-col cols="12" sm="6">
            <v-text-field v-model="ruc" label="RUC*" required />
          </v-col>
        </v-row>
      </v-card-text>

      <v-divider />

      <v-card-actions>
        <v-spacer />
        <v-btn
          color="primary"
          text="Save"
          variant="tonal"
          @click="updateData"
        />
      </v-card-actions>
    </v-card>
  </v-container>
</template>

<script setup>
import { ref, onMounted } from "vue";
import { About as AboutAPI } from "@/services/about";
const id = ref("XBWjmN16x264xDgy7Xlg");
// Datos aleatorios
const nombres = ref("");
const telefono = ref("");
const ubicacion = ref("");
const ruc = ref("");

async function saveData() {
  try {
    const aboutData = {
      nombres: nombres.value,
      telefono: telefono.value,
      ubicacion: ubicacion.value,
      ruc: ruc.value,
    };
    await AboutAPI.saveAbout(aboutData);
  } catch (error) {
    console.error("Error al guardar los datos:", error);
  }
}
onMounted(() => {
  getAboutMe();
});
async function updateData() {
  try {
    const userId = id.value;
    const aboutData = {
      nombres: nombres.value,
      telefono: telefono.value,
      ubicacion: ubicacion.value,
      ruc: ruc.value,
    };
    await AboutAPI.updateAboutById(aboutData, userId);
    getAboutMe()
  } catch (error) {
    console.error("Error al guardar los datos:", error);
  }
}
onMounted(() => {
  getAboutMe();
});
const getAboutMe = async () => {
  try {
    const userId = id.value;
    const aboutMe = await AboutAPI.getAboutById(userId);
    if (aboutMe) {
      nombres.value = aboutMe.nombres || "";
      telefono.value = aboutMe.telefono || "";
      ubicacion.value = aboutMe.ubicacion || "";
      ruc.value = aboutMe.ruc || "";
    }
  } catch (error) {
    console.error("Error fetching patients:", error);
  }
};
</script>
