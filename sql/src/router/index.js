import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/home',
      name: 'home',
      component: HomeView
    },
    {
      path: '/account',
      name: 'account',
      component: () => import('../views/Account.vue')
    },
    {
      path: '/',
      name: 'login',
      component: () => import('../views/LogIn.vue')
    },
    {
      path: '/register',
      name: 'register',
      component: () => import('../views/register.vue')
    }
  ]
})

export default router
