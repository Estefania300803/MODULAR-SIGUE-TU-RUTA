// ========== IMPORTAR SDK DE FIREBASE ==========
import { initializeApp } from "https://www.gstatic.com/firebasejs/10.11.0/firebase-app.js";
import { getDatabase, ref, onChildAdded } from "https://www.gstatic.com/firebasejs/10.11.0/firebase-database.js";

// ========== VARIABLES GLOBALES ==========
let marcadorCamion = null;
let mostrarCamion = false;
let initialized = false;

// ========== CONFIGURAR FIREBASE ==========
let database;
const firebaseConfigURL = "https://us-central1-sigue-tu-ruta-tepatitlan.cloudfunctions.net/app/firebase-config";

async function configurarFirebase() {
  try {
    const config = await fetch(firebaseConfigURL).then(res => res.json());
    const app = initializeApp(config);
    database = getDatabase(app);
    initialized = true;
  } catch (error) {
    console.error("❌ Error al inicializar Firebase:", error);
  }
}

// ========== ESCUCHAR CLIC EN RUTA C02 ==========
document.addEventListener("DOMContentLoaded", () => {
  const btnRutaC02 = document.querySelector('i.toggle-ruta[data-ruta="C02"]');
  if (btnRutaC02) {
    btnRutaC02.addEventListener("click", async () => {
      mostrarCamion = !mostrarCamion;

      // Si desactiva la vista, eliminar el marcador
      if (!mostrarCamion && marcadorCamion) {
        map.removeLayer(marcadorCamion);
        marcadorCamion = null;
        return;
      }

      // Iniciar Firebase si no lo hemos hecho antes
      if (!initialized) {
        await configurarFirebase();
      }

      // Si está activado, iniciar seguimiento
      if (mostrarCamion) {
        iniciarSeguimientoGPS();
      }
    });
  }
});

// ========== SEGUIMIENTO DEL CAMIÓN EN TIEMPO REAL ==========
function iniciarSeguimientoGPS() {
  const refUbicaciones = ref(database, "ubicaciones");

  onChildAdded(refUbicaciones, (snapshot) => {
    if (!mostrarCamion) return;

    const data = snapshot.val();
    const lat = parseFloat(data.lat);
    const lng = parseFloat(data.lng);
    if (isNaN(lat) || isNaN(lng)) return;

    const coordenada = [lat, lng];

    // Crear ícono personalizado de camión (tamaño moderado)
    const iconoCamion = L.icon({
      iconUrl: 'assets/iconos/iconoCamion.png', // Ruta al ícono
      iconSize: [24, 24],       // Tamaño del ícono (ancho x alto)
      iconAnchor: [12, 24],     // Punto del ícono que se alinea con la coordenada
      popupAnchor: [0, -24]     // Posición del popup respecto al ícono
    });



    // Si el marcador ya existe, solo moverlo
    if (marcadorCamion) {
      marcadorCamion.setLatLng(coordenada);
    } else {
      // Si no existe, crearlo
      marcadorCamion = L.marker(coordenada, { icon: iconoCamion })
        .addTo(map)
        .bindPopup("Camión Ruta C02")
        .openPopup();
    }
  });
}
