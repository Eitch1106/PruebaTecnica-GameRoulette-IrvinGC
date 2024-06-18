import { createRouter, createWebHistory } from 'vue-router'
import MainView from '../views/MainView.vue'
import LoginView from '../views/LoginView.vue'
import { userStore } from '../stores/userStore.js'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
  
    {
      path: '/main',
      name: 'main',
      component: MainView,
      meta: { requiresAuth: true }
    },
    {
      path: '/',
      name: 'login',
      component: LoginView
    }
  ]
})

router.beforeEach((to, from, next) => {
  const store = userStore(); 
  if (to.matched.some(record => record.meta.requiresAuth)) {

    if (!store.isAuthenticated) {
      
      next({ name: 'login' })
    } else {
      next()
    }
  } else {
    next()
  }
})

export default router
