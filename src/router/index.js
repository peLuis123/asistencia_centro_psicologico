// Composables
import { createRouter, createWebHistory } from 'vue-router'

const routes = [
  {
    path: '/',
    component: () => import('@/layouts/default/DefaultLayout.vue'),
    children: [
      {
        path: '',
        name: 'Home',
        component: () => import('@/views/AttendanceClientsView.vue'),
      },
      {
        path: '/attendance',
        name: 'attendance',
        component: () => import('@/views/AttendanceClientsView.vue'),
      },
      {
        path: '/profile',
        name: 'profile',
        component: () => import('@/views/UserProfileView.vue'),
      },
      {
        path: '/security',
        name: 'security',
        component: () => import('@/views/UserChangePasswordView.vue'),
      },
      {
        path: '/users',
        name: 'users',
        component: () => import('@/views/UserView.vue'),
      },
      {
        path: '/patients',
        name: 'patients',
        component: () => import('@/views/PatientListView.vue'),
      },
      {
        path: '/charges',
        name: 'charges',
        component: () => import('@/views/CharguesListView.vue'),
      },
      {
        path: '/about',
        name: 'about',
        component: () => import('@/views/AboutMeView.vue'),
      },
    ],
  },
]


const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes,
})

export default router
