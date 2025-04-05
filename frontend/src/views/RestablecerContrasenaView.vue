<template>
  <div class="auth-background">
    <!-- Círculos decorativos -->
    <div class="circle circle1"></div>
    <div class="circle circle2"></div>
    <div class="circle circle3"></div>
    <div class="circle circle4"></div>

    <!-- Contenido centrado -->
    <div class="form-wrapper d-flex align-items-center justify-content-center">
      <div class="form-container-password text-center">
        <h1 class="mb-4">Restablecer Contraseña</h1>
        <br />

        <form @submit.prevent="handleSubmit">
          <div class="mb-3 input-group">
            <input
              type="email"
              class="form-control"
              v-model="email"
              placeholder="Correo electrónico"
              required
            />
            <span class="input-group-text"><i class="bi bi-envelope"></i></span>
          </div>

          <div class="titulo-con-lineas">
            <hr />
            <h5>Verifica tu cuenta</h5>
            <hr />
          </div>

          <button type="submit" class="btn-password btn-success w-100 mt-3">
            Restablecer su contraseña
          </button>
        </form>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue'

const email = ref('')

function handleSubmit() {
  alert(`Se enviará un correo a: ${email.value}`)
  // Aquí podrías integrar Firebase, Supabase, etc.
}
</script>
<style scoped>
@import '@/assets/css/pages/restablecer_contraseña.css';
</style>
