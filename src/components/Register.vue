<template>
  <v-layout>
    <v-flex xs10 offset-xs1>
      <div class="white elevation-2 mt-5">
        <v-toolbar flat dense class="purple darken-1" dark>
          <v-toolbar-title>Regisztráció</v-toolbar-title>
        </v-toolbar>
        <div class="pl-4 pr-4 pt-2 pb-2">
          <v-text-field
            label="Email"
            v-model="email">
          </v-text-field>
          <br>
          <v-text-field
            label="Jelszó"
            type="password"
            v-model="password">
          </v-text-field>
          <br>
          <div class="alert" v-html="error"/>
          <br>
          <v-btn
            class="purple darken-1" dark
            @click="register">Regisztráció
          </v-btn>
        </div>
      </div>
    </v-flex>
  </v-layout>
</template>

<script>
import Hitelesites from '@/services/Hitelesites'
export default {
  data () {
    return {
      email: '',
      password: '',
      error: null
    }
  },
  methods: {
    async register () {
      try {
        const response = await Hitelesites.register({
          email: this.email,
          password: this.password
        })
        this.$store.dispatch('setPassword', response.data.password)
        this.$store.dispatch('setUser', response.data.user)
        this.$router.push({
          name: 'login'
        })
      } catch (error) {
        this.error = error.response.data.error
      }
    }
  }
}
</script>

<style scoped>

.alert {
  color: red;
}

</style>
