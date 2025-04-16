<script setup>
import { useRouter } from "vue-router";
import { onMounted } from "vue";
import initSidebarHover from "@/assets/js/sidebar_animacion.js";

const router = useRouter();
const goToLogin = () => {
  router.push("/login");
};

onMounted(() => {
  import("@/assets/js/sidebar_animacion.js");
  initSidebarHover();
});
</script>

<template>
  <nav class="navbar custom-navbar position-fixed w-100">
    <div
      class="container-fluid d-flex justify-content-between align-items-center"
    >
      <a class="navbar-brand d-flex align-items-center" href="#">
        <img
          src="@/assets/iconos/Logo_s-l.svg"
          alt="Bootstrap"
          width="50"
          height="44"
        />
        <!-- Este span se ocultará en pantallas pequeñas -->
        <span class="ms-2 d-sm-inline">Sigue Tu Ruta</span>
      </a>
      <form class="d-flex">
        <button
          type="button"
          @click="goToLogin"
          class="btn custom-button"
          style="width: 150px; border-radius: 2px;"
        >
          Iniciar Sesión
        </button>
      </form>
    </div>
  </nav>
</template>
