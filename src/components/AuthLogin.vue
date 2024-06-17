<template>
  <v-row align="center" justify="center">
    <v-col cols="12" md="4">
      <v-card>
        <v-card-title>
          <span class="headline">Iniciar Sesión</span>
        </v-card-title>
        <v-card-text>
          <v-form @submit.prevent="login" ref="form">
            <v-text-field
              v-model="email"
              label="Correo Electrónico"
              required
              type="email"
            ></v-text-field>
            <v-text-field
              v-model="password"
              label="Contraseña"
              required
              type="password"
            ></v-text-field>
            <v-btn type="submit" color="primary" block>Iniciar Sesión</v-btn>
          </v-form>
        </v-card-text>
        <v-card-actions>
          <router-link to="/register">
            ¿No tienes una cuenta? Regístrate
          </router-link>
        </v-card-actions>
      </v-card>
    </v-col>
  </v-row>
</template>

<script setup>
import { ref } from "vue";
import { useRouter } from "vue-router";

import { Auth as AuthAPI } from "@/services/auth"
const email = ref("");
const password = ref("");
const router = useRouter();
const form = ref(null);

const login = async () => {
  if (form.value.validate()) {
    try {
      console.log("Usuario autenticado:",email.value ,password.value);
      const data = {
        email: email.value,
        password: password.value,
      }
      const test = await AuthAPI.loginUser(data)
      console.log("Usuario registrado:",test)
      router.push("/"); 
    } catch (error) {
      console.error("Error al iniciar sesión:", error.message);
    }
  }
};
</script>

<style scoped>
.auth-form {
  display: flex;
  align-items: center;
  justify-content: center;
  min-height: 100vh;
  background: #f0f0f0;
}
</style>
