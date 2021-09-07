import { createRouter, createWebHistory } from 'vue-router'
import Landing from '../views/Landing';
import AssetCreate from '../views/AssetCreate';
import AssetView from '../views/AssetView';
import AssetModify from '../views/AssetModify';

const routes = [
  {
    path: '/asset/create',
    name: 'Asset Creation',
    component: AssetCreate
  },
  {
    path: '/asset/modify/:assetID',
    name: 'Asset Modification',
    component: AssetModify,
    props: true
  },
  {
    path: '/asset/:assetID',
    name: 'Asset Information',
    component: AssetView,
    props: true
  },
  {
    path: '/',
    name: 'Landing',
    component: Landing
  },
  // {
  //   path: '*',
  //   redirect: '/'
  // }
]

const router = createRouter({
  history: createWebHistory(),
  routes
})

export default router
