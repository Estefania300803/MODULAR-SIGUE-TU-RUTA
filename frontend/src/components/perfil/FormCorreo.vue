<template>
  <div class="layotcorreo">
    <label for="Titulocorreo">Correo:</label>
    <input type="email" id="email" v-model="correo" />
    <div class="btn-mail">
      <button class="boton-cancelar" @click="$emit('cerrar')">Cancelar</button>
      <button class="boton-guardar" @click="guardarCorreo">Guardar</button>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue'
const correo = ref('Emanuel@gmail.com')

function guardarCorreo() {
  alert('Correo guardado: ' + correo.value)
}
</script>
<style scoped>
@import '@/assets/css/pages/home_perfil.css';
</style>
