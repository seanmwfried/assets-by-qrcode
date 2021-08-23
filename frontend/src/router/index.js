import { createRouter, createWebHashHistory } from 'vue-router'
import Landing from '../views/Landing';

const routes = [
  {
    path: '/',
    name: 'Landing',
    component: Landing
  }
]

const router = createRouter({
  history: createWebHashHistory(),
  routes
})

export default router
