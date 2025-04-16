<!-- src/views/NosotrosView.vue -->
<template>
  <AppNavbar />

  <AppSidebar />

  <div class="container center-content">
    <div class="row">
      <div class="col">
        <h1>Rastrea y conoce las rutas de autobuses en Tepatitlán</h1>
        <p>Únete a la comunidad de 5,000+ usuarios</p>
        <h3>¿Quiénes somos?</h3>
        <p style="text-align: justify;">
          Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
          eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad
          minim veniam, quis nostrud exercitation ullamco laboris nisi ut
          aliquip ex ea commodo consequat.
        </p>
      </div>
      <div class="col">
        <img
          src="@/assets/imagenes/mapa.png"
          alt="Mapa"
          width="500"
          height="500"
        />
      </div>
    </div>
  </div>
</template>

<script setup>
import AppNavbar from "@/components/AppNavbar.vue";
import AppSidebar from "@/components/AppSidebar.vue";
</script>

<style scoped>
@import "@/assets/css/pages/home_page.css";
</style>
