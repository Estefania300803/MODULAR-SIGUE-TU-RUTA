import { initializeApp } from "https://www.gstatic.com/firebasejs/11.2.0/firebase-app.js";
import { getAuth, createUserWithEmailAndPassword, sendEmailVerification } from "https://www.gstatic.com/firebasejs/11.2.0/firebase-auth.js";
import { getFirestore, collection, getDocs, setDoc, doc } from "https://www.gstatic.com/firebasejs/11.2.0/firebase-firestore.js";

const backendURL = "https://us-central1-sigue-tu-ruta-tepatitlan.cloudfunctions.net/app";

// Obtener configuración segura
const config = await fetch(`${backendURL}/firebase-config`).then(res => res.json());

// Inicializar Firebase
const app = initializeApp(config);
const auth = getAuth(app);
const firestore = getFirestore(app);

// Clase que maneja el registro
class ManageAccount {
  async register(nombre, apellidos, email, password) {
    try {
      const userCredential = await createUserWithEmailAndPassword(auth, email, password);
      const user = userCredential.user;

      // Enviar correo de verificación
      await sendEmailVerification(user);
      alert("Se ha enviado un correo de verificación. Revisa tu bandeja de entrada.");

      // Guardar en Firestore con ID incremental
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
      window.location.href = "login.html";
    } catch (error) {
      console.error("Error al registrar:", error.message);
      alert("Error al registrar: " + error.message);
    }
  }
}

// Instanciar clase y escuchar el formulario
const gestor = new ManageAccount();

document.getElementById("formulario-crear").addEventListener("submit", async (e) => {
  e.preventDefault();

  const nombre = e.target.nombre.value.trim();
  const apellidos = e.target.apellidos.value.trim();
  const email = e.target.email.value.trim();
  const password = e.target.password.value;
  const password2 = e.target.password2.value;
  const checkbox = document.getElementById("Checkboxprincipal");

  // Validaciones
  if (password.length < 8) {
    document.getElementById("password-warning").style.display = "block";
    return;
  } else {
    document.getElementById("password-warning").style.display = "none";
  }

  if (password !== password2) {
    document.getElementById("error-msg").style.display = "block";
    return;
  } else {
    document.getElementById("error-msg").style.display = "none";
  }

  if (!checkbox.checked) {
    alert("Debes aceptar las políticas y términos para continuar.");
    return;
  }

  // Llamar al registro
  gestor.register(nombre, apellidos, email, password);
});