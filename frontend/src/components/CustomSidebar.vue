<template>
  <!-- Sidebar -->
  <div class="sidebar" id="sidebar">
    <ul>
      <li class="menu-item"><i class="bi bi-list"></i> <span>Menú</span></li>
      <li class="menu-item">
        <router-link to="/" class="d-flex align-items-center text-decoration-none text-dark">
          <i class="bi bi-grid"></i> <span>Principal</span>
        </router-link>
      </li>
      <li class="menu-item">
        <router-link
          to="/nosotros"
          class="d-flex align-items-center text-decoration-none text-dark"
        >
          <i class="bi bi-book"></i> <span class="ms-1">Nosotros</span>
        </router-link>
      </li>
    </ul>
  </div>
</template>

<script setup>
import { onMounted } from 'vue'
import initSidebarHover from '@/assets/js/sidebar_animacion.js'

onMounted(() => {
  initSidebarHover()
})
</script>
