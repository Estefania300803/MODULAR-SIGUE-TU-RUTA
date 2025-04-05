<template>
  <CustomNavbar />
  <CustomSidebar />

  <div class="container center-content">
    <div class="row">
      <div class="col">
        <h1>¡Bienvenido a Sigue Tu Ruta!</h1>
        <h3>Rastrea y conoce las rutas de autobuses en Tepatitlán</h3>
        <p>La mejor aplicación para rastrear tus rutas y compartir tu ubicación en tiempo real.</p>
      </div>
      <div class="col">
        <img src="@/assets/imagenes/mapa.png" alt="Mapa" width="500" height="500" />
      </div>
    </div>
  </div>
</template>

<script setup>
import CustomNavbar from '@/components/CustomNavbar.vue'
import CustomSidebar from '@/components/CustomSidebar.vue'
</script>
