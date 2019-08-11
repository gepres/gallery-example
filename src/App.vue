<template>
  <v-app>
    <v-toolbar app>
      <v-toolbar-title class="headline text-uppercase">
        <span>Gallery</span>
        <span class="font-weight-light">GEPRES DESIGN</span>
      </v-toolbar-title>
      <v-spacer></v-spacer>
      <v-toolbar-items class="hidden-sm-and-down">
        <v-btn flatt to="/">Inicio</v-btn>
        <v-btn flatt to="/contacto">Contacto</v-btn>
        <v-btn flat to="/admin" v-show="loginApp">Admin</v-btn>
        <v-btn flat to="/tabla" v-show="loginApp">Tabla</v-btn>
        <!-- <v-btn flat to="/imagen">imagenes</v-btn> -->
        <v-btn flat to="/login" v-show="observador">Login</v-btn>
      </v-toolbar-items>
       <v-spacer></v-spacer>
      <v-toolbar-title v-show="loginApp">{{emailNav}}</v-toolbar-title>
      <!-- <p>{{observar}}</p>
      <p>{{logueado}}</p> -->
       <v-btn round color="info" v-show="loginApp" @click="salir" dark>salir</v-btn>
    </v-toolbar>
    <v-content>
      <router-view/>
    </v-content>
  </v-app>
</template>

<script>
import firebase from 'firebase'
export default {
  name: 'App',
  data () {
    return {
      loginApp:false,
      observador:true,
      emailNav:''
    }
  },
  methods:{
    salir(){
      firebase.auth().signOut().then(()=> {
        console.log('se salio de administración');
        this.$router.replace('/')
      }).catch(function(error) {
        // An error happened.
      });
    },
    logueado(){
      firebase.auth().onAuthStateChanged((user) => {
        if (user) {
          console.log('ingresado app ' + user.email);
          // console.log('login : ' + this.loginApp); 
          this.loginApp = true
          this.observador = false
          this.emailNav = user.email       
        } else {
          // console.log('no ingresado');
        }
      });
    }
  },
  mounted(){
    this.logueado()
  }
}
</script>
