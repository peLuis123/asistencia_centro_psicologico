<template>
  <v-app-bar
    color="#1E2937"
    prominent
  >
    <v-app-bar-nav-icon
      variant="text"
      @click="$emit('someEvent')"
    />

    <v-toolbar-title>Centro Psicológico FloreSer Ilo</v-toolbar-title>

    <v-spacer />
    <div class="mr-2">
      {{ user.fullName }}
    </div>
    <v-menu
      min-width="200px"
      rounded
    >
      <template #activator="{ props }">
        <v-btn
          icon
          size="45"
          v-bind="props"
        >
          <v-avatar>
            <v-img
              alt="John"
              src="https://cdn.vuetifyjs.com/images/john.jpg"
            />
          </v-avatar>
        </v-btn>
      </template>
      <v-card>
        <v-card-text>
          <div class="mx-auto text-center">
            <h3>{{ user.fullName }}</h3>
            <p class="text-caption mt-1">
              {{ user.email }}
            </p>
            <v-divider class="my-3" />
            <router-link to="/profile">
              <v-btn
                variant="text"
                rounded
              >
                <v-icon>mdi-account</v-icon> Perfil
              </v-btn>
            </router-link>
            <v-divider class="my-3" />
            <router-link to="/security">
              <v-btn
                variant="text"
                rounded
              >
                <v-icon>mdi-lock-outline</v-icon> cambiar contraseña
              </v-btn>
            </router-link>
            <v-divider class="my-3" />
            <v-btn
              variant="text"
              rounded
            >
              <v-icon>mdi-exit-to-app</v-icon> Salir
            </v-btn>
          </div>
        </v-card-text>
      </v-card>
    </v-menu>
  </v-app-bar>
</template>
<script setup>
const user =   {
        initials: 'JD',
        fullName: 'John Doe',
        email: 'john.doe@doe.com',
      }
</script>
