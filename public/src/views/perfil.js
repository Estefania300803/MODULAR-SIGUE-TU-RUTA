// perfil.js
import { initializeApp } from "https://www.gstatic.com/firebasejs/10.11.0/firebase-app.js";
import { getAuth, onAuthStateChanged, reauthenticateWithCredential, EmailAuthProvider, updatePassword } from "https://www.gstatic.com/firebasejs/10.11.0/firebase-auth.js";
import { getFirestore, collection, query, where, getDocs, updateDoc, doc } from "https://www.gstatic.com/firebasejs/10.11.0/firebase-firestore.js";

const backendURL = "https://us-central1-sigue-tu-ruta-tepatitlan.cloudfunctions.net/app";
const config = await fetch(`${backendURL}/firebase-config`).then(res => res.json());
const app = initializeApp(config);
const auth = getAuth(app);
const firestore = getFirestore(app);

let currentUserData = null;

// Detectar si el usuario inició sesión con correo/contraseña
onAuthStateChanged(auth, (user) => {
  const btnCambiar = document.getElementById("btn-cambiar-pass");

  if (user && user.providerData[0]?.providerId === "password") {
    btnCambiar.style.display = "inline-block";
    currentUserData = user;
  } else {
    btnCambiar.style.display = "none";
  }
});

// Mostrar campos de contraseña al hacer clic
const btnCambiarPass = document.getElementById("btn-cambiar-pass");
btnCambiarPass?.addEventListener("click", () => {
  document.querySelector(".password-section").style.display = "block";
  document.querySelector(".action-buttons").style.display = "flex";
  btnCambiarPass.style.display = "none";
});

// Cancelar y ocultar campos
const btnCancelar = document.querySelector(".btn-cancel");
btnCancelar?.addEventListener("click", () => {
  document.querySelector(".password-section").style.display = "none";
  document.querySelector(".action-buttons").style.display = "none";
  document.getElementById("current-password").value = "";
  document.getElementById("new-password").value = "";
  document.getElementById("confirm-password").value = "";
  const errorMsg = document.getElementById("error-msg");
  btnCambiarPass.style.display = "inline-block";
  if (errorMsg) errorMsg.remove();
});

// Guardar nueva contraseña
const btnGuardar = document.querySelector(".btn-save");
btnGuardar?.addEventListener("click", async () => {
  const currentPassword = document.getElementById("current-password").value;
  const newPassword = document.getElementById("new-password").value;
  const confirmPassword = document.getElementById("confirm-password").value;

  // Quitar errores anteriores si hay
  let errorMsg = document.getElementById("error-msg");
  if (errorMsg) errorMsg.remove();

  //Validar que las contraseñas no esten vacias
  if (!newPassword || !confirmPassword) {
    alert("Por favor completa los campos de nueva contraseña y confirmación.");
    return;
  }  

  // Validar que coincidan las nuevas contraseñas
  if (newPassword !== confirmPassword) {
    errorMsg = document.createElement("p");
    errorMsg.id = "error-msg";
    errorMsg.style.color = "red";
    errorMsg.textContent = "Las contraseñas no coinciden.";
    document.getElementById("confirm-password").after(errorMsg);
    return;
  }

  try {
    const credential = EmailAuthProvider.credential(currentUserData.email, currentPassword);
    await reauthenticateWithCredential(currentUserData, credential);
    await updatePassword(currentUserData, newPassword);

    // Actualizar en Firestore
    const q = query(collection(firestore, "users"), where("email", "==", currentUserData.email));
    const querySnapshot = await getDocs(q);
    if (!querySnapshot.empty) {
      const userDoc = querySnapshot.docs[0];
      await updateDoc(doc(firestore, "users", userDoc.id), {
        password: newPassword
      });
    }

    alert("Contraseña cambiada exitosamente");
    window.location.href = "./perfil.html";
  } catch (error) {
    alert("La contraseña actual no coincide, puedes solicitar restablecerla en https://sigue-tu-ruta-1472.web.app/login.html");
    window.location.href = "https://sigue-tu-ruta-1472.web.app/perfil.html";
  }
});

// Mostrar u ocultar contraseña al hacer clic en el ojito
document.querySelectorAll(".toggle-password").forEach(icon => {
    icon.addEventListener("click", () => {
      const input = document.getElementById(icon.dataset.target);
      if (input.type === "password") {
        input.type = "text";
        icon.classList.remove("bi-eye-slash");
        icon.classList.add("bi-eye");
      } else {
        input.type = "password";
        icon.classList.remove("bi-eye");
        icon.classList.add("bi-eye-slash");
      }
    });
  });
  