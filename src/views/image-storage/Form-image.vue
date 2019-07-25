<template>
  <v-container>
    <v-layout>
      <v-flex>
        <h1>formulario para enviar imagenes</h1>
      </v-flex>
    </v-layout>
    <v-layout row wrap>
      <v-flex md6>
        <v-flex>
          <v-progress-linear
            color="warning"
            height="15"
            :value="uploadValue"
            max="100"
          ></v-progress-linear>
        </v-flex>
        <v-flex md12>
          <input
            type="file"
            accept="image/*"
            @change="onFileSeleted"
          >
        </v-flex>
        <v-flex>
          <v-btn color="info" @click="onUpload">subir</v-btn>
        </v-flex>
      </v-flex>
      <v-flex md4>
        <img :src="picture" alt="" width="200">
      </v-flex>
    </v-layout>
  </v-container>
</template>

<script>
import { db } from '@/main'
import firebase from 'firebase'
  export default {
    name:'imagen',
    data(){
      return{
        seletedFile:null,
        uploadValue:0,
        picture:null
      }
    },
    methods:{
      onFileSeleted(event){
        this.seletedFile = event.target.files[0]        
      },
      onUpload(){
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
            console.log(this.picture);
            }) 
        })
      } 
    }
  }
</script>

<style lang="scss" scoped>

</style>