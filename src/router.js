import { createRouter, createWebHistory } from 'vue-router';
import { getAccessToken } from './helpers/apiHelper';

const AuthLayout = () => import('./features/auth/layouts/AuthLayout.vue');
const LoginPage = () => import('./features/auth/pages/LoginPage.vue');
const RegisterPage = () => import('./features/auth/pages/RegisterPage.vue');
const AucationLayout = () => import('./features/aucations/layouts/AucationLayout.vue');
const HomePage = () => import('./features/aucations/pages/HomePage.vue');
const DetailPage = () => import('./features/aucations/pages/DetailPage.vue');
const UsersPage = () => import('./features/users/pages/UsersPage.vue');
const ProfilePage = () => import('./features/users/pages/ProfilePage.vue');
const NotFoundPage = () => import('./features/common/pages/NotFoundPage.vue');

const routes = [
  {
    path: '/auth',
    component: AuthLayout,
    children: [
      { path: 'login', name: 'login', component: LoginPage, meta: { guest: true } },
      { path: 'register', name: 'register', component: RegisterPage, meta: { guest: true } },
    ],
  },
  {
    path: '/',
    component: AucationLayout,
    meta: { auth: true },
    children: [
      { path: '', name: 'home', component: HomePage },
      { path: 'aucations/:aucationId', name: 'aucation-detail', component: DetailPage },
      { path: 'users', name: 'users', component: UsersPage },
      { path: 'profile', name: 'profile', component: ProfilePage },
    ],
  },
  { path: '/:pathMatch(.*)*', name: 'not-found', component: NotFoundPage },
];

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes,
  scrollBehavior() {
    return { top: 0 };
  },
});

router.beforeEach((to, from, next) => {
  const token = getAccessToken();
  if (to.meta.auth && !token) {
    next({ name: 'login', query: { redirect: to.fullPath } });
    return;
  }
  if (to.meta.guest && token) {
    next({ name: 'home' });
    return;
  }
  next();
});

export default router;
