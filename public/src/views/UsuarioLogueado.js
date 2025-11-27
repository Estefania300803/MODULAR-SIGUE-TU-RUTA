// ************************************************************
//  MÓDULO DE USUARIO LOGUEADO - SIGUE TU RUTA
// ************************************************************
//  En este archivo se maneja:
//    - Inicialización de Firebase para vistas con usuario activo
//    - Lectura de datos de perfil desde Firebase Auth y Firestore
//    - Pintar nombre, foto y correo del usuario en el DOM
//    - Temporizador de cierre de sesión por inactividad
//    - Cierre de sesión manual (logout)
//    - Protección de la vista: redirigir a login si no hay usuario
// ************************************************************

import { initializeApp } from "https://www.gstatic.com/firebasejs/10.11.0/firebase-app.js";
import { getAuth, onAuthStateChanged, signOut } from "https://www.gstatic.com/firebasejs/10.11.0/firebase-auth.js";
import {
  getFirestore,
  collection,
  query,
  where,
  getDocs
} from "https://www.gstatic.com/firebasejs/10.11.0/firebase-firestore.js";

// URL base del backend en Cloud Functions
// Aquí se expone el endpoint /firebase-config con la configuración de Firebase
const backendURL = "https://us-central1-sigue-tu-ruta-tepatitlan.cloudfunctions.net/app";

// Obtener configuración segura desde el backend
// Se usa top-level await porque este archivo se carga como módulo (type="module")
const config = await fetch(`${backendURL}/firebase-config`).then(res => res.json());

// Inicializar Firebase con configuración protegida
const app = initializeApp(config);
const auth = getAuth(app);
const firestore = getFirestore(app);

// ----------------------------------------------------------
// Función para actualizar el perfil visual del usuario
//  - Obtiene nombre y foto desde Firebase Auth
//  - Si falta el nombre, lo busca en Firestore por correo
//  - Si falta la foto, asigna una imagen genérica
//  - Pinta la información en los elementos del DOM disponibles
// ----------------------------------------------------------
async function updateUserProfile(user) {
  // Si no hay usuario, no hay nada que pintar
  if (!user) return;

  // Nombre y foto iniciales desde el objeto de Auth
  let userName = user.displayName;
  let userProfilePicture = user.photoURL;

  // Si el usuario no tiene displayName, se intenta obtener desde Firestore
  if (!userName) {
    const usersCollection = collection(firestore, "users");
    const q = query(usersCollection, where("email", "==", user.email));
    const querySnapshot = await getDocs(q);

    if (!querySnapshot.empty) {
      const userData = querySnapshot.docs[0].data();
      userName = `${userData.nombre} ${userData.apellidos}`;
    } else {
      // Si tampoco existe en Firestore, se usa un nombre genérico
      userName = "Usuario";
    }
  }

  // Si el usuario no tiene foto configurada, se utiliza una imagen por defecto
  if (!userProfilePicture) {
    userProfilePicture = "./assets/imagenes/perfil.jpg";
  }

  // Referencias a los elementos del DOM donde se mostrará la información
  const userNameElement = document.getElementById("userName");
  const userNamePerfilElement = document.getElementById("userNamePerfil");
  const userProfilePictureElement = document.getElementById("userProfilePicture");
  const imagenPerfil = document.getElementById("imagenPerfil");
  const emailInput = document.getElementById("email");

  // Pintar el nombre en el encabezado o en la sección de perfil
  if (userNameElement) userNameElement.textContent = userName;
  if (userNamePerfilElement) userNamePerfilElement.textContent = userName;

  // Pintar la foto de perfil donde corresponda
  if (userProfilePictureElement) userProfilePictureElement.src = userProfilePicture;
  if (imagenPerfil) imagenPerfil.src = userProfilePicture;

  // Rellenar el campo de correo (por ejemplo en formularios de perfil)
  if (emailInput) emailInput.value = user.email;
}

// ----------------------------------------------------------
// Temporizador de cierre de sesión por inactividad
//  - Si el usuario pasa 10 minutos sin mover el mouse o teclear,
//    la sesión se cierra automáticamente.
// ----------------------------------------------------------
let sessionTimeout;

function resetSessionTimer() {
  // Limpiar cualquier temporizador anterior
  clearTimeout(sessionTimeout);

  // Programar un nuevo cierre de sesión en 10 minutos
  sessionTimeout = setTimeout(() => {
    signOut(auth).then(() => {
      alert("Tu sesión ha expirado por inactividad.");
      window.location.href = "./login.html";
    });
  }, 600000); // 600 000 ms = 10 minutos
}

// Reiniciar el temporizador cada vez que el usuario mueve el mouse o presiona una tecla
document.addEventListener("mousemove", resetSessionTimer);
document.addEventListener("keydown", resetSessionTimer);

// ----------------------------------------------------------
// Cierre de sesión manual desde un botón
//  - Si existe un elemento con id="logout-btn", se asocia el evento
//    para cerrar sesión al hacer clic.
// ----------------------------------------------------------
const logoutBtn = document.getElementById("logout-btn");

if (logoutBtn) {
  logoutBtn.addEventListener("click", (e) => {
    e.preventDefault();

    signOut(auth)
      .then(() => {
        alert("Has cerrado sesión correctamente.");
        window.location.href = "./login.html";
      })
      .catch((error) => {
        console.error("Error al cerrar sesión:", error.message);
        alert("Ocurrió un error al cerrar sesión.");
      });
  });
}

// ----------------------------------------------------------
// Observador de autenticación
//  - Verifica en todo momento si hay un usuario autenticado.
//  - Si lo hay, carga su información y activa el temporizador.
//  - Si no lo hay, redirige a la página de login.
// ----------------------------------------------------------
onAuthStateChanged(auth, (user) => {
  if (user) {
    updateUserProfile(user);
    resetSessionTimer();
  } else {
    console.log("Usuario no autenticado, redirigiendo...");
    window.location.href = "./login.html";
  }
});
