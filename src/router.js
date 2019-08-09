import Vue from 'vue'
import Router from 'vue-router'
import Home from './views/Home.vue'
import firebase from 'firebase'
Vue.use(Router)

const router = new Router({
  mode: 'history',
  base: process.env.BASE_URL,
  routes: [
    {
      path: '/',
      name: 'home',
      component: Home
    },
    {
      path: '/admin',
      name: 'admin',
      component: () => import(/* webpackChunkName: "admin" */ './views/Admin.vue'),
      meta: {
        autentificado:true
      }
    },
    {
      path: '/tabla',
      name: 'tabla',
      component: () => import(/* webpackChunkName: "admin" */ './views/Tabla.vue'),
      meta: {
        autentificado: true
      }
    },
    {
      path: '/imagen',
      name: 'imagen',
      component: () => import(/* webpackChunkName: "admin" */ './views/image-storage/Form-image.vue')
    },
    {
      path: '/login',
      name: 'login',
      component: () => import(/* webpackChunkName: "admin" */ './views/Login.vue')
    },
    {
      path: '/contacto',
      name: 'contact',
      component: () => import(/* webpackChunkName: "admin" */ './views/Contact.vue')
    }
  ]
})

router.beforeEach((to, from, next) => {
  let usuario = firebase.auth().currentUser;
  // console.log(usuario);
  
  let autorizacion = to.matched.some(record => record.meta.autentificado);
  // console.log(autorizacion);
  
  if (autorizacion && !usuario){
    console.log('no puede ingresar a tabla y admin') 
    next('home')
  }else if(!autorizacion && usuario){
    next()
  }else{
    next();
  }
})

export default router;