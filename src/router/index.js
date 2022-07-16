import { createRouter, createWebHistory } from 'vue-router'
import Home from '../views/Home.vue'

const routes = [
  {
    path: '/',
    name: 'home',
    component: Home,
    meta:{layout: 'MainLayout'}
  },
  {
    path: '/clients',
    name: 'clients',
    component: () => import(/* webpackChunkName: "clients" */ '../views/Clients.vue'),
    meta:{layout: 'MainLayout'}
  },
  {
    path: '/groups',
    name: 'groups',
    component: () => import(/* webpackChunkName: "groups" */ '../views/Groups.vue'),
    meta:{layout: 'MainLayout'}
  },
  {
    path: '/mark',
    name: 'mark',
    component: () => import(/* webpackChunkName: "mark" */ '../views/Mark.vue'),
    meta:{layout: 'MainLayout'}
  },
  {
    path: '/tasks',
    name: 'tasks',
    component: () => import(/* webpackChunkName: "tasks" */ '../views/Tasks.vue'),
    meta:{layout: 'MainLayout'}
  },
  {
    path: '/schedule',
    name: 'schedule',
    component: () => import(/* webpackChunkName: "schedule" */ '../views/Schedule.vue'),
    meta:{layout: 'MainLayout'}
  },
  {
    path: '/settings',
    name: 'settings',
    component: () => import(/* webpackChunkName: "settings" */ '../views/Settings.vue'),
    meta:{layout: 'MainLayout'}
  },
  {
    path: '/analytics',
    name: 'analytics',
    component: () => import(/* webpackChunkName: "analytics" */ '../views/Analytics.vue'),
    meta:{layout: 'MainLayout'}
  },
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})

export default router
