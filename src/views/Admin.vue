<template>
  <v-container>
     <v-layout mb-4>
        <v-flex>
          <h2 class="display-1">Administración</h2>
        </v-flex>
      </v-layout>
      <v-layout class="text-md-center" justify-center row>
        <v-flex lg6>
          <v-form
            ref="form"
            v-model="valid"
            lazy-validation
          >
            <v-text-field required
              v-model="name"
              :counter="20"
              :rules="nameRules"
              label="Nombre"
            ></v-text-field>

            <v-text-field
              v-model="nameComplete"
              :counter="35"
              :rules="nameCompleteRules"
              label="Nombre Completo"
              required
            ></v-text-field>

            <!-- <v-text-field
              v-model="image"
              label="url de imagen"
              required
            ></v-text-field> -->

            <input type="file" accept="image/*"  @change="onFileSeleted">

             <v-progress-linear
            color="warning"
            height="15"
            :value="uploadValue"
            max="100"
          ></v-progress-linear>

            <v-text-field
              v-model="date"
              type="date"
              label="Fecha"
              required
            ></v-text-field>

             <v-textarea
                label="Descripción"
                value=""
                v-model="description"
                hint="Concepto"
                :counter="215"
                :rules="descriptionRules"
                required
              ></v-textarea> 
            <v-btn
              :disabled="!valid"
              color="success"
              @click="addGallery"
            >
              Agregar
            </v-btn>
            <v-alert :value="true" v-if="errors !== ''" type="error">
            {{errors}}
            </v-alert>
            <!-- <v-alert :value="true" v-else type="success" >
              Agregado
            </v-alert> -->
          </v-form>
        </v-flex>
      </v-layout>
  </v-container>
</template>

<script>
import { db } from '@/main'
import firebase from 'firebase'
  export default {
    name:'admin',
    data(){
      return {
          valid: true,
          name: '',
          nameComplete:'',
          // image:'',
          description:'',
          date:'',
          errors:'',
          seletedFile:null,
          picture:null,
          uploadValue:0,
          nameRules: [
            v => !!v || 'Nombre es requerido',
            v => (v && v.length <= 20) || 'El nombre debe tener menos de 20 caracteres'
          ],
          nameCompleteRules: [
            v => !!v || 'Nombre completo es requerido',
            v => (v && v.length <= 35) || 'El nombre Completo debe tener menos de 35 caracteres'
          ],
          descriptionRules: [
            v => !!v || 'descripción  es requerido',
            v => (v && v.length <= 215) || 'La descripción debe tener menos de 215 caracteres'
          ]
        }
    },
    methods:{
      onFileSeleted(event){
        this.seletedFile = event.target.files[0]        
      },
      addGallery () {
        this.errors = ''
        this.picture = null
        if (this.name !== '' &&  this.nameComplete !== '' && this.description !== '' && this.date !== '') {
          const storageRef = firebase.storage().ref('imagenes/'+ this.seletedFile.name);
          const task = storageRef.put(this.seletedFile)
          task.on('state_changed',snapshot => {
          let percentage = (snapshot.bytesTransferred/snapshot.totalBytes)*100
          this.uploadValue = percentage
          },
          error => {
          console.log(error.mesagge)
          },
          () => {
            this.uploadValue=100
            //downloadULR
            task.snapshot.ref.getDownloadURL().then((url)=>{
            this.picture = url
            // console.log("url image: ",this.picture);
            db.collection('gallery').add({
              name: this.name,
              nameComplete: this.nameComplete,
              description: this.description,
              // image: this.image,
              date:this.date,
              imageStorage:this.picture
            }).then((res) => {
              console.log("Documento con ID: ", res.id); 
              console.log("url image: ", this.picture);    
              if (res) {
                this.name = '',
                this.nameComplete ='',
                // this.image = '',
                this.description = '',
                this.date = ''              
              }
            }).catch((error) => {
              this.errors = error
            })
            }) 
          })
      } else {
        this.errors = 'Por favor ingrese texto'
      }
    }
  }
  }
</script>

<style lang="scss" scoped>

</style>