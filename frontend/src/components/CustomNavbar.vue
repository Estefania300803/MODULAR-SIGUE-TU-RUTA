<script setup>
import { useRouter } from 'vue-router'
import { onMounted } from 'vue'
import initSidebarHover from '@/assets/js/sidebar_animacion.js'

const router = useRouter()
const goToLogin = () => {
  router.push('/login')
}

onMounted(() => {
  import('@/assets/js/sidebar_animacion.js')
  initSidebarHover()
})
</script>

<template>
  <nav class="navbar custom-navbar position-fixed">
    <div class="container-fluid d-flex align-items-center">
      <a class="navbar-brand" href="#">
        <img src="@/assets/iconos/Logo_s-l.svg" alt="Bootstrap" width="50" height="44" />
        Sigue Tu Ruta
      </a>
      <form class="d-flex">
        <button
          type="button"
          @click="goToLogin"
          class="btn custom-button"
          style="width: 150px; flex-shrink: 0; border-radius: 2px"
        >
          Iniciar Sesión
        </button>
      </form>
    </div>
  </nav>
</template>
