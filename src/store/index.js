import Vue from 'vue'
import Vuex from 'vuex'
import axios from 'axios'

Vue.use(Vuex)

const baseUrl = 'https://us-central1-ottoklauss-5927c.cloudfunctions.net/toys';

function emptyToy() {
   return { 
    id: null,
    data: {
      name: '',
      code: '',
      price: 0,
      stock: 0
    }
  }
}


export default new Vuex.Store({
  state: {
    currentToy: emptyToy(),
    toys: [],
    showForm: false,
    error: false,
    loading: false
  },
  // As a best practice. State should be only modified by mutations, even if is for
  // minor actions. Then these mutations can be called/composed in the actions methods below 
  mutations: {
    SET_EMPTY_TOY(state){
      const empty = emptyToy();
      state.currentToy.id = null
      Object.keys(empty.data).forEach(key => {
        state.currentToy.data[key] = empty.data[key]
      })
    },
    SET_CURRENT_TOY(state, currentToy){ state.currentToy = currentToy },
    DISPLAY_TOY_FORM(state){ state.showForm = true },
    HIDE_TOY_FORM(state){ state.showForm = false },
    SET_LOADING(state){ state.loading = true },
    UNSET_LOADING(state){ state.loading = false },
    SET_ERROR_MESSAGE(state, error){ state.error = error },
    UPDATE_NAME(state, name){ state.currentToy.data.name = name },
    UPDATE_CODE(state, code){ state.currentToy.data.code = code },
    UPDATE_STOCK(state, stock){ state.currentToy.data.stock = stock },
    UPDATE_PRICE(state, price){ state.currentToy.data.price = price },
    SET_TOYS(state, data){ state.toys = data }
  },
  actions: {
    showToyForm({ commit }){ commit('DISPLAY_TOY_FORM')},
    hideToyForm({ commit }){ commit('HIDE_TOY_FORM')},
    updateName({commit}, name){ commit('UPDATE_NAME',name)},
    updatePrice({commit}, price){ commit('UPDATE_PRICE',price)},
    updateStock({commit}, stock){ commit('UPDATE_STOCK',stock)},
    updateCode({commit}, code){ commit('UPDATE_CODE', code)},
    setEmptyToy({commit}){ commit('SET_EMPTY_TOY')},
    setCurrentToy({ commit }, id){
      commit('SET_LOADING')
      axios
        .get(`${baseUrl}/toy/${id}`)
        .then(response =>{ commit('SET_CURRENT_TOY', response.data)})
        .finally(() => commit('UNSET_LOADING'))
        .catch(error => { commit('SET_ERROR_MESSAGE', error.response)})
    },
    getToys({ commit }){
      commit('SET_LOADING')
      axios
        .get(`${baseUrl}/toys`)
        .then(response => { commit('SET_TOYS', response.data)})
        .then(() => { commit('SET_EMPTY_TOY') })
        .finally(() => commit('UNSET_LOADING'))
        .catch(error =>{ commit('SET_ERROR_MESSAGE', error.response)})
    },
    updateToy( { commit, state, dispatch }, id){
      commit('SET_LOADING')
      axios
        .put(`${baseUrl}/toy/${id}`, state.currentToy.data)
        .then(() =>{ dispatch('getToys')})
        .finally(() => commit('UNSET_LOADING'))
        .catch(error => { commit('SET_ERROR_MESSAGE', error.response)})
      },
    postToy({commit, state, dispatch}){
      commit('SET_LOADING')
      axios
        .post(`${baseUrl}/toy`,state.currentToy.data)
        .then(() =>{ dispatch('getToys') })
        .finally(() => commit('UNSET_LOADING'))
        .catch(error => { commit('SET_ERROR_MESSAGE', error.response)})
      },
    deleteToy({commit, dispatch}, id){
      commit('SET_LOADING')
      axios
        .delete(`${baseUrl}/toy/${id}`)
        .then(() =>{ dispatch('getToys') })
        .finally(() => commit('UNSET_LOADING'))
        .catch(error => { commit('SET_ERROR_MESSAGE', error.response)})
      }
    }
  }
)
