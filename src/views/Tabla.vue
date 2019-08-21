<template>
  <v-layout justify-center row>
    <v-flex lg10>
          <v-card>
        <v-card-title>
          Galeria
          <v-spacer></v-spacer>
          <v-text-field
            v-model="search"
            append-icon="search"
            label="Buscar"
            single-line
            hide-details
          ></v-text-field>
        </v-card-title>
        <v-data-table
          :headers="headers"
          :items="getItems"
          :search="search"
        >
          <template v-slot:items="props">
            <td>{{ props.item.id }}</td>
            <td class="text-xs-center">{{ props.item.name }}</td>
            <td class="text-xs-center">{{ props.item.nameComplete }}</td>
            <td class="text-xs-center">{{ props.item.date }}</td>
            <td class="text-xs-center">{{ props.item.imageStorage.substr(0,15) }}</td>
            <td class="text-xs-center">{{ props.item.link !== '' ? 'con enlace' : 'sin enlace ' }}</td>
             <td class="text-xs-center">{{ props.item.categoryValue}}</td>
            <td class="text-xs-center">{{ props.item.description.substr(0,15) }}</td>
            <td class="justify-center layout px-0">
              <v-icon
                small
                class="mr-2"
                @click="editItem(props.item)"
              >
                edit
              </v-icon>
              <v-icon
                small
                @click="deleteItem(props.item)"
              >
                delete
              </v-icon>
            </td>
              <v-dialog v-model="dialogDelete" width="500">
                <v-card>
                  <v-card-title
                    class="headline grey lighten-2"
                    primary-title
                  >
                  Eliminar
                  </v-card-title>

                  <v-card-text>
                    Desea eliminar la imagen
                  </v-card-text>

                  <v-divider></v-divider>

                  <v-card-actions>
                    <v-spacer></v-spacer>
                    <v-btn
                      color="primary"
                      flat
                      @click="deleteItem(props.item)"
                    >
                      Aceptar
                    </v-btn>
                  </v-card-actions>
                </v-card>
              </v-dialog>
          </template>
          <template v-slot:no-results>
            <v-alert :value="true" color="error" icon="warning">
              Your search for "{{ search }}" found no results.
            </v-alert>
          </template>
        </v-data-table>
      </v-card>
    </v-flex>
    <!-- Dialog Update-- START -->
      <v-dialog v-model="dialog" max-width="500px">
        <v-card>
          <v-card-title>
            <span class="headline">Editar Foto</span>
          </v-card-title>
          <v-card-text>
            <v-container grid-list-md>
              <v-layout wrap>
                <v-flex xs12 sm6 md2>
                  <v-text-field v-model="editedItem.id" label="id" disabled></v-text-field>
                </v-flex>
                <v-flex xs12 sm6 md10>
                  <v-text-field v-model="editedItem.name" :counter="20" label="Nombre"></v-text-field>
                </v-flex>
                <v-flex xs12 sm6 md12>
                  <v-text-field v-model="editedItem.nameComplete" :counter="35" label="Nombre Completo"></v-text-field>
                </v-flex>
                <v-flex xs12 sm6 md12>
                  <v-text-field type="date" v-model="editedItem.date" label="Fecha"></v-text-field>
                </v-flex>
                <v-flex xs12 sm6 md12>
                  <v-text-field  v-model="editedItem.link" label="enlace opcional"></v-text-field>
                </v-flex>
                <v-flex xs12 sm6 md12>
                  <v-select
                    :items="category"
                    v-model="editedItem.categoryValue"
                    attach
                    chips
                    label="categoria"
                    multiple
                    ></v-select>
                  </v-flex>
                <v-flex xs12 sm6 md12>
                  <v-textarea v-model="editedItem.description" :counter="215" label="Descripción"></v-textarea>
                </v-flex>
                <!-- <v-alert
                  v-model="alertUpdate"
                  dismissible
                  type="success"
                >
                  actualizado correctamente
                </v-alert> -->
              </v-layout>
            </v-container>
          </v-card-text>
          <v-card-actions>
            <v-spacer></v-spacer>
            <v-btn color="blue darken-1" flat @click="close">Cancel</v-btn>
            <v-btn color="blue darken-1" flat @click="guardar(editedItem.id,editedItem.name,editedItem.nameComplete,editedItem.date,editedItem.description,editedItem.link,editedItem.categoryValue)">Guardar</v-btn>
          </v-card-actions>
        </v-card>
      </v-dialog>
      <!-- END -->
  </v-layout>
</template>

<script>
  import firebase from 'firebase'
  import { db } from '@/main'
  import { mapGetters,mapActions  } from 'vuex'
  export default {
    name:'tabla',
    beforeCreate() {
    this.$store.dispatch('setItems')
    },
    data () {
      return {
        alertUpdate:true,
        search: '',
        dialog: false,
        dialogDelete:false,
        editedItem: {
        name: '',
        nameComplete:'',
        imageStorage:null,
        date:'',
        description:'',
        link:'',
        categoryValue:null
        },
        category: ['costa', 'sierra', 'selva'],
        headers: [
          {
            text: 'Id',
            align: 'left',
            sortable: false,
            value: 'id'
          },
          { text: 'Nombres', align: 'center', value: 'name' },
          { text: 'Nombres Completo', align: 'center',value: 'nameComplete' },
          { text: 'Fecha', align: 'center', value: 'date' },
          { text: 'Imagen', align: 'center', value: 'image' },
          { text: 'Enlace', align: 'center', value: 'link' },
          { text: 'Categoria', align: 'center', value: 'categoryValue' },
          { text: 'Descripción', align: 'center', value: 'description' },
          { text: 'Acciones', value: 'id',sortable: false, }
        ]
      }
    },
    methods:{
      editItem (item) {
        this.editedItem = Object.assign({}, item)
        this.dialog = true
      },
      deleteItem(item){
        const storageRef = firebase.storage()
        // var desertRef = storageRef.child('imagenes/'+ item.imageStorage);
        storageRef.refFromURL(item.imageStorage).delete().then(function() {
            console.log('se elimino la imagen', item.imageStorage);
            alert('se elimino el archivo')         
        }).catch(function(error) {
            console.log('error');   
        });
         db.collection("gallery").doc(item.id).delete().then(function() {
          console.log(`tu id eliminado es ${item.id} y ${item.name} `);
        }).catch(function(error) {
            console.error("Error removing document: ", error);
        });
      },
      close () {
        this.dialog = false
      },
      guardar(id,name,nameComplete,date,description,link,categoryValue){
        // console.log(`el nombre es ${name} con id : ${id}`);  
        var galleryRef = db.collection("gallery").doc(id);
        return galleryRef.update({
          name:name,
          nameComplete:nameComplete,
          date:date,
          description:description,
          link:link,
          categoryValue:categoryValue
        }).then(function() {
          // this.dialog = false
          // alert('Actualizado correctamente')
          // this.alertUpdate = true
          console.log("Document successfully updated!");
        })
        .catch(function(error) {
            // The document probably doesn't exist.
            console.error("Error updating document: ", error);
        });
      }
    },
    // computed:mapGetters(['getItems'])
    computed: {
      ...mapGetters(['getItems']),
    },
  }
</script>

<style lang="scss" scoped>

</style>