// ************************************************************
//  MÓDULO DE LOGIN - SIGUE TU RUTA
// ************************************************************
//  En este archivo se maneja:
//    Inicialización de Firebase (Auth + Firestore)
//    Login con correo y contraseña
//    Login con Google
//    Restablecimiento de contraseña
//    Comunicación con el backend mediante token (Bearer)
// ************************************************************

import { initializeApp } from "https://www.gstatic.com/firebasejs/10.11.0/firebase-app.js";
import {
  getAuth,
  signInWithEmailAndPassword,
  GoogleAuthProvider,
  signInWithPopup,
  sendPasswordResetEmail
} from "https://www.gstatic.com/firebasejs/10.11.0/firebase-auth.js";
import {
  getFirestore,
  collection,
  getDocs,
  setDoc,
  doc
} from "https://www.gstatic.com/firebasejs/10.11.0/firebase-firestore.js";

// ==========================================================
//  MODAL DE MENSAJES PARA EL LOGIN
//  Un solo modal (id="modal1") que se reutiliza para todos
//  los mensajes, solo cambiando título y contenido.
// ==========================================================

function abrirModalMensaje(titulo, mensaje) {
  const modal = document.getElementById("modal1");
  if (!modal) {
    console.warn("Modal con id 'modal1' no encontrado en el DOM.");
    return;
  }

  const tituloEl = modal.querySelector("h2");
  const textoEl = modal.querySelector("p");

  if (tituloEl) tituloEl.textContent = titulo;
  if (textoEl) textoEl.textContent = mensaje;

  // Mostrar el modal activando la animación definida en el CSS (.modal.active)
  modal.classList.add("active");
}

// Cerrar el modal cuando se haga clic en "Cerrar" o en el fondo oscuro
document.addEventListener("click", (event) => {
  // Botón "Cerrar"
  if (event.target.classList.contains("close-modal")) {
    const idModal = event.target.getAttribute("data-close");
    const modal = document.getElementById(idModal);
    if (modal) {
      modal.classList.remove("active");
    }
  }

  // Clic en el fondo oscuro (el div con clase .modal)
  if (event.target.classList.contains("modal")) {
    event.target.classList.remove("active");
  }
});
// ==========================================================
//  URL base del backend en Cloud Functions
//    Aquí se exponen endpoints como /firebase-config y /auth
// ==========================================================
const backendURL = "https://us-central1-sigue-tu-ruta-tepatitlan.cloudfunctions.net/app";

//  Obtener la configuración de Firebase desde el backend
//    Ventaja: el front no tiene la config "quemada" y se puede cambiar desde el servidor
fetch(`${backendURL}/firebase-config`)
  .then(response => response.json())
  .then(config => {
    //  Inicializar la app de Firebase con la configuración recibida
    const app = initializeApp(config);

    //  Servicio de autenticación (logins, tokens, etc.)
    const auth = getAuth(app);

    //  Base de datos Firestore (para guardar/leer datos de usuarios)
    const db = getFirestore(app);

    //  Proveedor de autenticación de Google (login con popup)
    const provider = new GoogleAuthProvider();

    // ==========================================================
    //  INICIO DE SESIÓN CON CORREO Y CONTRASEÑA
    // ==========================================================
    document.getElementById("formulario-sesion").addEventListener("submit", async (e) => {
      //  Evita que el formulario recargue la página de forma tradicional
      e.preventDefault();

      //  Obtenemos los valores del formulario de login
      const email = document.getElementById("email").value.trim();
      const password = document.getElementById("password").value;

      try {
        //  Intentamos autenticar al usuario en Firebase Auth
        const userCredential = await signInWithEmailAndPassword(auth, email, password);
        const user = userCredential.user;

        //  Validación extra: el correo debe estar verificado
        if (!user.emailVerified) {
          abrirModalMensaje(
            "Verifica tu correo electrónico",
            "Debes verificar tu correo electrónico antes de iniciar sesión. Revisa tu bandeja de entrada."
          );
          return; // Cortamos aquí si el correo no está verificado
        }

        //  Obtener el ID Token JWT del usuario autenticado
        const token = await user.getIdToken();

        //  Enviar token al backend para crear/validar la sesión del lado del servidor
        await fetch(`${backendURL}/auth`, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            "Authorization": `Bearer ${token}` // Mandamos el token como Bearer en los headers
          },
          body: JSON.stringify({ email: user.email }) // Se puede usar como referencia en el backend
        });

        //  Si todo sale bien, redirigimos a la página de inicio logueado
        window.location.href = "./home_page_singin.html";
      } catch (error) {
        //  Cualquier error (credenciales, red, etc.) termina aquí
        console.error("Error al iniciar sesión:", error);
        abrirModalMensaje(
          "Error al iniciar sesión",
          "Credenciales inválidas o error al autenticar."
        );
      }
    });

    // ==========================================================
    //  INICIO DE SESIÓN CON GOOGLE (POPUP)
    // ==========================================================
    document.getElementById("btn-google").addEventListener("click", async () => {
      try {
        //  Abre el popup de Google y espera a que el usuario complete el proceso
        const result = await signInWithPopup(auth, provider);
        const user = result.user;

        //  Referencia a la colección "users" en Firestore
        const usersRef = collection(db, "users");
        const snapshot = await getDocs(usersRef);

        //  Verificar si el usuario ya existe en Firestore (por UID o email)
        const exists = snapshot.docs.some(doc => {
          const data = doc.data();
          return data.uid === user.uid || data.email === user.email;
        });

        //  Si no existe, se registra por primera vez
        if (!exists) {
          //  nextId se calcula como "tamaño de la colección + 1"
          const nextId = snapshot.size + 1;

          //  Se guarda un documento con datos básicos del usuario
          await setDoc(doc(db, "users", nextId.toString()), {
            nombre: user.displayName || "",
            apellidos: "",
            email: user.email,
            uid: user.uid,
            proveedor: "google" // Marcamos que este usuario se registró con Google
          });
          console.log("Usuario nuevo registrado en Firestore.");
        } else {
          //  Si ya existe solo se registra el inicio de sesión (no se duplica info)
          console.log("Usuario ya existe. Solo inicia sesión.");
        }

        //  Redirigimos al home de usuario autenticado
        window.location.href = "./home_page_singin.html";
      } catch (error) {
        //  Manejo de errores del popup (cancelado, bloqueado, etc.)
        console.error("Error al iniciar sesión con Google:", error.message);
        abrirModalMensaje(
          "Error al iniciar con Google",
          "Error al iniciar con Google: " + error.message
        );
      }
    });

    // ==========================================================
    //  RESTABLECER CONTRASEÑA (PASSWORD RESET) CON MODAL
    // ==========================================================

    //  Referencias a los elementos del flujo de restablecer contraseña
    const enlaceReset = document.getElementById("enlace-reset");
    const modalReset = document.getElementById("modal-reset");
    const inputResetEmail = document.getElementById("reset-email");
    const btnEnviarReset = document.getElementById("btn-enviar-reset");

    //  Al hacer clic en "¿Olvidaste tu contraseña?" abrimos el modal
    enlaceReset.addEventListener("click", (e) => {
      //  Evitamos la navegación por defecto del enlace
      e.preventDefault();

      //  Limpiamos el input y, si se desea, se puede precargar el correo del login
      if (inputResetEmail) {
        const emailLogin = document.getElementById("email")?.value.trim() || "";
        inputResetEmail.value = emailLogin;
      }

      //  Mostramos el modal de restablecimiento
      if (modalReset) {
        modalReset.classList.add("active");
      }

      //  Enfocamos el campo de correo para que el usuario pueda escribir de inmediato
      inputResetEmail?.focus();
    });

    //  Al hacer clic en "Enviar enlace" intentamos mandar el correo de reset
    btnEnviarReset.addEventListener("click", async () => {
      if (!inputResetEmail) return;

      //  Obtenemos y limpiamos el correo capturado en el modal
      const email = inputResetEmail.value.trim();

      //  Validación rápida para evitar correos vacíos o claramente inválidos
      if (!email || !email.includes("@")) {
        abrirModalMensaje(
          "Correo no válido",
          "Por favor, ingresa un correo válido."
        );
        return;
      }

      try {
        //  Enviamos el correo de restablecimiento a través de Firebase Auth
        await sendPasswordResetEmail(auth, email);

        //  Mostramos mensaje de éxito en el modal de mensajes reutilizable
        abrirModalMensaje(
          "Correo enviado",
          "Hemos enviado un enlace para restablecer tu contraseña. Revisa tu bandeja de entrada."
        );

        //  Cerramos el modal de restablecimiento
        if (modalReset) {
          modalReset.classList.remove("active");
        }
      } catch (error) {
        //  Manejo de errores (correo no registrado, problemas de red, etc.)
        console.error("Error al restablecer la contraseña:", error.message);
        abrirModalMensaje(
          "No se pudo enviar el correo",
          "No se pudo enviar el correo: " + error.message
        );
      }
    });
  })
  // ==========================================================
  //  MANEJO GLOBAL DE ERRORES AL OBTENER LA CONFIGURACIÓN
  // ==========================================================
  .catch(error => {
    //  Si algo falla al conectar con el backend o al traer la config
    console.error("Error al conectar con Firebase:", error);
    abrirModalMensaje(
      "Error de conexión",
      "No se pudo conectar con el servidor."
    );
  });