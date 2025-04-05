<template>
  <div class="mapa-page-container">
    <AppNavbar />
    <AppSidebar />
    <UserMenu :userName="'Emmanuel'" />

    <div class="container">
      <div class="col2" id="mapa"></div>
      <div class="col1" id="simbolos">
        <div class="simbologia">
          <ul>
            <p>Simbología</p>
            <li class="menu-simbolo">
              <img src="@/assets/iconos/camion_verde.svg" /><span>Camiones en circulación</span>
            </li>
            <li class="menu-simbolo">
              <img src="@/assets/iconos/parada_camiones.svg" /><span>Paradas de Camiones</span>
            </li>
            <li class="menu-simbolo">
              <img src="@/assets/iconos/Pin_ubicacion.svg" /><span>Tu ubicación</span>
            </li>
          </ul>
        </div>

        <div class="adicional">
          <ul>
            <p>Adicional</p>
            <li class="menu-adicional">
              <img src="@/assets/iconos/Fav.svg" /><span>Favoritos</span>
            </li>
            <li class="menu-adicional">
              <img src="@/assets/iconos/parada_camiones.svg" /><span>Paradas cercanas</span>
            </li>
            <li class="menu-adicional">
              <img src="@/assets/iconos/camion_verde.svg" /><span>Camiones cercanos</span>
            </li>
            <li class="menu-adicional">
              <img src="@/assets/iconos/Noti.svg" /><span>Notificaciones</span>
            </li>
            <li class="menu-adicional">
              <img src="@/assets/iconos/Rutas.svg" /><span>Rutas</span>
            </li>
          </ul>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { onMounted } from 'vue'
import { crearMapa } from '@/assets/geo/mapa.js'
import { agregarRutaAlMapa } from '@/assets/geo/ruta_centro_cerrito.js'
import { agregarMarcadoresAlMapa } from '@/assets/geo/marcadores.js'

import AppNavbar from '@/components/AppNavbar.vue'
import AppSidebar from '@/components/AppSidebar.vue'
import UserMenu from '@/components/UserMenu.vue'

onMounted(() => {
  const container = document.getElementById('mapa')
  if (container) {
    const map = crearMapa(container)
    agregarRutaAlMapa(map)
    agregarMarcadoresAlMapa(map)
  } else {
    console.error('No se encontró el contenedor del mapa')
  }
})
</script>
