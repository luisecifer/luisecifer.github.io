<template>
  <v-layout>
    <v-flex xs10 offset-xs1>
      <div class="white elevation-2 mt-5">
        <v-toolbar flat dense class="purple darken-1" dark>
          <v-toolbar-title>Foglalásaim</v-toolbar-title>
            <v-spacer></v-spacer>
              <v-btn class="blue darken-2"
                @click="newRes"
                light
                small>
              <v-icon>add</v-icon>
              </v-btn>
              <v-dialog v-model="dialog" max-width="500px">
                <v-card>
                  <v-card-title>
                    <span class="headline">Módosítás</span>
                  </v-card-title>
                  <v-card-text>
                    <v-container>
                      <v-layout wrap>
                        <v-flex xs12 sm6 md10>
                          <v-text-field
                            v-model="editedItem.name"
                            label="Név">
                          </v-text-field>
                        </v-flex>
                        <v-flex xs12 sm6 md10>
                          <v-text-field
                            mask="(##) ###-##-##"
                            v-model="editedItem.phonenumber"
                            label="Mobil">
                          </v-text-field>
                        </v-flex>
                        <v-flex xs12 sm6 md10>
                          <v-select
                            :items="szobak"
                            v-model="editedItem.roomId"
                            label="Szobatípus">
                          </v-select>
                        </v-flex>
                        <div class="szoveg pl-4 pr-4 pt-2 pb-2">
                          Bejelentkezés
                        </div>
                        <v-flex xs12 sm6 md10>
                          <v-date-picker
                            v-model="editedItem.checkIn"
                            :min="new Date().toISOString().slice(0,10)">
                          </v-date-picker>
                        </v-flex>
                        <div class="szoveg pl-4 pr-4 pt-2 pb-2">
                          Kijelentkezés
                        </div>
                        <v-flex xs12 sm6 md10>
                          <v-date-picker
                            v-model="editedItem.checkOut"
                            :min="new Date().toISOString().slice(0,10)">
                          </v-date-picker>
                        </v-flex>
                      </v-layout>
                    </v-container>
                  </v-card-text>
                  <v-card-actions>
                    <v-spacer></v-spacer>
                    <v-btn color="blue darken-1" flat @click.native="close">Mégse</v-btn>
                    <v-btn color="blue darken-1" flat @click.native="save">Mentés</v-btn>
                  </v-card-actions>
                </v-card>
              </v-dialog>
            </v-toolbar>
          <v-card-title>
            <v-text-field
              v-model="search"
              append-icon="search"
              label="Keresés"
              single-line
              hide-details>
            </v-text-field>
          </v-card-title>
          <div
            class="pl-4 pr-4 pt-2 pb-2">
          <v-data-table
              :headers="fejLec"
              :items="reservations"
              :search="search"
              :pagination.sync="pagination"
              item-key="name"
              class="elevation-1">
          <template slot="headers" slot-scope="props">
            <tr>
              <th
                v-for="fejLec in props.headers"
                :key="fejLec.text"
                :class="['column sortable', pagination.descending ? 'desc' : 'asc', fejLec.value === pagination.sortBy ? 'active' : '']"
                @click="changeSort(fejLec.value)">
              <v-icon small>arrow_upward</v-icon>
                {{ fejLec.text }}
              </th>
            </tr>
          </template>
          <template slot="items" slot-scope="props">
              <td>{{ props.item.name }}</td>
              <td class="text-xs-center">{{ props.item.phonenumber }}</td>
              <td class="text-xs-center">{{ props.item.roomId }}</td>
              <td class="text-xs-center">{{ props.item.checkIn }}</td>
              <td class="text-xs-center">{{ props.item.checkOut }}</td>
              <td class="justify-center">
                <v-icon
                  small
                  class="mr-2"
                  @click="editItem(props.item)">
                  edit
                </v-icon>
                <v-icon
                  small
                  @click="deleteItem(props.item)">
                  delete
                </v-icon>
              </td>
          </template>
            <v-alert slot="no-results" :value="true" color="error" icon="warning">
              A keresés a "{{ search }}" kulcsszóra nem hozott eredményt.
            </v-alert>
          </v-data-table>
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
      szobak: ['Egyágyas szoba', 'Kétágyas szoba', 'Családi szoba', 'Deluxe szoba', 'Lakosztály'],
      dialog: false,
      search: '',
      pagination: {
        sortBy: 'name'
      },
      fejLec: [
        { text: 'Név', value: 'name', align: 'center', sortable: false },
        { text: 'Telefonszám', value: 'tel', align: 'center', sortable: false },
        { text: 'Szobatípus', value: 'room', align: 'center', sortable: false },
        { text: 'Bejelentkezés', value: 'checkin', align: 'center' },
        { text: 'Kijelentkezés', value: 'checkout', align: 'center' }
      ],
      reservations: [],
      editedIndex: -1,
      editedItem: {
        name: null,
        phonenumber: null,
        roomId: [],
        checkIn: null,
        checkOut: null
      },
      defaultItem: {
        name: null,
        phonenumber: null,
        roomId: [],
        checkIn: null,
        checkOut: null
      }
    }
  },
  computed: {
    formTitle () {
      return this.editedIndex === -1 ? 'New Item' : 'Edit Item'
    }
  },
  watch: {
    dialog (val) {
      val || this.close()
    }
  },
  created () {
    this.initialize()
  },
  methods: {
    toggleAll () {
      if (this.selected.length) this.selected = []
      else this.selected = this.reservations.slice()
    },
    changeSort (column) {
      if (this.pagination.sortBy === column) {
        this.pagination.descending = !this.pagination.descending
      } else {
        this.pagination.sortBy = column
        this.pagination.descending = false
      }
    },
    async initialize () {
      this.reservations = (await Hitelesites.index()).data
    },
    editItem (item) {
      this.editedIndex = this.reservations.indexOf(item)
      this.editedItem = Object.assign({}, item)
      this.dialog = true
    },
    deleteItem (item) {
      const index = this.reservations.indexOf(item)
      confirm('Biztos törölni akarja a foglalást?') && this.reservations.splice(index, 1)
    },
    close () {
      this.dialog = false
      setTimeout(() => {
        this.editedItem = Object.assign({}, this.defaultItem)
        this.editedIndex = -1
      }, 300)
    },
    save () {
      if (this.editedIndex > -1) {
        Object.assign(this.reservations[this.editedIndex], this.editedItem)
      } else {
        this.reservations.push(this.editedItem)
      }
      this.close()
    },
    newRes () {
      this.$router.push({
        name: 'reservation'
      })
    }
  },
  async mounted () {
    this.reservations = (await Hitelesites.index()).data
  }
}
</script>

<style scoped>
@import url('https://fonts.googleapis.com/css?family=Dosis:300');
.szoveg {
  font-family: 'Dosis', sans-serif;
}

</style>
