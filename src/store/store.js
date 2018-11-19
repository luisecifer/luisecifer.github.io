import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  strict: true,
  state: {
    password: null,
    user: null,
    loggedIn: false
  },
  mutations: {
    setPassword (state, password) {
      state.password = password
      if (password) {
        state.loggedIn = true
      } else {
        state.loggedIn = false
      }
    },
    setUser (state, user) {
      state.password = user
    }
  },
  actions: {
    setPassword ({commit}, password) {
      commit('setPassword', password)
    },
    setUser ({commit}, user) {
      commit('setPassword', user)
    }
  }
})
