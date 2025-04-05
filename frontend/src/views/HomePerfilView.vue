<!-- src/views/HomePerfil.vue -->
<template>
  <div>
    <AppNavbar />

    <div class="scroll-container">
      <div class="content">
        <div class="profile">
          <img src="@/assets/imagenes/perfil.jpeg" alt="Foto de perfil" class="imagen-circular" />
          <h2>{{ userName }}</h2>
          <div class="divbotones">
            <button class="botoncorreo" @click="mostrarFormulario('correo')">
              Correo <span class="icono">&#10095;</span>
            </button>
            <button class="botonseguridad" @click="mostrarFormulario('seguridad')">
              Seguridad <span class="icono">&#10095;</span>
            </button>
          </div>
        </div>
        <div id="formulario-container">
          <component :is="formularioActivo" @cerrar="cerrarFormulario" />
        </div>
      </div>
    </div>

    <AppSidebar />
    <UserMenu />
  </div>
</template>

<script setup>
import { ref } from 'vue'
import AppNavbar from '@/components/AppNavbar.vue'
import AppSidebar from '@/components/AppSidebar.vue'
import UserMenu from '@/components/UserMenu.vue'
import FormCorreo from '@/components/perfil/FormCorreo.vue'
import FormSeguridad from '@/components/perfil/FormSeguridad.vue'

const userName = 'Emmanuel Hernandez'
const formularioActivo = ref(null)

function mostrarFormulario(tipo) {
  formularioActivo.value = tipo === 'correo' ? FormCorreo : FormSeguridad
}

function cerrarFormulario() {
  formularioActivo.value = null
}
</script>
<style scoped>
@import '@/assets/css/pages/home_perfil.css';
</style>
