<!-- UserMenu.vue -->
<script setup>
const props = defineProps({
  userName: String,
  modelValue: Boolean,
});

const emit = defineEmits(["update:modelValue"]);

const toggleMenu = () => {
  emit("update:modelValue", !props.modelValue);
};
</script>

<template>
  <!-- Overlay -->
  <div
    id="menu-overlay"
    v-if="modelValue"
    class="active"
    @click="toggleMenu"
  ></div>

  <!-- Menú deslizante -->
  <div
    id="user-menu"
    :class="{ active: modelValue }"
    class="d-flex flex-column"
  >
    <!-- Botón de cierre -->
    <i class="bi bi-x close-menu align-self-end" @click="toggleMenu"></i>

    <!-- Nombre del usuario -->
    <p id="userName" class="fw-bold text-dark mb-3">{{ userName }}</p>

    <!-- Lista de opciones -->
    <ul class="list-unstyled ps-0">
      <li class="mb-2 d-flex align-items-center">
        <i class="bi bi-person me-2"></i>
        <router-link
          to="/perfil"
          class="text-dark text-decoration-none flex-grow-1"
          >Tu perfil</router-link
        >
      </li>

      <li class="mb-2 d-flex align-items-center">
        <i class="bi bi-bookmark me-2"></i>
        <a href="#guardado" class="text-dark text-decoration-none flex-grow-1"
          >Guardado</a
        >
      </li>

      <li class="mb-2 d-flex align-items-center">
        <i class="bi bi-bell me-2"></i>
        <a
          href="#notificaciones"
          class="text-dark text-decoration-none flex-grow-1"
          >Notificaciones</a
        >
      </li>

      <li class="mb-2 d-flex align-items-center">
        <i class="bi bi-map me-2"></i>
        <a href="#rutas" class="text-dark text-decoration-none flex-grow-1"
          >Tus Rutas</a
        >
      </li>

      <li class="mb-2 d-flex align-items-center">
        <i class="bi bi-share me-2"></i>
        <a href="#compartir" class="text-dark text-decoration-none flex-grow-1"
          >Compartir</a
        >
      </li>

      <li class="mb-2 d-flex align-items-center">
        <i class="bi bi-gear me-2"></i>
        <a
          href="#configuracion"
          class="text-dark text-decoration-none flex-grow-1"
          >Configuración</a
        >
      </li>

      <li class="d-flex align-items-center">
        <i class="bi bi-box-arrow-right me-2"></i>
        <a
          href="#"
          class="text-dark text-decoration-none flex-grow-1"
          id="logout-btn"
          >Cerrar Sesión</a
        >
      </li>
    </ul>
  </div>
</template>
