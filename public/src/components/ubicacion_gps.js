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

      // Alternar ícono del ojo
      btnRutaC02.classList.toggle("bi-eye");
      btnRutaC02.classList.toggle("bi-eye-slash");

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

    const iconoVerde = L.icon({
      iconUrl: 'https://raw.githubusercontent.com/pointhi/leaflet-color-markers/master/img/marker-icon-green.png',
      shadowUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/0.7.7/images/marker-shadow.png',
      iconSize: [25, 41],
      iconAnchor: [12, 41],
      popupAnchor: [1, -34],
      shadowSize: [41, 41]
    });

    if (marcadorCamion) {
      marcadorCamion.setLatLng(coordenada);
    } else {
      marcadorCamion = L.marker(coordenada, { icon: iconoVerde })
        .addTo(map)
        .bindPopup("Camión Ruta C02")
        .openPopup();
    }
  });
}
