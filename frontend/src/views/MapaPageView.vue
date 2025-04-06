<template>
  <div class="mapa-page-container">
    <AppNavbar />
    <AppSidebar />
    <UserMenu :userName="'Emmanuel'" />

    <div class="container">
      <div class="col2" id="mapa"></div>
      <div class="col1" id="simbolos">
        <div class="card" style="width: 18rem;">
          <div class="adicional card-body">
            <p class="card-title">Adicional</p>
            <ul class="card-text">
              <li class="menu-adicional">
                <div class="dropdown-center">
                  <button
                    class="btn btn-secondary dropdown-toggle"
                    type="button"
                    data-bs-toggle="dropdown"
                    aria-expanded="false"
                  >
                    Camiones
                  </button>
                  <ul class="dropdown-menu">
                    <li><a class="dropdown-item" href="#">Action</a></li>
                    <li><a class="dropdown-item" href="#">Action two</a></li>
                    <li><a class="dropdown-item" href="#">Action three</a></li>
                  </ul>
                </div>
              </li>
              <li class="menu-adicional">
                <div class="dropdown-center">
                  <button
                    class="btn btn-secondary dropdown-toggle"
                    type="button"
                    data-bs-toggle="dropdown"
                    aria-expanded="false"
                  >
                    Rutas
                  </button>
                  <ul class="dropdown-menu">
                    <li><a class="dropdown-item" href="#">Action</a></li>
                    <li><a class="dropdown-item" href="#">Action two</a></li>
                    <li><a class="dropdown-item" href="#">Action three</a></li>
                  </ul>
                </div>
              </li>
            </ul>
          </div>
        </div>
        <div class="card" style="width: 18rem;">
          <div class="simbologia card-body">
            <p class="card-title">Simbología</p>
            <ul class="card-text">
              <li class="menu-simbolo">
                <img src="@/assets/iconos/camion_verde.svg" /><span
                  >Camiones en circulación</span
                >
              </li>
              <li class="menu-simbolo">
                <img src="@/assets/iconos/parada_camiones.svg" /><span
                  >Paradas de Camiones</span
                >
              </li>
              <li class="menu-simbolo">
                <img src="@/assets/iconos/Pin_ubicacion.svg" /><span
                  >Tu ubicación</span
                >
              </li>
              <li class="menu-simbolo">
                <img src="@/assets/iconos/coin.svg" /><span>Tarifa</span>
              </li>
              <li class="menu-simbolo">
                <img src="@/assets/iconos/clock-history.svg" /><span
                  >Horario</span
                >
              </li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { onMounted } from "vue";
import { crearMapa } from "@/assets/geo/mapa.js";
import { agregarRutaAlMapa } from "@/assets/geo/ruta_centro_cerrito.js";
import { agregarMarcadoresAlMapa } from "@/assets/geo/marcadores.js";

import AppNavbar from "@/components/AppNavbar.vue";
import AppSidebar from "@/components/AppSidebar.vue";
import UserMenu from "@/components/UserMenu.vue";

onMounted(() => {
  const container = document.getElementById("mapa");
  if (container) {
    const map = crearMapa(container);
    agregarRutaAlMapa(map);
    agregarMarcadoresAlMapa(map);
  } else {
    console.error("No se encontró el contenedor del mapa");
  }
});
</script>
