import Vue from 'vue'
import Vuex from 'vuex'
import axios from 'axios'

Vue.use(Vuex)

const baseUrl = 'https://us-central1-ottoklauss-5927c.cloudfunctions.net/toys';

export default new Vuex.Store({
  state: {
    currentToy: {},
    showForm: false,
    error: false
  },
  // As a best practice. State should be only modified by mutations, even if is for
  // minor actions. Then these mutations can be called/composed in the actions methods below 
  mutations: {
    SET_CURRENT_TOY(state, currentToy){
      state.currentToy = currentToy
    },
    DISPLAY_TOY_FORM(state){
      state.showForm = true
    },
    HIDE_TOY_FORM(state){
      state.showForm = false
    },
    SET_ERROR_MESSAGE(state, error){
      state.error = error
    }
  },
  actions: {
    setCurrentToy({ commit }, id){
      axios
        .get(`${baseUrl}/${id}`)
        .then(response =>{ 
          commit('SET_CURRENT_TOY', response.data)
        })
        .catch(error => {
          commit('SET_ERROR_MESSAGE', error.response)
        })
    },
    showToyForm({ commit }){
      commit('DISPLAY_TOY_FORM')
    },
    hideToyForm({ commit }){
      commit('HIDE_TOY_FORM')
    }
  },
  modules: {
  }
})
