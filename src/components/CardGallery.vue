<template>
      <v-flex xs12 sm6 md4 lg4>
      <v-hover>
        <v-card
          slot-scope="{ hover }"
          class="mx-auto"
          color="grey lighten-4"
          max-width="600"
        >
          <v-img
            :aspect-ratio="16/9"
            :src="gallery.imageStorage"
          >
            <v-expand-transition>
              <div
                v-if="hover"
                class="d-flex transition-fast-in-fast-out green lighten-3 v-card--reveal subheading white--text"
                style="height: 100%;"
              >
                <div xs class="text-lg-center text-xs-center text-md-center">
                  <p>{{gallery.name}}</p>
                  <v-btn round color="success"  @click.stop="dialog = true">Detalles</v-btn>
                </div>
              </div>
            </v-expand-transition>
          </v-img>
        </v-card>
      </v-hover>
    <!-- MODAL - START -->
    <v-dialog
      v-model="dialog"
      max-width="900"
    >
      <v-card>
        <v-card-title class="headline green darken-1 white--text">Fotografia</v-card-title>
        <v-img class="white--text" :aspect-ratio="16/9" :src="gallery.imageStorage">
        <v-card-title class="align-end fill-height">{{gallery.name}}</v-card-title>
        </v-img>
         <v-card-title class="headline green lighten-5">{{gallery.name}}</v-card-title>
        <v-card-text primary-title>
            <div>
              <div class="dialog-description">
                <span class="grey--text subtitle-1 lineheight">Descripción</span>
                <br>
                <p>{{gallery.description}}</p>
              </div>
              <span class="grey--text subtitle-1 lineheight">Detalles</span>
              <br>
              <ul class="dialog-list">
                <li class="dialog-item">
                  Nombre : <span>{{gallery.nameComplete}}</span>
                </li>
                <li>
                  Necha de publicación : <span>{{gallery.date}}</span>
                </li>
              </ul>
            </div>
        </v-card-text>
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn
            color="green darken-1"
            text
            @click="dialog = false"
            class="white--text"
          >
            Aceptar
          </v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
        </v-flex>
    <!-- MODAL - END -->
</template>

<script>
import url from '@/assets/ave3.jpg'
  export default {
    name:'card-gallery',
    props:['gallery'],
    data(){
      return {
        dialog:false,
      }
    }
  }
</script>

<style lang="scss" scoped>
.galery{
  padding: 0;
}
.v-card--reveal {
  align-items: center;
  bottom: 0;
  justify-content: center;
  opacity: .9;
  position: absolute;
  width: 100%;
}
.dialog {
  &-description{
    margin-bottom: 2.5rem;
  }
  &-list{
    & li{
      list-style: none;
    }
  }
}
.lineheight{
  line-height: 3;
}
</style>