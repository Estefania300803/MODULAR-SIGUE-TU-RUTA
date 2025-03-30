import { initializeApp } from "https://www.gstatic.com/firebasejs/10.11.0/firebase-app.js";
import { getAuth, signInWithEmailAndPassword } from "https://www.gstatic.com/firebasejs/10.11.0/firebase-auth.js";

const backendURL = "https://us-central1-sigue-tu-ruta-tepatitlan.cloudfunctions.net/app";

fetch(`${backendURL}/firebase-config`)
  .then(response => response.json())
  .then(config => {
    const app = initializeApp(config);
    const auth = getAuth(app);

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

        alert(`¡Bienvenido, ${user.email}!`);
        window.location.href = "/home_page_singin.html";
      } catch (error) {
        console.error("Error al iniciar sesión:", error);
        alert("Credenciales inválidas o error al autenticar.");
      }
    });
  })
  .catch(error => {
    console.error("Error al conectar con Firebase:", error);
    alert("No se pudo conectar con el servidor.");
  });
