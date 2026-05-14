// src/router/index.ts
import { createRouter, createWebHistory, type RouteRecordRaw } from 'vue-router';
import authService from '@/service/auth.service';

const routes: RouteRecordRaw[] = [
  {
    path: '/login',
    name: 'Login',
    component: () => import('@/pages/auth/login/index.vue'),
    meta: { requiresGuest: true }
  },
  {
    path: '/signup',
    name: 'Signup',
    component: () => import('@/pages/auth/signup/index.vue'),
    meta: { requiresGuest: true }
  },
  {
    path: '/',
    name: 'Home',
    component: () => import('@/pages/index.vue'),
    meta: { requiresAuth: true }
  },
  // {
  //   path: '/dashboard',
  //   name: 'Dashboard',
  //   component: () => import('@/views/Dashboard.vue'),
  //   meta: { requiresAuth: true }
  // },
  // {
  //   path: '/admin',
  //   name: 'Admin',
  //   component: () => import('@/views/Admin.vue'),
  //   meta: { requiresAuth: true, roles: ['ADMIN'] }
  // }
];

const router = createRouter({
  history: createWebHistory(),
  routes
});


// Navigation guard
router.beforeEach(async (to, from, next) => {
    // Check if user is authenticated
    const isAuthenticated = authService.isAuthenticated();
    
    if (to.meta.requiresAuth && !isAuthenticated) {
        // Try to restore session
        const isValid = await authService.checkAuth();
        if (!isValid) {
            next('/login');
            return;
        }
    }
    
    if (to.meta.requiresGuest && authService.isAuthenticated()) {
        next('/');
        return;
    }
    
    // Check roles
    if (to.meta.roles && Array.isArray(to.meta.roles)) {
        const hasRole = to.meta.roles.some(role => authService.hasRole(role));
        if (!hasRole) {
            next('/unauthorized');
            return;
        }
    }
    
    next();
});

export default router;