import { initializeApp } from "https://www.gstatic.com/firebasejs/10.11.0/firebase-app.js";
import { getAuth, onAuthStateChanged, signOut } from "https://www.gstatic.com/firebasejs/10.11.0/firebase-auth.js";
import { getFirestore, collection, query, where, getDocs } from "https://www.gstatic.com/firebasejs/10.11.0/firebase-firestore.js";

const backendURL = "https://us-central1-sigue-tu-ruta-1472.cloudfunctions.net/app";

// Obtener configuración segura desde el backend
const config = await fetch(`${backendURL}/firebase-config`).then(res => res.json());

// Inicializar Firebase con configuración protegida
const app = initializeApp(config);
const auth = getAuth(app);
const firestore = getFirestore(app);

// Función para actualizar el perfil del usuario
async function updateUserProfile(user) {
  if (!user) return;

  let userName = user.displayName;
  let userProfilePicture = user.photoURL;

  // Si no tiene nombre, obtenerlo desde Firestore por su correo
  if (!userName) {
    const usersCollection = collection(firestore, "users");
    const q = query(usersCollection, where("email", "==", user.email));
    const querySnapshot = await getDocs(q);

    if (!querySnapshot.empty) {
      const userData = querySnapshot.docs[0].data();
      userName = `${userData.nombre} ${userData.apellidos}`;
    } else {
      userName = "Usuario";
    }
  }

  // Si no tiene foto, usar una genérica
  if (!userProfilePicture) {
    userProfilePicture = "assets/imagenes/perfil.jpg";
  }

  // Mostrar los datos en el DOM (si los elementos existen)
  const userNameElement = document.getElementById("userName");
  const userProfilePictureElement = document.getElementById("userProfilePicture");
  const imagenPerfil = document.getElementById("imagenPerfil");

  if (userNameElement) userNameElement.textContent = userName;
  if (userProfilePictureElement) userProfilePictureElement.src = userProfilePicture;
  if(imagenPerfil) imagenPerfil.src = userProfilePicture;
}

// Temporizador de cierre por inactividad (10 min)
let sessionTimeout;
function resetSessionTimer() {
  clearTimeout(sessionTimeout);
  sessionTimeout = setTimeout(() => {
    signOut(auth).then(() => {
      alert("Tu sesión ha expirado por inactividad.");
      window.location.href = "login.html";
    });
  }, 600000); // 600,000 ms = 10 minutos
}

// Reiniciar temporizador al mover mouse o presionar tecla
document.addEventListener("mousemove", resetSessionTimer);
document.addEventListener("keydown", resetSessionTimer);

// Cierre de sesión manual
const logoutBtn = document.getElementById("logout-btn");
if (logoutBtn) {
  logoutBtn.addEventListener("click", (e) => {
    e.preventDefault();
    signOut(auth)
      .then(() => {
        alert("Has cerrado sesión correctamente.");
        window.location.href = "login.html";
      })
      .catch((error) => {
        console.error("Error al cerrar sesión:", error.message);
        alert("Ocurrió un error al cerrar sesión.");
      });
  });
}

// Verificar si el usuario está logueado
onAuthStateChanged(auth, (user) => {
  if (user) {
    updateUserProfile(user);
    resetSessionTimer();
  } else {
    console.log("Usuario no autenticado, redirigiendo...");
    window.location.href = "login.html";
  }
});
