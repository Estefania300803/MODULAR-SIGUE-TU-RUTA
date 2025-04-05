<template>
  <div class="row g-0 w-100 h-100">
    <!-- Sección completa -->
    <div class="row w-100 h-100">
      <!-- Imagen de fondo -->
      <div class="col-md-6 bg-image"></div>

      <!-- Formulario -->
      <div class="col-md-6 d-flex align-items-center justify-content-center">
        <div class="form-container text-center">
          <!-- Logo -->
          <div class="logo mb-4">
            <img
              src="@/assets/imagenes/logo.png"
              alt="Logo"
              class="img-fluid"
              style="max-width: 150px"
            />
          </div>

          <!-- Título -->
          <h2 class="text-success mb-4">Registro</h2>

          <!-- Campos del formulario -->
          <form @submit.prevent="handleSubmit" id="formulario-crear">
            <div class="mb-3 input-container">
              <input
                type="text"
                v-model="nombre"
                class="form-control"
                placeholder="Nombre"
                required
                maxlength="30"
              />
              <i class="bi bi-person"></i>
            </div>
            <div class="mb-3 input-container">
              <input
                type="text"
                v-model="apellidos"
                class="form-control"
                placeholder="Apellidos"
                required
                maxlength="60"
              />
              <i class="bi bi-person"></i>
            </div>
            <div class="mb-3 input-container">
              <input
                type="email"
                v-model="email"
                id="email"
                class="form-control"
                placeholder="Correo electrónico"
                required
              />
              <i class="bi bi-envelope"></i>
            </div>
            <div class="mb-3 input-container">
              <input
                type="password"
                v-model="password"
                id="password"
                class="form-control"
                placeholder="Contraseña"
                required
              />
            </div>
            <p v-if="passwordWarning" class="small text-start" style="color: red">
              Elija una contraseña de 8 o más caracteres
            </p>
            <div class="mb-3 input-container">
              <input
                type="password"
                v-model="password2"
                id="password2"
                class="form-control"
                placeholder="Confirma la Contraseña"
                required
              />
            </div>
            <p v-if="errorMsg" style="color: red">Las contraseñas no coinciden.</p>

            <!-- Checkbox -->
            <div class="form-check mb-3 text-start">
              <input
                v-model="checkbox"
                class="form-check-input"
                type="checkbox"
                id="Checkboxprincipal"
                required
              />
              <label class="form-check-label" for="acceptTerms">
                <a href="#" class="register-link" @click.prevent="openModal('politica')"
                  >Política de privacidad</a
                >
                y los
                <a href="#" class="register-link" @click.prevent="openModal('terminos')"
                  >términos de servicio</a
                >
                de Sigue tu Ruta
              </label>
            </div>

            <!-- Botón -->
            <input
              type="submit"
              value="Registrarse"
              class="btn btn-success w-100"
              :disabled="!checkbox"
            />
          </form>
        </div>
      </div>
    </div>
  </div>

  <!-- Modales -->
  <ModalPolitica v-model:visible="modalPoliticaVisible" />
  <ModalTerminos v-model:visible="modalTerminosVisible" />
</template>

<script setup>
import { ref } from 'vue'
import ModalPolitica from '@/components/modales/ModalPolitica.vue'
import ModalTerminos from '@/components/modales/ModalTerminos.vue'

const nombre = ref('')
const apellidos = ref('')
const email = ref('')
const password = ref('')
const password2 = ref('')
const checkbox = ref(false)
const passwordWarning = ref(false)
const errorMsg = ref(false)
const modalPoliticaVisible = ref(false)
const modalTerminosVisible = ref(false)

function openModal(type) {
  if (type === 'politica') {
    modalPoliticaVisible.value = true
  } else if (type === 'terminos') {
    modalTerminosVisible.value = true
  }
}

async function handleSubmit() {
  if (password.value.length < 8) {
    passwordWarning.value = true
    return
  } else {
    passwordWarning.value = false
  }

  if (password.value !== password2.value) {
    errorMsg.value = true
    return
  } else {
    errorMsg.value = false
  }

  if (!checkbox.value) {
    alert('Debes aceptar las políticas y términos para continuar.')
    return
  }

  // Aquí iría la lógica para manejar el registro, como ya se discutió antes.
}
</script>
