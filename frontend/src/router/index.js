import { createRouter, createWebHashHistory } from 'vue-router'
import Landing from '../views/Landing';
import CreateAsset from '../views/CreateAsset';
import AssetPage from '../views/AssetPage';

const routes = [
  {
    path: '/create',
    name: 'Asset Creation',
    component: CreateAsset
  },
  {
    path: '/asset/:assetID',
    name: 'Asset Information',
    component: AssetPage,
    props: true
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
