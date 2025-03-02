import { initializeApp } from "https://www.gstatic.com/firebasejs/11.2.0/firebase-app.js";
import { getAuth, GoogleAuthProvider, onAuthStateChanged, signOut } from "https://www.gstatic.com/firebasejs/11.2.0/firebase-auth.js";
import { getFirestore, collection, query, where, getDocs } from "https://www.gstatic.com/firebasejs/11.2.0/firebase-firestore.js"; // Importaciones correctas

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
const firestore = getFirestore(app); // Firestore inicializado

async function updateUserProfile(user) {
    if (!user) return;

    let userName = user.displayName; // Primero intenta con user.displayName

    if (!userName) { // Si displayName está vacío, busca en Firestore por email
        const usersCollection = collection(firestore, "users");
        const q = query(usersCollection, where("email", "==", user.email));
        const querySnapshot = await getDocs(q);

        if (!querySnapshot.empty) { 
            const userData = querySnapshot.docs[0].data(); // Toma el primer resultado
            userName = `${userData.nombre} ${userData.apellidos}`; // Obtiene nombre y apellidos
        } else {
            userName = "Usuario"; // Valor por defecto si tampoco está en Firestore
        }
    }

    const userEmail = user.email;
    const userProfilePicture = user.photoURL || "default-profile.png"; // Usa imagen por defecto si no tiene

    console.log("Email:", userEmail);
    console.log("Nombre completo:", userName);

    // Actualizar los elementos HTML
    document.getElementById("userName").textContent = userName;
    document.getElementById("userEmail").textContent = userEmail;
    document.getElementById("userProfilePicture").src = userProfilePicture;
}

// Agregado: Temporizador para cerrar sesión después de 10 minutos de inactividad
let sessionTimeout;
function resetSessionTimer() {
    clearTimeout(sessionTimeout);
    sessionTimeout = setTimeout(() => {
        signOut(auth).then(() => {
            alert("Tu sesión ha expirado. Por favor, inicia sesión nuevamente.");
            window.location.href = "login.html";
        });
    }, 600000); // 10 minutos (600000 ms)
}

// Escucha eventos del usuario para reiniciar el temporizador
document.addEventListener("mousemove", resetSessionTimer);
document.addEventListener("keydown", resetSessionTimer);

// Detecta cambios en la autenticación
onAuthStateChanged(auth, (user) => {
    if (user) {
        updateUserProfile(user);
        resetSessionTimer(); // Inicia el temporizador si el usuario está autenticado
    } else {
        console.log("No hay usuario autenticado.");
        window.location.href = "login.html";
    }
});

// Agregado: Función para cerrar sesión al hacer clic en "Cerrar Sesión"
document.getElementById("logout-btn").addEventListener("click", (event) => {
    event.preventDefault(); // Evita la recarga de la página
    signOut(auth)
        .then(() => {
            alert("Has cerrado sesión correctamente.");
            window.location.href = "login.html"; // Redirige al login
        })
        .catch((error) => {
            console.error("Error al cerrar sesión:", error.message);
            alert("Hubo un error al cerrar sesión.");
        });
});
