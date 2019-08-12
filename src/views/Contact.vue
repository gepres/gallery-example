<template>
  <v-container>
    <v-layout>
      <v-flex>
        <h2 class="display-1">Contacto</h2>
      </v-flex>
    </v-layout>
    <v-layout class="text-md-center" justify-center row>
      <v-flex lg6>
        <v-form
          ref="form"
          v-model="valid"
          lazy-validation
          action="https://us-central1-examplefirebase-a860f.cloudfunctions.net/enviarEmail"
          method="post"
          @submit="enviar"
        >
          <v-text-field
            v-model="email"
            :rules="emailRules"
            label="E-mail"
            name="remite"
            required
          ></v-text-field>

           <v-text-field
            v-model="asunto"
            :counter="15"
            :rules="nameRules"
            label="Asunto"
            name="asunto"
            required
          ></v-text-field>
          
          <v-textarea
           v-model="mensaje"
          name="cuerpo"
          label="mensaje"
          hint="contenido"
        ></v-textarea>

          <v-btn
            :disabled="!valid"
            color="success"
            type="submit"
          >
            Enviar
          </v-btn>
           <v-alert
            :value="true"
            v-show="showContact"
            type="success"
          >
            Mensaje enviado satifactoriamente.
          </v-alert>
        </v-form>
      </v-flex>
    </v-layout>
  </v-container>
</template>

<script>
// import nodemailer from 'nodemailer'
// import functions from 'firebase/firebase-functions'
  export default {
    name:'contacto',
    mounted(){
      
    }, 
    data(){
      return {
      valid: true,
      nameRules: [
        v => !!v || 'Nombre es querido',
        v => (v && v.length <= 15) || 'Name must be less than 15 characters'
      ],
      email: '',
      emailRules: [
        v => !!v || 'E-mail es requerido',
        v => /.+@.+/.test(v) || 'E-mail must be valid'
      ],
      asunto:'',
      mensaje:'',
      showContact:false
      }
    },
    methods: {
      enviar(e){
        this.showContact = true
        setTimeout(() => {
           e.preventDefault();
            window.location.reload()
        }, 4000);
      }
    }
  }
</script>

<style lang="scss" scoped>

</style>