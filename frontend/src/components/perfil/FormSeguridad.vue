<template>
  <div class="layotseguridad">
    <label for="Tituloseguridad">Contraseña actual:</label>
    <input type="password" id="actual" v-model="actual" />

    <label for="Tituloseguridad">Nueva contraseña:</label>
    <input type="password" id="nueva" v-model="nueva" />

    <label for="Tituloseguridad" style="left: -17%">Confirmar contraseña:</label>
    <input type="password" id="confirmar" v-model="confirmar" />

    <div class="botones-container">
      <button class="boton-cancelar" @click="$emit('cerrar')">Cancelar</button>
      <button class="boton-guardar" @click="guardarPassword">Guardar</button>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue'

const actual = ref('')
const nueva = ref('')
const confirmar = ref('')

function guardarPassword() {
  if (nueva.value === confirmar.value) {
    alert('Contraseña guardada correctamente')
  } else {
    alert('Las contraseñas no coinciden')
  }
}
</script>
<style scoped>
@import '@/assets/css/pages/home_perfil.css';
</style>
