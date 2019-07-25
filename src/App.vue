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
        <v-btn flat to="/admin">Admin</v-btn>
        <v-btn flat to="/tabla">Tabla</v-btn>
        <v-btn flat to="/imagen">imagenes</v-btn>
      </v-toolbar-items>
    </v-toolbar>
    <v-content>
      <router-view/>
    </v-content>
  </v-app>
</template>

<script>

export default {
  name: 'App',
  data () {
    return {
      //
    }
  }
}
</script>
