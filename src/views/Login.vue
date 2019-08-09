<template>
  <v-container>
    <v-layout justify-center row>
      <v-flex mb4 lg6>
         <v-form
            ref="form"
            v-model="valid"
            lazy-validation
          >
            <v-text-field
              v-model="email"
              :rules="emailRules"
              label="E-mail"
              required
            ></v-text-field>
            <v-text-field
              v-model="password"
              label="Contraseña"
              required
            ></v-text-field>

            <v-btn
              :disabled="!valid"
              color="success"
              @click="ingresar"
            >
              Ingresar
            </v-btn>
          </v-form>
      </v-flex>
    </v-layout>
  </v-container>
</template>

<script>
    import firebase from 'firebase'
  export default {
    name:'login',
     data(){
      return {
        valid: true,
      password:'',
      email: '',
      emailRules: [
        v => !!v || 'E-mail is required',
        v => /.+@.+/.test(v) || 'E-mail must be valid'
      ]
      }
    },
    methods: {
      ingresar(){
        firebase.auth().signInWithEmailAndPassword(this.email, this.password).then(() => {
          console.log('ingresado por firebase')
        }).catch(function(error) {
          // Handle Errors here.
          var errorCode = error.code;
          var errorMessage = error.message;
          console.log('no a ingresado');
          // ...
        });
      }
    }
    
  }
</script>

<style lang="scss" scoped>

</style>