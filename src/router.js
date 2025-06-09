import { createRouter, createWebHistory } from 'vue-router'
import { useScrollAnimation } from './composables/useScrollAnimation'

const routes = [
  {
    path: '/',
    component: () => import('./App.vue'),
    children: [
      {
        path: '',
        name: 'home',
        component: () => import('./pages/Hero.vue'),
        meta: { transition: 'fade' }
      },
      {
        path: '#projects',
        name: 'projects',
        component: () => import('./pages/Projects.vue'),
        meta: { transition: 'slide-up' }
      },
      {
        path: '#skills',
        name: 'skills',
        component: () => import('./pages/Skills.vue'),
        meta: { transition: 'slide-up' }
      },
    //   {
    //     path: '#about',
    //     name: 'about',
    //     component: () => import('./pages/About.vue'),
    //     meta: { transition: 'slide-up' }
    //   },
    //   {
    //     path: '#contact',
    //     name: 'contact',
    //     component: () => import('./pages/Contact.vue'),
    //     meta: { transition: 'slide-up' }
    //   }
    ]
  }
]

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes,
  scrollBehavior(to, from, savedPosition) {
    if (to.hash) {
      return {
        el: to.hash,
        behavior: 'smooth',
        top: 80 // Offset for fixed header
      }
    } else if (savedPosition) {
      return savedPosition
    } else {
      return { top: 0 }
    }
  }
})

// Initialize scroll animations after navigation
router.afterEach((to) => {
  if (to.hash) {
    setTimeout(() => {
      useScrollAnimation()?.setupAnimations()
    }, 500)
  } else {
    useScrollAnimation()?.setupAnimations()
  }
})

export default router