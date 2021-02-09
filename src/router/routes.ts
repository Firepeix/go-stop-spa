import { RouteConfig } from 'vue-router'

const routes: RouteConfig[] = [
  {
    path: '/',
    component: () => import('layouts/MainLayout.vue'),
    children: [
      { path: '', component: () => import('pages/Index.vue') }
    ]
  },
  {
    path: '/streets',
    component: () => import('layouts/MainLayout.vue'),
    children: [
      { path: '', name: 'street.index', component: () => import('pages/geographic/street/Index.vue') }
    ]
  },
  {
    path: '/traffic-lights',
    component: () => import('layouts/MainLayout.vue'),
    children: [
      { path: '', name: 'traffic-light.index', component: () => import('pages/control/traffic-light/Index.vue') }
    ]
  },
  {
    path: '/cameras',
    component: () => import('layouts/MainLayout.vue'),
    children: [
      { path: '', name: 'camera.index', component: () => import('pages/vision/camera/Index.vue') }
    ]
  },
  {
    path: '/simulations',
    component: () => import('layouts/MainLayout.vue'),
    children: [
      { path: '', name: 'simulation.index', component: () => import('pages/simulation/Index.vue') },
      { path: 'create', name: 'simulation.create', component: () => import('pages/simulation/Create.vue') }
    ]
  },

  // Always leave this as last one,
  // but you can also remove it
  {
    path: '*',
    component: () => import('pages/Error404.vue')
  }
]

export default routes
