import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/DashboardView.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: HomeView,
    },
    {
      path: '/about',
      name: 'about',
      // route level code-splitting
      // this generates a separate chunk (About.[hash].js) for this route
      // which is lazy-loaded when the route is visited.
      component: () => import('../views/AboutView.vue'),
    },
    {
      path: '/googleAuth',
      name: 'googleAuth',
      component: () => import('../views/GoogleAuthSuccessView.vue'),
    },
    {
      path: '/dashboard',
      name: 'Dashboard',
      component: () => import('../views/DashboardView.vue'),
    },
    {
      path: '/profile',
      name: 'Profile',
      component: () => import('../views/ProfileView.vue'),
      meta: {
        requireAuth : true
      }
    },
    {
      path: '/story',
      name: 'MyStory',
      component: () => import('../views/MyStoryView.vue'),
      meta: {
        requireAuth : true
      }
    },
    {
      path: '/blog',
      name: 'Blog',
      component: () => import('../views/BlogCreate.vue'),
      meta: {
        requireAuth : true
      }
    },
    {
      path: '/blog-details/:blogId',
      name: 'Blog Details',
      component: () => import('../views/BlogDetailView.vue'),
      meta: {
        requireAuth : true
      }
    },
  ],
})

export default router
