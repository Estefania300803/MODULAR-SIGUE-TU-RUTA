<template>
  <div>
    <AppNavbar />
    <AppSidebar />
    <UserMenu />

    <div
      class="scroll-container d-flex justify-content-center align-items-center main-wrapper"
    >
      <div class="formulario-contenedor text-center">
        <!-- Sección superior: imagen + nombre -->
        <div class="mb-4">
          <img
            src="@/assets/imagenes/perfil.jpeg"
            alt="Foto de perfil"
            class="imagen-circular mb-3 mx-auto d-block"
          />
          <h2 class="fw-bold" style="color: #000;">Emmanuel Hernandez</h2>
        </div>

        <!-- Sección inferior: formulario -->
        <form class="d-flex flex-column align-items-center">
          <div class="mb-3 w-100" style="max-width: 400px;">
            <label class="fw-semibold text-start w-100">Cambiar Correo</label>
            <input
              type="email"
              class="form-control"
              placeholder="Nuevo correo"
            />
          </div>

          <div class="mb-3 w-100" style="max-width: 400px;">
            <label class="fw-semibold text-start w-100"
              >Cambiar Contraseña</label
            >
            <input
              type="password"
              class="form-control mb-2"
              placeholder="Contraseña actual"
            />
            <input
              type="password"
              class="form-control mb-2"
              placeholder="Nueva contraseña"
            />
            <input
              type="password"
              class="form-control"
              placeholder="Confirmar nueva contraseña"
            />
          </div>

          <!-- Botonera -->
          <div class="d-flex justify-content-center gap-2 mt-2 flex-wrap">
            <button type="submit" class="btn boton-guardar">
              Guardar
            </button>
            <button
              type="button"
              class="btn boton-cancelar"
              style="border-color: #bfbfbf;"
            >
              Cancelar
            </button>
          </div>
        </form>
      </div>
    </div>
  </div>
</template>

<script setup>
import AppNavbar from "@/components/AppNavbar.vue";
import AppSidebar from "@/components/AppSidebar.vue";
import UserMenu from "@/components/UserMenu.vue";
</script>

<style scoped>
@import "@/assets/css/pages/home_perfil.css";
</style>
