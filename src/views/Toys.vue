<template>
  <div>
  <app-bar></app-bar>   
    <v-main>
      <v-overlay :value="loading">
        <v-progress-circular indeterminate size="64"></v-progress-circular>
      </v-overlay>
      <toy-form :toy='currentToy' :dialog='showForm'></toy-form>
      <v-btn @click="newToy">New Toy</v-btn>
      <toys-list></toys-list>
    </v-main>
  </div>
</template>

<script>
import AppBar from "../components/AppBar"
import ToyForm from "../components/ToyForm"
import ToysList from "../components/ToysList"
import { mapState, mapActions } from "vuex"

export default {
  components: {
    AppBar,
    ToyForm,
    ToysList
  },
  methods: {
    ...mapActions(['showToyForm','setEmptyToy']),
    newToy(){
      this.setEmptyToy()
      this.showToyForm()
    }
  },
  computed: {
    ...mapState(['showForm', 'currentToy', 'loading'])
  }
}
</script>

<style>

</style>