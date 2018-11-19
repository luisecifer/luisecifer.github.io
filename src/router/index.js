import Vue from 'vue'
import Router from 'vue-router'
import KezdoOldal from '@/components/KezdoOldal'
import Register from '@/components/Register'
import Login from '@/components/Login'
import Reservation from '@/components/Reservation'
import Browse from '@/components/Browse'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'home',
      component: KezdoOldal
    },
    {
      path: '/register',
      name: 'register',
      component: Register
    },
    {
      path: '/login',
      name: 'login',
      component: Login
    },
    {
      path: '/reservation',
      name: 'reservation',
      component: Reservation
    },
    {
      path: '/browse',
      name: 'browse',
      component: Browse
    }
  ]
})
