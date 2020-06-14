<template>
  <div class="text-center">
    <v-dialog
      :value="showForm"
      persistent
      width="500"
    >
      <v-card>
        <v-card-title
          class="headline grey lighten-2"
          primary-title
        >
          Toy Form
        </v-card-title>
        <v-container>
          <v-row>
            <v-col>
              <v-form>
                <v-text-field label="Nombre" type="text" :value="currentToy.data.name" @input="updateName"/>
                <v-text-field label="Código" type="text" :value="currentToy.data.code" @input="updateCode"/>
                <v-text-field label="Price" prefix="$" :value="currentToy.data.price" @input="updatePrice"/>
                <v-text-field label="Stock" suffix="unidades" :value="currentToy.data.stock" @input="updateStock"/>
              </v-form>
            </v-col>
          </v-row>
        </v-container>
        <v-divider></v-divider>

        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn
            color="primary"
            @click.stop="submitForm"
            type="submit" 
          >
          {{ !!currentToy.id ? 'Actualizar' : 'Crear'}}
          </v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </div>
</template>

<script>
import { mapState, mapActions} from 'vuex'
  
  export default {
   computed:{
     ...mapState(["showForm","currentToy"])
   },
   methods:{
     ...mapActions(["hideToyForm","postToy","updateName", "updateCode", "updatePrice", "updateStock", "updateToy"]),
     submitForm(){
         if(this.currentToy.id){
           this.updateToy(this.currentToy.id)
         } else{
           this.postToy()
         }
       this.hideToyForm()
     }
   },
   created(){
   }
  }
</script>