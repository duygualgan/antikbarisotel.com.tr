import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'

const routes = [
  {
    path: '/',
    name: 'home',
    component: HomeView
  },
  {
    path: '/otel',
    name: 'OtelPage',
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () => import(/* webpackChunkName: "about" */ '../views/OtelPages.vue')
  },
  {
    path: '/odalarımız',
    name: 'RoomsPage',
    component: () => import(/* webpackChunkName: "cart" */ '../views/RoomsPage.vue')
  },
  {
    path: '/iletişim',
    name: 'ContactPage',
    component: () => import(/* webpackChunkName: "contact" */ '../views/ContactPage.vue')
  },
  {
    path: '/hizmetlerimiz',
    name: 'ServicesPage',
    component: () => import(/* webpackChunkName: "contact" */ '../views/ServicesPage.vue')
  },
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})

export default router
