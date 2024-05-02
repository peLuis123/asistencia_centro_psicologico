<template>
  <v-container>
    <v-card>
      <v-card-text>
        <v-row dense>
          <v-col
            cols="12"
            md="4"
            sm="6"
          >
            <v-text-field
              label="Nombres"
              required
            />
          </v-col>

          <v-col
            cols="12"
            md="4"
            sm="6"
          >
            <v-text-field

              label="Apellidos"
            />
          </v-col>



          <v-col
            cols="12"
            md="4"
            sm="6"
          >
            <v-text-field
              label="Email*"
              required
            />
          </v-col>

          <v-col
            cols="12"
            sm="6"
          >
            <v-select
              :items="['0-17', '18-29', '30-54', '54+']"
              label="Rango de Edad*"
              required
            />
          </v-col>

          <v-col
            cols="12"
            sm="6"
          >
            <v-autocomplete
              :items="['Skiing', 'Ice hockey', 'Soccer', 'Basketball', 'Hockey', 'Reading', 'Writing', 'Coding', 'Basejump']"
              label="Intereses"
              auto-select-first
              multiple
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