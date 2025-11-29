// Importa la función para inicializar Firebase
import { initializeApp } from "https://www.gstatic.com/firebasejs/10.11.0/firebase-app.js";
// Importa funciones del Realtime Database: obtener base, crear referencia y escuchar nuevos hijos
import { getDatabase, ref, onChildAdded } from "https://www.gstatic.com/firebasejs/10.11.0/firebase-database.js";

// Objeto donde se guardarán los marcadores de cada ruta (C01, C02, etc.)
let marcadores = {};
// Objeto que indica si se debe mostrar el camión de cada ruta
let mostrandoRuta = {};
// Objeto para saber si ya se inició el listener de Firebase para cada ruta
let listenerIniciado = {};

// ⭐ NUEVO: guardar la última coordenada de cada ruta
let ultimasCoordenadas = {};

// Variable que indica si Firebase ya está inicializado
let initialized = false;
// Variable donde se guardará la instancia del Realtime Database
let database;
// URL de la Cloud Function que devuelve la configuración de Firebase
const firebaseConfigURL = "https://us-central1-sigue-tu-ruta-tepatitlan.cloudfunctions.net/app/firebase-config";

// Pequeña función para crear el ícono del camión (evitamos repetir código)
function crearIconoCamion() {
  return L.icon({
    iconUrl: 'assets/iconos/iconoCamion.png',
    iconSize: [24, 24],
    iconAnchor: [12, 24],
    popupAnchor: [0, -24]
  });
}

// Función que inicializa Firebase pidiendo la configuración a tu Cloud Function
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

// Cuando la página termine de cargar
document.addEventListener("DOMContentLoaded", () => {
  // Selecciona todos los íconos que actúan como toggles de rutas (C01, C02, etc.)
  const botonesRutas = document.querySelectorAll('i.toggle-ruta[data-ruta]');

  botonesRutas.forEach((btn) => {
    const ruta = btn.dataset.ruta; // "C01", "C02", etc.
    mostrandoRuta[ruta] = false;
    listenerIniciado[ruta] = false;
    ultimasCoordenadas[ruta] = null;
    marcadores[ruta] = null;

    btn.addEventListener("click", async () => {
      // Alterna el estado de mostrar/ocultar para esta ruta
      mostrandoRuta[ruta] = !mostrandoRuta[ruta];

      // 🔴 Si la ruta se desactiva y hay marcador, lo quitamos del mapa
      if (!mostrandoRuta[ruta]) {
        if (marcadores[ruta]) {
          map.removeLayer(marcadores[ruta]);
          // 👀 IMPORTANTE: NO lo ponemos a null, solo lo quitamos del mapa
        }
        return;
      }

      // 🟢 Si llegamos aquí es porque la ruta se acaba de ACTIVAR

      // Si Firebase aún no está inicializado, lo inicializamos
      if (!initialized) {
        await configurarFirebase();
      }

      // Si aún no se ha iniciado el listener de esta ruta, lo iniciamos
      if (!listenerIniciado[ruta]) {
        iniciarSeguimientoGPS(ruta);
      }

      // ⭐ SIEMPRE que se enciende el ojito:
      // si ya tenemos una última coordenada, mostramos el camión allí
      if (ultimasCoordenadas[ruta]) {
        const iconoCamion = crearIconoCamion();

        if (!marcadores[ruta]) {
          // No hay marcador creado todavía: lo creamos
          marcadores[ruta] = L.marker(ultimasCoordenadas[ruta], { icon: iconoCamion })
            .addTo(map)
            .bindPopup("Camión Ruta " + ruta)
            .openPopup();
        } else {
          // Ya había marcador: nos aseguramos de que esté en la última coordenada
          marcadores[ruta].setLatLng(ultimasCoordenadas[ruta]);
          // Y si estaba removido del mapa, lo volvemos a agregar
          marcadores[ruta].addTo(map);
        }
      }
    });
  });
});

// Función que escucha en tiempo real las nuevas ubicaciones de una ruta específica
function iniciarSeguimientoGPS(ruta) {
  // Marcamos que ya se inició el listener para esta ruta
  listenerIniciado[ruta] = true;

  // Referencia al nodo "ubicaciones/{ruta}" en Realtime Database
  // Ejemplo: "ubicaciones/C01" o "ubicaciones/C02"
  const refUbicaciones = ref(database, "ubicaciones/" + ruta);

  // Se dispara cada vez que se agrega un nuevo hijo en "ubicaciones/{ruta}"
  onChildAdded(refUbicaciones, (snapshot) => {
    const data = snapshot.val();

    const lat = parseFloat(data.lat);
    const lng = parseFloat(data.lng);

    // Validar que sean números válidos
    if (isNaN(lat) || isNaN(lng)) return;

    const coordenada = [lat, lng];

    // ⭐ SIEMPRE actualizamos la última coordenada de la ruta
    ultimasCoordenadas[ruta] = coordenada;

    // Si la ruta no está activa en la vista, NO tocamos el mapa,
    // solo guardamos la última coordenada (para usarla cuando prendan el ojo)
    if (!mostrandoRuta[ruta]) return;

    const iconoCamion = crearIconoCamion();

    // Si ya existe un marcador para esta ruta, solo lo movemos
    if (marcadores[ruta]) {
      marcadores[ruta].setLatLng(coordenada);
    } else {
      // Si no existe, lo creamos
      marcadores[ruta] = L.marker(coordenada, { icon: iconoCamion })
        .addTo(map)
        .bindPopup("Camión Ruta " + ruta)
        .openPopup();
    }
  });
}
