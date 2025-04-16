<template>
  <div class="mapa-page-container">
    <AppNavbar />
    <AppSidebar />
    <UserMenu :userName="'Emmanuel'" />

    <div class="container">
      <div class="col2" id="mapa"></div>
      <div class="col1 fullscreen-static" id="simbolos">
        <div class="card" style="width: 18rem; margin-bottom: 20px;">
          <div class="adicional card-body">
            <ul class="card-text">
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
                    <li
                      v-for="(ruta, index) in rutasAdicionales"
                      :key="index"
                      class="d-flex justify-content-between align-items-center px-2"
                    >
                      <a class="dropdown-item flex-grow-1" href="#">{{
                        ruta.nombre
                      }}</a>
                      <i
                        class="bi"
                        :class="ruta.visible ? 'bi-eye' : 'bi-eye-slash'"
                        role="button"
                        @click.stop="
                          toggleVisibility('rutasAdicionales', index)
                        "
                      ></i>
                    </li>
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
                    Camiones
                  </button>
                  <ul class="dropdown-menu">
                    <li
                      v-for="(ruta, index) in rutasCamiones"
                      :key="index"
                      class="d-flex justify-content-between align-items-center px-2"
                    >
                      <a class="dropdown-item flex-grow-1" href="#">{{
                        ruta.nombre
                      }}</a>
                      <i
                        class="bi"
                        :class="ruta.visible ? 'bi-eye' : 'bi-eye-slash'"
                        role="button"
                        @click.stop="toggleVisibility('rutasCamiones', index)"
                      ></i>
                    </li>
                  </ul>
                </div>
              </li>
            </ul>
          </div>
        </div>
        <div class="card" style="width: 18rem; margin-bottom: 20px;">
          <div class="simbologia card-body">
            <p class="card-title">Simbologia</p>
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
import { onMounted, ref } from "vue";
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

const rutasAdicionales = ref([
  { nombre: "Centro-Cerrito", visible: true },
  { nombre: "Matamoros-Central", visible: true },
]);

const rutasCamiones = ref([
  { nombre: "R01/02", visible: true },
  { nombre: "R03/04", visible: true },
  { nombre: "R05/06", visible: true },
]);

function toggleVisibility(lista, index) {
  if (lista === "rutasAdicionales") {
    rutasAdicionales.value[index].visible = !rutasAdicionales.value[index]
      .visible;
  } else if (lista === "rutasCamiones") {
    rutasCamiones.value[index].visible = !rutasCamiones.value[index].visible;
  }
}
</script>

<style scoped>
@import "@/assets/css/pages/mapa_page.css";
</style>
