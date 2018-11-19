<template>
  <v-toolbar fixed class="purple darken-1" dark>
    <v-toolbar-title class="mr-4">
      <span
          class="logo"
          @click="goTo({name: 'home'})">
          RoomReservation
      </span>
    </v-toolbar-title>
      <v-toolbar-items>
        <v-btn
          v-if="$store.state.loggedIn"
          @click="goTo({name: 'browse'})"
          flat dark>
          Keresés
        </v-btn>
      </v-toolbar-items>
    <v-spacer></v-spacer>
      <v-toolbar-items>
        <v-btn
          v-if="!$store.state.loggedIn"
          flat dark
          @click="goTo({name: 'login'})">
          Belépés
        </v-btn>
        <v-btn
          v-if="!$store.state.loggedIn"
          flat dark
          @click="goTo({name: 'register'})">
          Regisztráció
        </v-btn>
        <v-btn
          v-if="$store.state.loggedIn"
          flat dark
          @click="logout">
          Kilépés
        </v-btn>
      </v-toolbar-items>
  </v-toolbar>
</template>

<script>
export default {
  methods: {
    goTo (route) {
      this.$router.push(route)
    },
    logout () {
      this.$store.dispatch('setPassword', null)
      this.$store.dispatch('setUser', null)
      this.$router.push({
        name: 'home'
      })
    }
  }
}
</script>

<style scoped>

.logo {
  cursor: pointer;
}

.logo:hover {
  color: black;
}

</style>
