<template>
  <nav class="navbar custom-navbar position-fixed w-100">
    <div
      class="container-fluid d-flex justify-content-between align-items-center"
    >
      <!-- Logo + Nombre -->
      <a class="navbar-brand d-flex align-items-center" href="#">
        <img
          src="@/assets/iconos/Logo_s-l.svg"
          alt="Bootstrap"
          width="50"
          height="44"
        />
        <span class="ms-2 d-none d-sm-inline">Sigue Tu Ruta</span>
      </a>

      <!-- Controles: input + botón + avatar -->
      <div class="d-flex align-items-center gap-2">
        <!-- Input de búsqueda -->
        <input
          class="form-control"
          id="searchInput"
          type="search"
          placeholder="Buscar"
          aria-label="Search"
          style="
            width: 400px;
            height: 43px;
            background: #ccd4c9;
            border-radius: 2px;
          "
        />

        <!-- Botón cómo llegar -->
        <button
          type="button"
          class="btn custom-button text-start"
          id="btnllegar"
          style="
            width: 150px;
            height: 43px;
            border-radius: 2px;
            background: #ccd4c9;
          "
        >
          <i class="bi bi-arrow-left-right me-2"></i>Cómo llegar
        </button>

        <!-- Avatar botón -->
        <button
          class="btn p-0 d-flex justify-content-center align-items-center"
          type="button"
          id="btn-user"
          @click="toggleMenu"
          style="
            width: 45px;
            height: 45px;
            background: #ccd4c9;
            border-radius: 50%;
          "
        >
          <img
            id="userProfilePicture"
            src="@/assets/imagenes/perfil.jpg"
            alt="Usuario"
            style="
              width: 45px;
              height: 45px;
              object-fit: cover;
              border-radius: 50%;
            "
          />
        </button>

        <!-- Menú -->
        <UserMenu v-model="menuVisible" :userName="name" />
      </div>
    </div>
  </nav>
</template>

<script setup>
import { ref, onMounted } from "vue";
import initSidebarHover from "@/assets/js/sidebar_animacion.js";
import UserMenu from "@/components/UserMenu.vue";

onMounted(() => {
  initSidebarHover();
});

const menuVisible = ref(false);
const toggleMenu = () => {
  menuVisible.value = !menuVisible.value;
};

const name = "Emmanuel";
</script>
