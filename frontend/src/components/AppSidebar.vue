<template>
  <!-- Sidebar siempre visible, se controla con clases -->
  <div
    class="sidebar"
    :class="{ expanded: isExpanded }"
    id="sidebar"
    @mouseenter="handleMouseEnter"
    @mouseleave="handleMouseLeave"
  >
    <ul class="m-0 p-0 list-unstyled">
      <li class="menu-item" @click="toggleSidebar">
        <i class="bi bi-list"></i>
        <span>Menú</span>
      </li>
      <li class="menu-item">
        <router-link
          to="/homepage-sessionstarted"
          class="d-flex align-items-center text-decoration-none text-dark"
        >
          <i class="bi bi-grid"></i> <span>Principal</span>
        </router-link>
      </li>
      <li class="menu-item">
        <router-link
          to="/mapa"
          class="d-flex align-items-center text-decoration-none text-dark"
        >
          <i class="bi bi-map"></i> <span>Mapas</span>
        </router-link>
      </li>
      <li class="menu-item">
        <i class="bi bi-bus-front"></i> <span>Camiones</span>
      </li>
      <li class="menu-item">
        <router-link
          to="/nosotros-sessionstarted"
          class="d-flex align-items-center text-decoration-none text-dark"
        >
          <i class="bi bi-book"></i> <span>Nosotros</span>
        </router-link>
      </li>
    </ul>
  </div>
</template>
<script setup>
import { ref } from "vue";

// Detecta si estamos en pantalla chica
const isMobile = ref(window.innerWidth < 768);
const isExpanded = ref(isMobile.value);

// Escucha el resize para actualizar `isMobile`
window.addEventListener("resize", () => {
  isMobile.value = window.innerWidth < 768;
  if (!isMobile.value) isExpanded.value = false; // Reset en desktop
});

function toggleSidebar() {
  isExpanded.value = !isExpanded.value;
}

function handleMouseEnter() {
  if (!isMobile.value) isExpanded.value = true;
}

function handleMouseLeave() {
  if (!isMobile.value) isExpanded.value = false;
}
</script>
