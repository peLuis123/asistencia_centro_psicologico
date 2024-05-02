<template>
  <v-container>
    <v-card>
      <v-card-text>
        <v-row dense>
          <v-col
            cols="12"
            sm="6"
          >
            <v-text-field
              label="Nombres*"
              required
            />
          </v-col>
          <v-col
            cols="12"
            sm="6"
          >
            <v-text-field
              label="Telefono*"
              required
            />
          </v-col>

          <v-col
            cols="12"
            sm="6"
          >
            <v-text-field
              label="Ubicacion*"
              required
            />
          </v-col>
          <v-col
            cols="12"
            sm="6"
          >
            <v-text-field
              label="RUC*"
              required
            />
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
          @click="dialog = false"
        />
      </v-card-actions>
    </v-card>
  </v-container>
</template>

    <script setup>

    </script>