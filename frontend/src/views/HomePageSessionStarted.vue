<template>
  <AppNavbar />
  <AppSidebar />
  <div class="container center-content">
    <div class="row">
      <div class="col">
        <h1>Rastrea y conoce las rutas de autobuses en Tepatitlán</h1>
        <p>Únete a la comunidad de 5,000+ usuarios</p>
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
