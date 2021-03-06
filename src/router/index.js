import { createRouter, createWebHistory } from 'vue-router'
import store from '../store/index'

const Dashboard = () => import('../views/Dashboard/index.vue')
const Home = () => import('../views/Home/index.vue')
const Login = () => import('../views/Login/index.vue')

const routes = [
  {
    path: '/dashboard',
    name: 'Dashboard',
    component: Dashboard,
    meta: {
      requiresAuth: true
    }
  },
  {
    path: '/',
    name: 'Home',
    component: Home
  },
  {
    path: '/login',
    name: 'Login',
    component: Login,
    meta: {
      requiresAuth: false
    }
  },
  {
    path: '/:pathMatch(.*)*',
    redirect: { name: 'Home' }
  }
]

const router = createRouter({
  history: createWebHistory('/'),
  routes
})

router.beforeEach((to, from, next) => {
  if (to.meta.requiresAuth && !store.getters.isAuthenticated) {
    next({
      path: '/login',
      query: { redirect: to.name }
    })
  } else {
    if (store.getters.isAuthenticated && to.meta.requiresAuth === false) {
      next({ path: '/dashboard' })
    } else {
      next()
    }
  }
})

export default router
