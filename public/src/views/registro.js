// ************************************************************
//  MÓDULO DE REGISTRO - SIGUE TU RUTA
// ************************************************************
//  En este archivo se realiza:
//    - Inicialización de Firebase (App, Auth y Firestore)
//    - Registro de usuarios con correo y contraseña
//    - Envío de correo de verificación
//    - Guardado de datos básicos del usuario en Firestore
//    - Validaciones principales del formulario de registro
// ************************************************************

import { initializeApp } from "https://www.gstatic.com/firebasejs/11.2.0/firebase-app.js";
import { getAuth, createUserWithEmailAndPassword, sendEmailVerification } from "https://www.gstatic.com/firebasejs/11.2.0/firebase-auth.js";
import { getFirestore, collection, getDocs, setDoc, doc } from "https://www.gstatic.com/firebasejs/11.2.0/firebase-firestore.js";

// URL base del backend donde se expone el endpoint /firebase-config
const backendURL = "https://us-central1-sigue-tu-ruta-tepatitlan.cloudfunctions.net/app";

// ----------------------------------------------------------
// Obtener configuración segura de Firebase desde el backend
// ----------------------------------------------------------
// Se hace una petición al backend para obtener la configuración
// de Firebase en lugar de dejarla "quemada" en el frontend.
const config = await fetch(`${backendURL}/firebase-config`).then(res => res.json());

// ----------------------------------------------------------
// Inicializar Firebase con la configuración obtenida
// ----------------------------------------------------------
const app = initializeApp(config);
const auth = getAuth(app);
const firestore = getFirestore(app);

// ************************************************************
//  Clase que maneja el registro de usuarios
// ************************************************************
class ManageAccount {
  // Método principal de registro
  // Recibe nombre, apellidos, email y password desde el formulario
  async register(nombre, apellidos, email, password) {
    try {
      // Crear usuario en Firebase Authentication con email y contraseña
      const userCredential = await createUserWithEmailAndPassword(auth, email, password);
      const user = userCredential.user;

      // Enviar correo de verificación al usuario recién creado
      await sendEmailVerification(user);
      alert("Se ha enviado un correo de verificación. Revisa tu bandeja de entrada.");

      // ------------------------------------------------------
      // Guardar información del usuario en Firestore
      // usando un ID incremental basado en el tamaño actual
      // de la colección "users".
      // ------------------------------------------------------
      const usersCollection = collection(firestore, "users");
      const usersSnapshot = await getDocs(usersCollection);
      const nextId = usersSnapshot.size + 1; // siguiente ID (tamaño + 1)

      // Crear o actualizar el documento con el ID calculado
      await setDoc(doc(firestore, "users", nextId.toString()), {
        nombre: nombre,
        apellidos: apellidos,
        email: email,
        uid: user.uid
      });

      // Mensaje de depuración en consola
      console.log("Usuario registrado con ID:", nextId);

      // Redirigir al usuario a la página de login tras registrarse
      window.location.href = "./login.html";
    } catch (error) {
      // Cualquier error en el proceso de registro se captura aquí
      console.error("Error al registrar:", error.message);
      alert("Error al registrar: " + error.message);
    }
  }
}

// ----------------------------------------------------------
// Instanciar la clase y escuchar el envío del formulario
// ----------------------------------------------------------
const gestor = new ManageAccount();

// Escuchar el evento submit del formulario con id "formulario-crear"
document.getElementById("formulario-crear").addEventListener("submit", async (e) => {
  // Prevenir el envío por defecto (recarga de la página)
  e.preventDefault();

  // Obtener y limpiar (trim) los valores ingresados por el usuario
  const nombre = e.target.nombre.value.trim();
  const apellidos = e.target.apellidos.value.trim();
  const email = e.target.email.value.trim();
  const password = e.target.password.value;
  const password2 = e.target.password2.value;
  const checkbox = document.getElementById("Checkboxprincipal");

  // --------------------------------------------------------
  // Validación de longitud mínima de la contraseña
  // --------------------------------------------------------
  if (password.length < 8) {
    // Mostrar advertencia si la contraseña tiene menos de 8 caracteres
    document.getElementById("password-warning").style.display = "block";
    return;
  } else {
    // Ocultar la advertencia si la contraseña cumple con la longitud mínima
    document.getElementById("password-warning").style.display = "none";
  }

  // --------------------------------------------------------
  // Validación de coincidencia entre password y password2
  // --------------------------------------------------------
  if (password !== password2) {
    // Mostrar mensaje de error si las contraseñas no coinciden
    document.getElementById("error-msg").style.display = "block";
    return;
  } else {
    // Ocultar mensaje de error si las contraseñas coinciden
    document.getElementById("error-msg").style.display = "none";
  }

  // --------------------------------------------------------
  // Validación de aceptación de políticas y términos
  // --------------------------------------------------------
  if (!checkbox.checked) {
    // Si el checkbox no está marcado, se impide el registro
    alert("Debes aceptar las políticas y términos para continuar.");
    return;
  }

  // --------------------------------------------------------
  // Si todas las validaciones pasan, se procede a registrar
  // --------------------------------------------------------
  gestor.register(nombre, apellidos, email, password);
});
