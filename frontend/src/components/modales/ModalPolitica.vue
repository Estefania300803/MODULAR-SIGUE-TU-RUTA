<template>
  <div v-if="visible" class="modal-backdrop-custom">
    <div class="modal-content-custom">
      <div class="modal-header">
        <h5 class="modal-title">Política de Privacidad</h5>
        <button
          type="button"
          class="btn-close"
          data-bs-dismiss="modal"
          aria-label="Close"
          @click="close"
        ></button>
      </div>
      <hr />
      <div class="modal-body">
        <p>Para continuar, acepta nuestra política de privacidad.</p>
        <div class="form-check">
          <input
            class="form-check-input"
            type="checkbox"
            id="termsCheckbox"
            @change="checkAccepted = !checkAccepted"
          />
          <label class="form-check-label" for="termsCheckbox">
            Acepto la política de privacidad.
          </label>
        </div>
      </div>
      <hr />
      <div class="modal-footer">
        <button type="button" class="btn btn-secondary" data-bs-dismiss="modal" @click="close">
          Cancelar
        </button>
        <button
          type="button"
          class="btn btn-primary"
          data-bs-dismiss="modal"
          id="continueButton"
          :disabled="!checkAccepted"
          @click="close"
        >
          Continuar
        </button>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, defineProps, defineEmits } from 'vue'

const props = defineProps({
  visible: Boolean,
})
const emit = defineEmits(['update:visible'])

const checkAccepted = ref(false)

function close() {
  emit('update:visible', false)
}
</script>

<style scoped>
@import '@/assets/css/pages/modales_registro.css';
</style>
