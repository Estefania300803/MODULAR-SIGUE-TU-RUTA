// ************************************************************
//  MÓDULO DE PERFIL - CAMBIO DE CONTRASEÑA DEL USUARIO
// ************************************************************
//  Este script se encarga de:
//    - Inicializar Firebase (Auth y Firestore) usando configuración
//      obtenida desde el backend.
//    - Detectar si el usuario inició sesión con correo/contraseña.
//    - Mostrar y ocultar la sección de cambio de contraseña.
//    - Reautenticar al usuario con su contraseña actual.
//    - Actualizar la contraseña en Firebase Authentication.
//    - Actualizar también el campo "password" en la colección "users".
//    - Controlar el mostrar/ocultar de las contraseñas con el icono ojo.
// ************************************************************

import { initializeApp } from "https://www.gstatic.com/firebasejs/10.11.0/firebase-app.js";
import {
  getAuth,
  onAuthStateChanged,
  reauthenticateWithCredential,
  EmailAuthProvider,
  updatePassword
} from "https://www.gstatic.com/firebasejs/10.11.0/firebase-auth.js";
import {
  getFirestore,
  collection,
  query,
  where,
  getDocs,
  updateDoc,
  doc
} from "https://www.gstatic.com/firebasejs/10.11.0/firebase-firestore.js";

// URL base del backend donde está el endpoint /firebase-config
const backendURL = "https://us-central1-sigue-tu-ruta-tepatitlan.cloudfunctions.net/app";

// Solicita la configuración de Firebase al backend y la parsea como JSON
const config = await fetch(`${backendURL}/firebase-config`).then(res => res.json());

// Inicializa la app de Firebase con la configuración obtenida
const app = initializeApp(config);

// Obtiene la instancia de autenticación de Firebase para esta app
const auth = getAuth(app);

// Obtiene la instancia de Firestore para esta app
const firestore = getFirestore(app);

// Variable global donde se guardarán los datos del usuario actual
// (se usa después para reautenticar y cambiar la contraseña)
let currentUserData = null;

// --------------------------------------------------------------
// Detectar si el usuario inició sesión con correo/contraseña
// --------------------------------------------------------------
// onAuthStateChanged se ejecuta cuando cambia el estado de autenticación
onAuthStateChanged(auth, (user) => {
  const btnCambiar = document.getElementById("btn-cambiar-pass");

  // Si hay usuario y el proveedor es "password", se permite cambiar contraseña
  if (user && user.providerData[0]?.providerId === "password") {
    btnCambiar.style.display = "inline-block";
    currentUserData = user; // Guarda el usuario actual para futuros usos
  } else {
    // Si no hay usuario o se autenticó con otro proveedor (ej. Google), se oculta el botón
    btnCambiar.style.display = "none";
  }
});

// --------------------------------------------------------------
// Mostrar campos de contraseña al hacer clic en "Cambiar contraseña"
// --------------------------------------------------------------
const btnCambiarPass = document.getElementById("btn-cambiar-pass");
btnCambiarPass?.addEventListener("click", () => {
  // Muestra la sección que contiene los inputs de contraseña
  document.querySelector(".password-section").style.display = "block";
  // Muestra los botones de acción (guardar/cancelar)
  document.querySelector(".action-buttons").style.display = "flex";
  // Oculta el botón principal de "Cambiar contraseña"
  btnCambiarPass.style.display = "none";
});

// --------------------------------------------------------------
// Cancelar y ocultar campos de cambio de contraseña
// --------------------------------------------------------------
const btnCancelar = document.querySelector(".btn-cancel");
btnCancelar?.addEventListener("click", () => {
  // Oculta la sección de contraseñas y los botones de acción
  document.querySelector(".password-section").style.display = "none";
  document.querySelector(".action-buttons").style.display = "none";

  // Limpia los campos de texto de las contraseñas
  document.getElementById("current-password").value = "";
  document.getElementById("new-password").value = "";
  document.getElementById("confirm-password").value = "";

  // Si hay un mensaje de error previo, se elimina
  const errorMsg = document.getElementById("error-msg");

  // Vuelve a mostrar el botón principal de "Cambiar contraseña"
  btnCambiarPass.style.display = "inline-block";

  if (errorMsg) errorMsg.remove();
});

// --------------------------------------------------------------
// Guardar nueva contraseña (flujo principal de cambio de contraseña)
// --------------------------------------------------------------
const btnGuardar = document.querySelector(".btn-save");
btnGuardar?.addEventListener("click", async () => {
  // Lee los valores actuales de los campos de contraseña
  const currentPassword = document.getElementById("current-password").value;
  const newPassword = document.getElementById("new-password").value;
  const confirmPassword = document.getElementById("confirm-password").value;

  // Quitar errores anteriores si hay (elimina el <p id="error-msg"> si existe)
  let errorMsg = document.getElementById("error-msg");
  if (errorMsg) errorMsg.remove();

  // ----------------------------------------------------------
  // Validar que las contraseñas no estén vacías
  // ----------------------------------------------------------
  if (!newPassword || !confirmPassword) {
    alert("Por favor completa los campos de nueva contraseña y confirmación.");
    return;
  }

  // ----------------------------------------------------------
  // Validar que coincidan las nuevas contraseñas
  // ----------------------------------------------------------
  if (newPassword !== confirmPassword) {
    // Crea un elemento <p> para mostrar el mensaje de error debajo del input
    errorMsg = document.createElement("p");
    errorMsg.id = "error-msg";
    errorMsg.style.color = "red";
    errorMsg.textContent = "Las contraseñas no coinciden.";
    // Inserta el mensaje justo después del campo de confirmación
    document.getElementById("confirm-password").after(errorMsg);
    return;
  }

  try {
    // --------------------------------------------------------
    // 1) Reautenticar al usuario con su contraseña actual
    // --------------------------------------------------------
    // Crea credenciales usando el email del usuario y la contraseña actual
    const credential = EmailAuthProvider.credential(currentUserData.email, currentPassword);

    // Reautentica al usuario (requisito de Firebase antes de cambios sensibles)
    await reauthenticateWithCredential(currentUserData, credential);

    // --------------------------------------------------------
    // 2) Actualizar la contraseña en Firebase Authentication
    // --------------------------------------------------------
    await updatePassword(currentUserData, newPassword);

    // --------------------------------------------------------
    // 3) Actualizar la contraseña también en Firestore (colección "users")
    // --------------------------------------------------------
    // Construye una consulta para buscar el documento del usuario por su email
    const q = query(
      collection(firestore, "users"),
      where("email", "==", currentUserData.email)
    );

    // Ejecuta la consulta y obtiene los documentos que coinciden
    const querySnapshot = await getDocs(q);

    // Si se encontró al menos un documento, actualiza el primero
    if (!querySnapshot.empty) {
      const userDoc = querySnapshot.docs[0];
      await updateDoc(doc(firestore, "users", userDoc.id), {
        password: newPassword // Actualiza el campo "password" en Firestore
      });
    }

    // Si todo salió bien, muestra un mensaje de éxito y recarga la página de perfil
    alert("Contraseña cambiada exitosamente");
    window.location.href = "./perfil.html";
  } catch (error) {
    // Si falla la reautenticación o la actualización de contraseña,
    // se asume que la contraseña actual no coincide (o hubo otro error)
    alert("La contraseña actual no coincide, puedes solicitar restablecerla en https://sigue-tu-ruta-tepatitlan.web.app/login.html");
    // Redirige a la versión desplegada de la página de perfil
    window.location.href = "https://sigue-tu-ruta-tepatitlan.web.app/perfil.html";
  }
});

// --------------------------------------------------------------
// Mostrar u ocultar contraseña al hacer clic en el ojito
// --------------------------------------------------------------
// Recorre todos los elementos que tienen la clase .toggle-password
// Cada uno debe tener un data-target que apunte al id del input
document.querySelectorAll(".toggle-password").forEach(icon => {
  icon.addEventListener("click", () => {
    // Obtiene el input asociado usando el atributo data-target del icono
    const input = document.getElementById(icon.dataset.target);

    // Si el input está ocultando la contraseña, se cambia a texto
    if (input.type === "password") {
      input.type = "text";
      icon.classList.remove("bi-eye-slash");
      icon.classList.add("bi-eye");
    } else {
      // Si el input está mostrando la contraseña, se vuelve a ocultar
      input.type = "password";
      icon.classList.remove("bi-eye");
      icon.classList.add("bi-eye-slash");
    }
  });
});
