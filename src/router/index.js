import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '../views/Home.vue'
import Text from '../views/TextsPages.vue'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'home',
    component: Home
  },
  {
    path: '/texts/:page',
    name: 'texts-pages',
    component: Text
  }
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router
