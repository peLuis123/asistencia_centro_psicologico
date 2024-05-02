<template>
  <v-container>
    <v-card>
      <v-card-text>
        <v-row dense>
          <v-col
            cols="12"
            md="12"
          >
            <v-text-field
              label="Password*"
              type="password"
              required
            />
          </v-col>

          <v-col
            cols="12"
            md="12"
          >
            <v-text-field
              label="Confirm Password*"
              type="password"
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