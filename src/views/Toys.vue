<template>
  <div>
  <app-bar></app-bar>   
    <v-main>
      <toy-form :toy='currentToy' :display='showForm'></toy-form>
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
  data() {
    return {
    }
  },
  methods: {
    ...mapActions(['hideForm','setEmptyToy']),
    newToy(){
      this.setEmptyToy()
    }
  },
  computed: {
    ...mapState(['showForm', 'currentToy'])
  }
}
</script>

<style>

</style>