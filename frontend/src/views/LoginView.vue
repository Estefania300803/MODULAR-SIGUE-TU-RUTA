<template>
  <div class="background">
    <div class="login-container">
      <div class="text-center">
        <img src="@/assets/imagenes/logo.png" alt="Logo Sigue Tu Ruta" class="logo" />
        <h2 class="title">Iniciar sesión</h2>
      </div>
      <form id="formulario-sesion" @submit.prevent="loginUser">
        <div class="mb-3">
          <label for="email" class="form-label">Correo electrónico</label>
          <input type="email" id="email" v-model="email" class="form-control" required />
        </div>
        <div class="mb-3">
          <label for="password" class="form-label">Contraseña</label>
          <input type="password" id="password" v-model="password" class="form-control" required />
        </div>
        <div class="d-flex justify-content-between align-items-center mb-3">
          <a href="#" class="forgot-password">
            <RouterLink to="/restablecer-contrasena" class="register-link"
              >¿Olvidaste tu contraseña?</RouterLink
            ></a
          >
        </div>
        <button
          type="submit"
          class="btn btn-success w-100 mb-3 d-flex align-items-center justify-content-center"
          style="font-size: 21px"
        >
          Iniciar sesión
        </button>
        <hr />
        <button
          class="btn btn-outline-secondary w-100 mb-3 d-flex align-items-center justify-content-center"
        >
          <i class="bi bi-google me-2"></i>
        </button>
        <p class="text-center">
          ¿No tienes una cuenta?
          <RouterLink to="/registro" class="register-link">Regístrate</RouterLink>
        </p>
      </form>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue'

const email = ref('')
const password = ref('')
const keepSession = ref(false)

const loginUser = () => {
  console.log('Iniciando sesión con:', email.value, password.value, keepSession.value)
  // Aquí puedes llamar tu lógica de Firebase u otra API de autenticación
}
</script>
