import { crearMapa } from '@/assets/geo/mapa.js'

export default function initMapa() {
  const mapaContainer = document.getElementById('mapa')
  if (mapaContainer) {
    crearMapa(mapaContainer)
  } else {
    console.error('Elemento con id "mapa" no encontrado.')
  }
}
