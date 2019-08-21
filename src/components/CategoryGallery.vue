<template>
  <v-container fluid class="galery">
    <v-layout>
      <ul class="portfolio-filter">
        <li class="filter" data-filter="*">all</li>
        <li class="filter" data-filter=".costa">costa</li>
        <li class="filter" data-filter=".sierra">sierra</li>
        <li class="filter" data-filter=".selva">selva</li>
      </ul>
    </v-layout>
    <!-- v-images-loaded:on.progress="imageProgress" -->
     <v-layout row wrap class="grid">
       <div v-for="item in this.$store.getters.getItems" :key="item.id" class="grid-item" :class="item.categoryValue" style="background:red; margin:1rem;">
        <p>{{item.name}}</p>
        <img :src="item.imageStorage" alt="" style="width:100px; height:100px">
      </div>   
   </v-layout>
   <div class="grid">
      <v-layout class="grid" row wrap>
        <v-flex v-for="gallery in this.$store.getters.getItems" :key="gallery.id" class="grid-item" :class="gallery.categoryValue" lg4 md4 sm6 xs12>
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
                :alt="gallery.nameComplete"
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
          <v-dialog
            v-model="dialog"
            max-width="900"
          >
            <v-card>
              <v-card-title class="headline green darken-1 white--text">Fotografía</v-card-title>
              <v-img class="white--text" :aspect-ratio="16/9" :src="gallery.imageStorage" :alt="gallery.nameComplete">
              <v-card-title class="align-end justify-end  fill-height">Matthews Carbonel</v-card-title>
              </v-img>
              <v-card-title class="headline green lighten-5">{{gallery.name}}</v-card-title>
              <v-card-text primary-title>
                  <v-layout wrap>
                    <v-flex class="dialog-description" lg6 md6 sm12 xs12>
                      <span class="green--text darken-4 subtitle-1 lineheight"><b>Descripción</b></span>
                      <br>
                      <p  class="ml-4 mr-3">{{gallery.description}} 
                        <a :href="gallery.link" class="dialog-description__link" v-show="enlace" target="_black">Enlace adicional</a>
                      </p>
                    </v-flex>
                  <v-flex class="dialog-detalles" lg6 md6 sm12 xs12>
                    <span class="green--text darken-4 subtitle-1 lineheight" ><b>Detalles</b></span>
                    <br>
                    <div style="display:flex;" class="ml-4">
                      <div class="dialog-detalles__left">
                        <b><p>Nombre completo<span>:</span></p></b>
                        <b><p>Fecha de publicación<span>:</span></p></b>
                      </div>
                      <div class="dialog-detalles__right">
                          <p>{{gallery.nameComplete}}</p>
                          <p>{{gallery.date}}</p>
                      </div>
                    </div>
                  </v-flex>
                  <v-flex  lg6 md6 sm12 xs12>
                      <v-chip label class="green darken-1 ml-0 mr-2" text-color="white" v-for="(item, index) in gallery.categoryValue" :key="index">
                        <v-icon left>label</v-icon>{{item}}
                      </v-chip>
                  </v-flex>
                  </v-layout>
              </v-card-text>
              <v-card-actions>
                <v-spacer></v-spacer>
                <v-btn
                  color="green darken-1"
                  text
                  @click="dialog = false"
                  class="white--text"
                >
                  Cerrar
                </v-btn>
              </v-card-actions>
            </v-card>
          </v-dialog>
        </v-flex>
        <!-- MODAL - END -->
      </v-layout>
    </div>
   <pre>{{$data.content}}</pre>
  </v-container>
</template>

<script>
import Isotope from 'isotope-layout'
import imagesLoaded from 'vue-images-loaded'
import { log } from 'util';
  export default {
    name:'category-gallery',
    beforeCreate: function () {
      this.$store.dispatch('setItems')
      // this.relayoutTheGrid()
    },
    created(){
      this.relayoutTheGrid()
    },
    data(){
      return {
        dialog:false,
        enlaceShow:false,
        content:this.$store.getters.getItems,
          galleryTest:[
          {
            id:1,
            name:'uno',
            class:'costa'
          },
          {
            id:2,
            name:'dos',
            class:'sierra'
          },
          {
            id:3,
            name:'tres',
            class:'selva'
          },
          {
            id:4,
            name:'cuatro',
            class:'selva'
          }
        ],
        isotope:null,
        counter:0
      }
    },
    directives: {
        imagesLoaded
    },
    methods:{
     relayoutTheGrid(){
       setTimeout(() => {
         var elem = document.querySelector('.grid')
        // console.log(elem);
        this.isotope = new Isotope(elem,{
          itemSelector:'.grid-item',
           layoutMode: 'fitRows'
        })
        var filtersElem = document.querySelector('.portfolio-filter');
        filtersElem.addEventListener('click',  (event) => {
          // only work with buttons
          // if (!matchesSelector(event.target, 'li')) {
          //   return;
          // }
          var filterValue = event.target.getAttribute('data-filter');
          // use matching filter function
          filterValue = filterValue || filterValue;
          this.isotope.arrange({ filter: filterValue });
        });

        // change is-checked class on buttons
        var buttonGroups = document.querySelectorAll('.portfolio-filter');
        for (var i = 0, len = buttonGroups.length; i < len; i++) {
          var buttonGroup = buttonGroups[i];
          // radioButtonGroup(buttonGroup);
        }

        // function radioButtonGroup(buttonGroup) {
        //   buttonGroup.addEventListener('click', function (event) {
        //     // only work with buttons
        //     if (!matchesSelector(event.target, 'li')) {
        //       return;
        //     }
        //     buttonGroup.querySelector('.active').classList.remove('active');
        //     event.target.classList.add('active');
        //   });
        // }
        }, 1);    
      },
      imageProgress(instance, image ) {
      console.log('instance',instance,'image',image)
      this.counter++;
      if(this.counter == this.item.imageStorage.length){
        this.relayoutTheGrid()
      }
    }
    },
    computed:{
      //forma que si quiere poner un enlace
      enlace(){
        // if(this.gallery.link !== ''){
        //   return this.enlaceShow = true
        // }
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
  &-detalles{
    &__left{
      max-width: 35%;
    // background: red;
       @media screen and (max-width:960px) {
          max-width: 50%;
       }
      & p {
        color:#81C784;
      }
      & span{
        float: right;
      }
    }
    &__right{
      padding-left: 10px;
    }
  }
  &-description{
    &__link{
      text-decoration: none;
      color:#9CCC65;
    }
  }
}
.lineheight{
  line-height: 3;
}
.portfolio-filter li {
  display: inline-block;
  font-size: 11px;
  font-weight: 700;
  text-transform: uppercase;
  color: #898d90;
  margin-right: 65px;
  cursor: pointer;
  padding: 10px 0;
}

.portfolio-filter li:last-child {
  margin-right: 0;
}

.portfolio-filter li.active {
  color: #323232;
}
</style>