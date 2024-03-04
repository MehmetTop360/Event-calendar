import { createRouter, createWebHistory } from 'vue-router'
import { authenticate } from './guards'
import MainLayout from '@/layouts/MainLayout.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      redirect: '/login',
      component: MainLayout,
      children: [
        {
          path: 'login',
          name: 'Login',
          component: () => import('../views/LoginView.vue'),
        },
        {
          path: 'signup',
          name: 'Signup',
          component: () => import('../views/SignupView.vue'),
        },
        {
          path: 'calendar/:permalink',
          name: 'Calendar',
          component: () => import('../views/CalendarView.vue'),
          props: true,
        },
        {
          path: 'calendar/:permalink/event/create',
          name: 'EventCreate',
          component: () => import('../views/EventCreateView.vue'),
          props: true,
        },
        {
          path: 'dashboard',
          name: 'Dashboard',
          beforeEnter: [authenticate],
          component: () => import('../views/DashboardView.vue'),
        },
        {
          path: 'calendar/create',
          name: 'CalendarCreate',
          beforeEnter: [authenticate],
          component: () => import('../views/CalendarCreateView.vue'),
        },
      ],
    },
  ],
})

export default router
