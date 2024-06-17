import { createRouter, createWebHistory } from 'vue-router';

import DefaultLayout from '@/layouts/default/DefaultLayout.vue';
import LoginView from '@/views/LoginView.vue';
import registerView from '@/views/RegisterView.vue';

import AttendanceClientsView from '@/views/AttendanceClientsView.vue';
import UserProfileView from '@/views/UserProfileView.vue';
import UserChangePasswordView from '@/views/UserChangePasswordView.vue';
import UserView from '@/views/UserView.vue';
import PatientListView from '@/views/PatientListView.vue';
import CharguesListView from '@/views/CharguesListView.vue';
import AboutMeView from '@/views/AboutMeView.vue';

const routes = [
  {
    path: '/',
    component: DefaultLayout,
    children: [
      {
        path: '/',
        name: 'Home',
        component: AttendanceClientsView,
        meta: { requiresAuth: true }
      },
      {
        path: '/attendance',
        name: 'attendance',
        component: AttendanceClientsView,
        meta: { requiresAuth: true }
      },
      {
        path: '/profile',
        name: 'profile',
        component: UserProfileView,
        meta: { requiresAuth: true }
      },
      {
        path: '/security',
        name: 'security',
        component: UserChangePasswordView,
        meta: { requiresAuth: true }
      },
      {
        path: '/users',
        name: 'users',
        component: UserView,
        meta: { requiresAuth: true }
      },
      {
        path: '/patients',
        name: 'patients',
        component: PatientListView,
        meta: { requiresAuth: true }
      },
      {
        path: '/charges',
        name: 'charges',
        component: CharguesListView,
        meta: { requiresAuth: true }
      },
      {
        path: '/about',
        name: 'about',
        component: AboutMeView,
        meta: { requiresAuth: true }
      },
    ],
  },
  {
    path: '/login',
    name: 'login',
    component: LoginView,
  },
  {
    path: '/register',
    name: 'register',
    component: registerView,
  },
  {
    path: '/:catchAll(.*)',
    redirect: '/login',
  },
];

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes,
});

router.beforeEach((to, from, next) => {
  if (to.matched.some(record => record.meta.requiresAuth)) {
    const isAuthenticated = true;

    if (isAuthenticated) {
      next();
    } else {
      next('/login');
    }
  } else {
    next();
  }
});

export default router;
