<template>
 <v-container fluid class="galery">
   <v-layout row wrap>
    <v-flex d-flex>
      <cardGallery v-for="item in this.$store.getters.getItems" :key="item.id" :gallery="item"></cardGallery>
    </v-flex>
   </v-layout>
 </v-container>
</template>

<script>
  import cardGallery from '../components/CardGallery'

  export default {
    name:'home',
    components: {
      cardGallery
    },
    beforeCreate: function () {
    this.$store.dispatch('setItems')
    },
    data(){
      return {
        aves:[
          {
            id:1,
            name:'Costa Iqueña',
            nameComplete:'Costa iqueña de pisco',
            image:"https://picsum.photos/id/237/700/700",
            description:'paisaje de todo el peru en una fota unica que complace los ojos',
            date:'18/12/93'
          },
          {
            id:2,
            name:'Sierra ayacuchana',
            nameComplete:'Sierra ayacuchana de coracora',
            image:'https://picsum.photos/id/240/700/700',
            description:'paisaje de todo el peru en una fota unica que complace los ojos',
            date:'18/10/91'
          }
        ]
      }
    }
  }
</script>
<style lang="scss" scoped>
.galery{
  padding: 0;
}
</style>
