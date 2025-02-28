import { initializeApp } from "https://www.gstatic.com/firebasejs/11.2.0/firebase-app.js";
import { getAuth, GoogleAuthProvider, onAuthStateChanged } from "https://www.gstatic.com/firebasejs/11.2.0/firebase-auth.js";
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

// Detecta cambios en la autenticación
onAuthStateChanged(auth, (user) => {
    if (user) {
        updateUserProfile(user);
    } else {
        console.log("No hay usuario autenticado.");
        alert("Crea tu usuario para entrar");
        window.location.href = "login.html";
    }
});
