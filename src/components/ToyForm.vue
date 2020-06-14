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
                <v-text-field label="Nombre" type="text" />
                <v-text-field label="Código" type="text" />
                <v-text-field label="Price" prefix="$" />
                <v-text-field label="Stock" suffix="unidades"/>
              </v-form>
            </v-col>
          </v-row>
        </v-container>
        <v-divider></v-divider>

        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn
            color="primary"
            @click="hideToyForm"
            type="submit" 
          >
          {{ currentToy ? 'Actualizar' : 'Crear'}}
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
     ...mapActions(["hideToyForm"])
   }
  }
</script>