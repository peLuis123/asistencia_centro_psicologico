<template>
  <v-card>
    <v-navigation-drawer
      v-model="drawer"
      floating
      permanent
    >
      <v-list
        density="compact"
        nav
      >
        <v-list-item
          prepend-icon="mdi-view-dashboard"
          title="Home"
          value="home"
        />
        <v-list-item
          prepend-icon="mdi-forum"
          title="About"
          value="about"
        />
      </v-list>
    </v-navigation-drawer>
  </v-card>
</template>
<script>
export default {
    name: 'NavigationDrawer',

    data () {
        return {
            drawer: false,
            group: null,
            items: [
                {
                    title: 'Foo',
                    value: 'foo',
                },
                {
                    title: 'Bar',
                    value: 'bar',
                },
                {
                    title: 'Fizz',
                    value: 'fizz',
                },
                {
                    title: 'Buzz',
                    value: 'buzz',
                },
            ],
        }
    },
}
</script>
<style scoped>
.items {
    display: flex;
    align-items: center;
}

.text-list {
    padding-left: 26px;
}
</style>