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

const backendURL = "https://us-central1-sigue-tu-ruta-1472.cloudfunctions.net/app";
// ---- Configuración ----
const SITE_KEY = "6LfNAuYrAAAAABsojTY52hYShFwpPaDIk76Eq9XG"; // reCAPTCHA v3 Site Key
const ACTION = "login_submit";
const VERIFY_RECAPTCHA_URL = `${backendURL}/verify-recaptcha`;

// ---- Utilidades de UI mínimas ----
const $ = (sel) => document.querySelector(sel);
const estado = $("#estado");
function setEstado(msg, ok = false) {
  estado.textContent = msg || "";
  estado.className = ok ? "text-success" : "text-danger";
}

// ---- Verificación reCAPTCHA v3 ----
async function getRecaptchaToken() {
  // Espera a que el cliente esté listo
  await new Promise((r) => grecaptcha.ready(r));
  // Ejecuta y devuelve token
  return await grecaptcha.execute(SITE_KEY, { action: ACTION });
}

async function verifyRecaptchaOrThrow(token) {
  // Llama a TU backend (NO a Google directo desde el cliente)
  const resp = await fetch(VERIFY_RECAPTCHA_URL, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ recaptcha_token: token, recaptcha_action: ACTION }),
  });

  const data = await resp.json();

  if (!resp.ok || !data.success) {
    const msg = data?.message || "No se pudo verificar reCAPTCHA (servidor). Intenta nuevamente.";
    throw new Error(msg);
  }
  // Puedes exigir un score mínimo en backend; aquí solo informativo:
  return data; // { success, score, action, ... }
}

// ---- Flujo del formulario ----
const form = $("#formulario-sesion");
const tokenInput = $("#recaptcha_token");

form?.addEventListener("submit", async (e) => {
  e.preventDefault();
  setEstado("Verificando reCAPTCHA…", false);

  try {
    // 1) Obtener token del cliente
    const token = await getRecaptchaToken();
    tokenInput.value = token;

    // 2) Verificar en el backend
    const result = await verifyRecaptchaOrThrow(token);

  } catch (err) {
    console.error(err);
  }
});

// Opcional: precarga cliente
grecaptcha.ready(() => {
  // Puedes hacer una ejecución ligera si quieres “calentar” el score
});

// Obtener la configuración de Firebase desde el backend
fetch(`${backendURL}/firebase-config`)
  .then(response => response.json())
  .then(config => {
    const app = initializeApp(config);
    const auth = getAuth(app);
    const db = getFirestore(app);
    const provider = new GoogleAuthProvider();

    // Inicio de sesión con correo y contraseña
    document.getElementById("formulario-sesion").addEventListener("submit", async (e) => {
      e.preventDefault();

      const email = document.getElementById("email").value.trim();
      const password = document.getElementById("password").value;

      try {
        const userCredential = await signInWithEmailAndPassword(auth, email, password);
        const user = userCredential.user;
        const token = await user.getIdToken();

        await fetch(`${backendURL}/auth`, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            "Authorization": `Bearer ${token}`
          },
          body: JSON.stringify({ email: user.email })
        });

        window.location.href = "./home_page_singin.html";
      } catch (error) {
        console.error("Error al iniciar sesión:", error);
        alert("Credenciales inválidas o error al autenticar.");
      }
    });

    // Inicio de sesión con Google
    document.getElementById("btn-google").addEventListener("click", async () => {
      try {
        const result = await signInWithPopup(auth, provider);
        const user = result.user;

        const usersRef = collection(db, "users");
        const snapshot = await getDocs(usersRef);

        // Verificar si ya existe por UID o email
        const exists = snapshot.docs.some(doc => {
          const data = doc.data();
          return data.uid === user.uid || data.email === user.email;
        });

        // Si no existe, registrar en Firestore
        if (!exists) {
          const nextId = snapshot.size + 1;
          await setDoc(doc(db, "users", nextId.toString()), {
            nombre: user.displayName || "",
            apellidos: "",
            email: user.email,
            uid: user.uid,
            proveedor: "google"
          });
          console.log("Usuario nuevo registrado en Firestore.");
        } else {
          console.log("Usuario ya existe. Solo inicia sesión.");
        }

        window.location.href = "./home_page_singin.html";
      } catch (error) {
        console.error("Error al iniciar sesión con Google:", error.message);
        alert("Error al iniciar con Google: " + error.message);
      }
    });

    // Restablecer contraseña
    document.getElementById("enlace-reset").addEventListener("click", async (e) => {
      e.preventDefault();

      const email = prompt("Por favor, ingresa tu correo electrónico para restablecer tu contraseña:");

      if (!email || !email.includes("@")) {
        alert("Por favor, ingresa un correo válido.");
        return;
      }

      try {
        await sendPasswordResetEmail(auth, email);
        alert("Se ha enviado un correo para restablecer tu contraseña.");
      } catch (error) {
        console.error("Error al restablecer la contraseña:", error.message);
        alert("No se pudo enviar el correo: " + error.message);
      }
    });

  })

  .catch(error => {
    console.error("Error al conectar con Firebase:", error);
    alert("No se pudo conectar con el servidor.");
  });