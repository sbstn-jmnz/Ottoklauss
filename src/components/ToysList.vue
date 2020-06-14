<template>
  <div>
    <h2>
      Toys List
    </h2> 
    <v-simple-table dense fixed-header height >
      <thead>
        <tr>
          <th class="text-left">Nombre</th>
          <th class="text-left">Código</th>
          <th class="text-left">Precio</th>
          <th class="text-left">Stock</th>
          <th></th>
          <th></th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="toy in toys" :key="toy.id">
          <td>{{ toy.data.name }}</td>
          <td>{{ toy.data.code }}</td>
          <td>{{ toy.data.price }}</td>
          <td>{{ toy.data.stock }}</td>
          <td><v-icon @click="editProduct(toy.id)">mdi-pencil-outline</v-icon></td>
          <td><v-icon @click="removeProduct(toy.id)">mdi-delete</v-icon></td>
        </tr>
      </tbody>
    </v-simple-table>
  </div>
</template>

<script>
import { mapActions, mapState } from 'vuex';
export default {
  methods: {
    // These actions are abailable from the store. They can be called directly 
    // in the template and upadate the state through mutations. AWESOME!!
    ...mapActions(['setCurrentToy','showToyForm', 'HideToyForm','getToys']),
    
    editProduct(id) {  
      this.setCurrentToy(id)
      this.showToyForm()
    },
    deleteProdut(){}
  },
  computed: {
    ...mapState(['toys'])
  },
  created(){
    this.getToys()
  }
}  
</script>

<style>

</style>