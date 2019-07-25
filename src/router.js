import Vue from 'vue'
import Router from 'vue-router'
import Home from './views/Home.vue'

Vue.use(Router)

export default new Router({
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
      component: () => import(/* webpackChunkName: "admin" */ './views/Admin.vue')
    },
    {
      path: '/tabla',
      name: 'tabla',
      component: () => import(/* webpackChunkName: "admin" */ './views/Tabla.vue')
    },
    {
      path: '/imagen',
      name: 'iamgen',
      component: () => import(/* webpackChunkName: "admin" */ './views/image-storage/Form-image.vue')
    }
  ]
})
