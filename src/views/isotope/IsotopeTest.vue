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
        <v-flex v-for="gallery in this.$store.getters.getItems"  class="grid-item" :key="gallery.id" :class="gallery.categoryValue"  lg4 md4 sm6 xs12>
            <v-card
              class="mx-auto"
              color="grey lighten-4"
              max-width="600"
            >
              <img
                :src="gallery.imageStorage"
                :alt="gallery.nameComplete"
                style="width:auto; height:100px"
              >
            </v-card>
          <!-- <p>{{item.name}}</p>
          <img :src="item.imageStorage" alt="" style="width:100px; height:100px"> -->
        </v-flex>   
      </v-layout>
      <!-- <pre>{{this.$store.getters.getItems}}</pre> -->
  </v-container>
</template>

<script>
import Isotope from 'isotope-layout'
  export default {
    name:'test',
    beforeCreate: function () {
      this.$store.dispatch('setItems')
    },
    created(){
      this.relayoutTheGrid()
    },
    data(){
      return {
        content:this.$store.getters.getItems,
        isotope:null
      }
    },
    // end data
    methods:{
      relayoutTheGrid(){
       setTimeout(() => {
         var elem = document.querySelector('.grid')
        // console.log(elem);
        this.isotope = new Isotope(elem,{
          itemSelector:'.grid-item',
           layoutMode: 'masonry'
        })
        var filtersElem = document.querySelector('.portfolio-filter');
        filtersElem.addEventListener('click',  (event) => {
          var filterValue = event.target.getAttribute('data-filter');
          filterValue = filterValue || filterValue;
          this.isotope.arrange({ filter: filterValue });
        });

        var buttonGroups = document.querySelectorAll('.portfolio-filter');
        for (var i = 0, len = buttonGroups.length; i < len; i++) {
          var buttonGroup = buttonGroups[i];
        }
        }, 1);    
      },
      imageProgress(instance, image ) {
      console.log('instance',instance,'image',image)
      this.counter++;
      if(this.counter == this.item.imageStorage.length){
        this.relayoutTheGrid()
      }
    }
    }
    // end metodos
  }
</script>

<style scoped>
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