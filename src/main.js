import '@babel/polyfill'
import Vue from 'vue'
import './plugins/vuetify'
import App from './App.vue'
import router from './router'
import store from './store'
import firebase from 'firebase'

Vue.config.productionTip = false

const config = {
  apiKey: "AIzaSyCJOns2ymZ1L5VGUV2xB4HusC23ZtDO6qM",
  authDomain: "examplefirebase-a860f.firebaseapp.com",
  databaseURL: "https://examplefirebase-a860f.firebaseio.com",
  projectId: "examplefirebase-a860f",
  storageBucket: "examplefirebase-a860f.appspot.com",
  messagingSenderId: "517689273054",
  appId: "1:517689273054:web:821c12f28064c35e"
};

firebase.initializeApp(config)

export const db = firebase.firestore()


new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
