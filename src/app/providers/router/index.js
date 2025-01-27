import { createRouter, createWebHistory } from 'vue-router'
import MainLayout from '@/shared/ui/layouts/main-layout/MainLayout.vue'

const routes = [
  {
    path: '/',
    name: 'home',
    component: () =>
      import(/* webpackChunkName: "clients" */ '@/pages/home'),
    meta: { layout: MainLayout },
  },
  {
    path: '/clients',
    name: 'clients',
    component: () =>
      import(/* webpackChunkName: "clients" */ '@/pages/clients'),
    meta: { layout: MainLayout },
  },
  {
    path: '/mark',
    name: 'mark',
    component: () =>
      import(/* webpackChunkName: "mark" */ '@/pages/mark'),
    meta: { layout: MainLayout },
  },
  {
    path: '/tasks',
    name: 'tasks',
    component: () =>
      import(/* webpackChunkName: "tasks" */ '@/pages/tasks'),
    meta: { layout: MainLayout },
  },
  {
    path: '/schedule',
    name: 'schedule',
    component: () =>
      import(/* webpackChunkName: "schedule" */ '@/pages/schedule'),
    meta: { layout: MainLayout },
  },
  {
    path: '/settings',
    name: 'settings',
    component: () =>
      import(/* webpackChunkName: "settings" */ '@/pages/settings'),
    meta: { layout: MainLayout },
  },
  {
    path: '/analytics',
    name: 'analytics',
    component: () =>
      import(/* webpackChunkName: "analytics" */ '../../../pages/analytics'),
    meta: { layout: MainLayout },
  },
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes,
})

export default router
