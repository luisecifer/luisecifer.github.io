<template>
  <div>
    <v-layout>
      <v-flex xs10 offset-xs1>
        <div class="white elevation-2 mt-5">
          <v-toolbar flat dense class="purple darken-1" dark>
            <v-toolbar-title>
              Szobafoglalás
            </v-toolbar-title>
          </v-toolbar>
          <div class="pl-4 pr-4 pt-2 pb-2">
            <v-text-field
              label="Név"
              v-model="reservation.name">
            </v-text-field>
            <v-text-field
              mask="(##) ###-##-##"
              label="Mobil"
              v-model="reservation.phonenumber">
            </v-text-field>
            <v-select
              :items="szobak"
              v-model="reservation.roomId"
              color="pink"
              label="Szobatípusok">
            </v-select>
            <div class="pl-4 pr-4 pt-2 pb-2">
              <v-layout row wrap>
                <v-flex>
                  <br>
                  <h1>
                    Bejelentkezési dátum
                  </h1>
                  <br>
                  <v-date-picker
                    class="purple" dark
                    v-model="reservation.checkIn"
                    :min="new Date().toISOString().slice(0,10)"
                    ref="picker"
                    full-width>
                  </v-date-picker>
                  <p>
                    {{ reservation.checkIn }}
                  </p>
                  <br>
                  <h1>
                    Kijelentkezési dátum
                  </h1>
                  <br>
                  <v-date-picker
                    class="purple" dark
                    v-model="reservation.checkOut"
                    :min="new Date().toISOString().slice(0,10)"
                    ref="picker"
                    full-width>
                  </v-date-picker>
                  <p>
                    {{ reservation.checkOut }}
                  </p>
                </v-flex>
                <br>
                <br>
              </v-layout>
              <br>
              <div class="text-xs-center">
                <v-btn
                  @click="foglal"
                  round color="primary"
                  dark>
                  Mentés
                </v-btn>
              </div>
            </div>
          </div>
        </div>
      </v-flex>
    </v-layout>
  </div>
</template>
<script>
import Hitelesites from '@/services/Hitelesites'
export default {
  data () {
    return {
      szobak: ['Egyágyas szoba', 'Kétágyas szoba', 'Családi szoba', 'Deluxe szoba', 'Lakosztály'],
      reservation: {
        name: '',
        phonenumber: '',
        roomId: [],
        checkIn: new Date().toISOString().slice(0, 10),
        checkOut: new Date().toISOString().slice(0, 10)
      }
    }
  },
  computed: {
    dateTime () {
      const checkIn = new Date(this.checkIn)
      return checkIn
    },
    dateTime2 () {
      const checkOut = new Date(this.checkOut)
      return checkOut
    }
  },
  methods: {
    async foglal () {
      try {
        await Hitelesites.post(this.reservation)
        this.$router.push({
          name: 'browse'
        })
      } catch (err) {
        console.log()
      }
    }
  }
}
</script>
<style scoped>
@import url('https://fonts.googleapis.com/css?family=Dosis:300');
h1 {
  font-family: 'Dosis', sans-serif;
}
</style>
