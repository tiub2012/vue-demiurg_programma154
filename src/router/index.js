import { createRouter, createWebHistory } from 'vue-router'
import MainMenu from '../pages/MenuPage'
import Scena from '../pages/ScenaPage'
import Practic from '../pages/PracticPage'

const routes = [
  {
    path: '/',
    name: 'main-menu',
    component: MainMenu
  },
  {
    path: '/video',
    name: 'video',
    component: Scena,
  },
  {
    path: '/practic',
    name: 'practic',
    component: Practic,
  }
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})

export default router
