import { createRouter, createWebHashHistory } from 'vue-router'
import Landing from '../views/Landing';
import CreateAsset from '../views/CreateAsset';

const routes = [
  {
    path: '/create',
    name: 'Asset Creation',
    component: CreateAsset
  },
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
