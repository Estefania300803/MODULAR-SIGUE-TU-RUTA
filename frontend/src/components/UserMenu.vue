<!-- UserMenu.vue -->
<script setup>
const props = defineProps({
  userName: String,
  modelValue: Boolean,
})

const emit = defineEmits(['update:modelValue'])

const toggleMenu = () => {
  emit('update:modelValue', !props.modelValue)
}
</script>

<template>
  <div id="menu-overlay" v-if="modelValue" class="active" @click="toggleMenu"></div>

  <div id="user-menu" :class="{ active: modelValue }">
    <i class="bi bi-x close-menu" @click="toggleMenu"></i>
    <p id="userName">{{ userName }}</p>
    <ul>
      <li>
        <i class="bi bi-person"> </i>
        <router-link to="/perfil" class="d-flex align-items-center text-decoration-none text-dark">
          <a href="#perfil">Tu perfil</a>
        </router-link>
      </li>

      <li><i class="bi bi-bookmark"></i> <a href="#guardado">Guardado</a></li>
      <li><i class="bi bi-bell"></i> <a href="#notificaciones">Notificaciones</a></li>
      <li><i class="bi bi-map"></i> <a href="#rutas">Tus Rutas</a></li>
      <li><i class="bi bi-share"></i> <a href="#compartir">Compartir</a></li>
      <li><i class="bi bi-gear"></i> <a href="#configuracion">Configuración</a></li>
      <li><i class="bi bi-box-arrow-right"></i> <a href="#" id="logout-btn">Cerrar Sesión</a></li>
    </ul>
  </div>
</template>
