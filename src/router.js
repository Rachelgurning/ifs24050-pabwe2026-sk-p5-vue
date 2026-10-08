import { createRouter, createWebHistory } from 'vue-router';
import AuthLayout from './features/auth/layouts/AuthLayout.vue';import LoginPage from './features/auth/pages/LoginPage.vue';import RegisterPage from './features/auth/pages/RegisterPage.vue';
import AucationLayout from './features/aucations/layouts/AucationLayout.vue';import HomePage from './features/aucations/pages/HomePage.vue';import DetailPage from './features/aucations/pages/DetailPage.vue';
import UsersPage from './features/users/pages/UsersPage.vue';import ProfilePage from './features/users/pages/ProfilePage.vue';import NotFoundPage from './features/common/pages/NotFoundPage.vue';import {getAccessToken} from './helpers/apiHelper';
const routes=[
 {path:'/auth',component:AuthLayout,children:[{path:'login',name:'login',component:LoginPage,meta:{guest:true}},{path:'register',name:'register',component:RegisterPage,meta:{guest:true}}]},
 {path:'/',component:AucationLayout,meta:{auth:true},children:[{path:'',name:'home',component:HomePage},{path:'aucations/:aucationId',name:'aucation-detail',component:DetailPage},{path:'users',name:'users',component:UsersPage},{path:'profile',name:'profile',component:ProfilePage}]},
 {path:'/:pathMatch(.*)*',name:'not-found',component:NotFoundPage}
];
const router=createRouter({history:createWebHistory(import.meta.env.BASE_URL),routes});router.beforeEach(to=>{const token=getAccessToken();if(to.meta.auth&&!token)return {name:'login',query:{redirect:to.fullPath}};if(to.meta.guest&&token)return {name:'home'};return true});export default router;
