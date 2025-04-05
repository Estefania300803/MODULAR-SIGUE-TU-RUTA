<script setup>
import { ref } from 'vue'
import { onMounted } from 'vue'
import initSidebarHover from '@/assets/js/sidebar_animacion.js'
import UserMenu from '@/components/UserMenu.vue'

onMounted(() => {
  import('@/assets/js/sidebar_animacion.js')
  initSidebarHover()
})

const menuVisible = ref(false)
const toggleMenu = () => {
  menuVisible.value = !menuVisible.value
}

const name = 'Emmanuel'
</script>

<template>
  <nav class="navbar custom-navbar position-fixed">
    <div class="container-fluid d-flex align-items-center">
      <a class="navbar-brand" href="#">
        <img src="@/assets/iconos/Logo_s-l.svg" alt="Bootstrap" width="50" height="44" />Sigue Tu
        Ruta
      </a>
      <form class="d-flex align-items-center" role="search">
        <input
          class="form-control me-2"
          type="search"
          placeholder="Buscar"
          aria-label="Search"
          style="
            width: 400px;
            height: 43.3px;
            flex-shrink: 0;
            border-radius: 2px;
            background: #ccd4c9;
          "
        />
        <button
          type="button"
          class="btn custom-button me-2 text-start"
          id="btnllegar"
          style="
            width: 150px;
            height: 43.3px;
            flex-shrink: 0;
            border-radius: 2px;
            background: #ccd4c9;
          "
        >
          <i class="bi bi-arrow-left-right me-2"></i>Como llegar
        </button>
        <!-- Este botón es el que activa el menú -->
        <button
          class="btn rounded-circle d-flex justify-content-center align-items-center"
          type="button"
          id="btn-user"
          @click="toggleMenu"
          style="
            width: 45px;
            height: 45px;
            background: #ccd4c9;
            overflow: hidden;
            border-radius: 50%;
          "
        >
          <img
            id="userProfilePicture"
            src="@/assets/imagenes/perfil.jpg"
            style="
              width: 45px;
              height: 45px;
              object-fit: cover;
              border-radius: 50%;
              position: absolute;
            "
          />
        </button>

        <!-- Aquí se muestra el componente del menú -->
        <UserMenu v-model="menuVisible" :userName="name" />
      </form>
    </div>
  </nav>
</template>
