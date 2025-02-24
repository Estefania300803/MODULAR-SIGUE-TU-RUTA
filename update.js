import { initializeApp } from "https://www.gstatic.com/firebasejs/11.2.0/firebase-app.js";
import { getAuth, GoogleAuthProvider, onAuthStateChanged } from "https://www.gstatic.com/firebasejs/11.2.0/firebase-auth.js";
import { getFirestore } from "https://www.gstatic.com/firebasejs/11.2.0/firebase-firestore.js"; // Agregado

const firebaseConfig = {
    apiKey: "AIzaSyDzxaGnZoN1vN4sGiyXtRQGN9BLYQoMPpA",
    authDomain: "sigue-tu-ruta-tepatitlan.firebaseapp.com",
    projectId: "sigue-tu-ruta-tepatitlan",
    storageBucket: "sigue-tu-ruta-tepatitlan.firebasestorage.app",
    messagingSenderId: "473228179036",
    appId: "1:473228179036:web:6285a4b5d7ea69a10b5899",
    measurementId: "G-S40S9K1BKP"
};

const app = initializeApp(firebaseConfig);
const auth = getAuth();
const firestore = getFirestore(app); // Ahora sí funciona

function updateUserProfile(user) {
  const userName = user.displayName || "Usuario"; // Usa el nombre real
  const userEmail = user.email;
  const userProfilePicture = user.photoURL || "default-profile.png"; // Si no tiene foto, usa una por defecto

  console.log("Email:", userEmail);
  console.log("Entró en la actualización de perfil");

  // Actualizar los elementos HTML
  document.getElementById("userName").textContent = userName;
  document.getElementById("userEmail").textContent = userEmail;
  document.getElementById("userProfilePicture").src = userProfilePicture;
}

// Detecta cambios en la autenticación
onAuthStateChanged(auth, (user) => {
  if (user) {
    updateUserProfile(user);
  } else {
    console.log("No hay usuario autenticado.");
    window.location.href = "login.html";
  }
});
