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
        >
          <v-text-field
            v-model="name"
            :counter="15"
            :rules="nameRules"
            label="Nombre"
            required
          ></v-text-field>

          <v-text-field
            v-model="email"
            :rules="emailRules"
            label="E-mail"
            required
          ></v-text-field>

           <v-text-field
            v-model="asunto"
            :counter="15"
            :rules="nameRules"
            label="Asunto"
            required
          ></v-text-field>
          
          <v-textarea
           v-model="mensaje"
          name="input-7-1"
          label="mensaje"
          hint="contenido"
        ></v-textarea>

          <v-btn
            :disabled="!valid"
            color="success"
            @click="validate"
          >
            Validate
          </v-btn>
        </v-form>
      </v-flex>
    </v-layout>
  </v-container>
</template>

<script>
  export default {
    name:'contacto',
    data(){
      return {
      valid: true,
      name: '',
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
      mensaje:''
      }
    },
    methods: {
      validate () {
        if (this.$refs.form.validate()) {
          this.snackbar = true
        }
      }
    }
  }
</script>

<style lang="scss" scoped>

</style>