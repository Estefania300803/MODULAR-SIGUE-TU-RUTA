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

const backendURL = "https://us-central1-sigue-tu-ruta-tepatitlan.cloudfunctions.net/app";

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

        if (!user.emailVerified) {
          alert("Debes verificar tu correo electrónico antes de iniciar sesión. Revisa tu bandeja de entrada.");
          return;
        }
        
        const token = await user.getIdToken();

        await fetch(`${backendURL}/auth`, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            "Authorization": `Bearer ${token}`
          },
          body: JSON.stringify({ email: user.email })
        });

        alert(`¡Bienvenido, ${user.email}!`);
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

        alert(`¡Bienvenido, ${user.displayName || user.email}!`);
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
