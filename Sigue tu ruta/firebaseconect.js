import { initializeApp } from "https://www.gstatic.com/firebasejs/11.2.0/firebase-app.js";
import { getAnalytics } from "https://www.gstatic.com/firebasejs/11.2.0/firebase-analytics.js";
import { getAuth, createUserWithEmailAndPassword, signInWithEmailAndPassword, signOut } from "https://www.gstatic.com/firebasejs/11.2.0/firebase-auth.js";
import { getFirestore, collection, getDocs, setDoc, doc } from "https://www.gstatic.com/firebasejs/11.2.0/firebase-firestore.js";

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
const analytics = getAnalytics(app);
const auth = getAuth();
const firestore = getFirestore(app);

export class ManageAccount {
  async register(nombre, apellidos, email, password) {
    try {
      const userCredential = await createUserWithEmailAndPassword(auth, email, password);
      const user = userCredential.user;

      // Guarda los datos en Firestore
      const usersCollection = collection(firestore, "users");
      const usersSnapshot = await getDocs(usersCollection);
      const nextId = usersSnapshot.size + 1;

      await setDoc(doc(firestore, "users", nextId.toString()), {
        nombre: nombre,
        apellidos: apellidos,
        email: email,
        uid: user.uid
      });
      console.log("Usuario registrado con ID:", nextId);
      alert("Registro exitoso. Serás redirigido a la página de inicio de sesión.");
      window.location.href = "login.html";
    } catch (error) {
      console.error("Error al registrar:", error.message);
      alert("Error al registrar: " + error.message);
    }
  }

  authenticate(email, password) {
    signInWithEmailAndPassword(auth, email, password)
      .then((_) => {
        alert("Has iniciado sesión correctamente.");
        window.location.href = "home_page_singin.html";
      })
      .catch((error) => {
        console.error(error.message);
        alert("Error al iniciar sesión: " + error.message);
      });
  }

  signOut() {
    signOut(auth)
      .then((_) => {
        window.location.href = "index.html";
      })
      .catch((error) => {
        console.error(error.message);
      });
  }
}