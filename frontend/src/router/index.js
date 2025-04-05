import { createRouter, createWebHistory } from 'vue-router'
import HomePageView from '../views/HomePageView.vue'
import NosotrosView from '@/views/NosotrosView.vue'
import HomePageSessionStarted from '@/views/HomePageSessionStarted.vue'
import LoginView from '@/views/LoginView.vue'
import NosotrosSessionStarted from '@/views/NosotrosSessionStarted.vue'
import MapaPageView from '@/views/MapaPageView.vue'
import RestablecerContrasenaView from '@/views/RestablecerContrasenaView.vue'
import HomePerfilView from '@/views/HomePerfilView.vue'
import RegistroView from '@/views/RegistroView.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: HomePageView,
    },
    {
      path: '/login',
      name: 'login',
      component: LoginView,
    },
    {
      path: '/nosotros',
      name: 'nosotros',
      component: NosotrosView,
    },
    {
      path: '/homepage-sessionstarted',
      name: 'homepagesessionstarted',
      component: HomePageSessionStarted,
    },
    {
      path: '/nosotros-sessionstarted',
      name: 'nosotrossessionstarted',
      component: NosotrosSessionStarted,
    },
    {
      path: '/mapa',
      name: 'mapa',
      component: MapaPageView,
    },
    {
      path: '/restablecer-contrasena',
      name: 'restablecer-contrasena',
      component: RestablecerContrasenaView,
    },
    {
      path: '/perfil',
      name: 'perfil',
      component: HomePerfilView,
    },
    {
      path: '/registro',
      name: 'registro',
      component: RegistroView,
    },
  ],
})

export default router
