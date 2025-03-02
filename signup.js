import { ManageAccount } from './firebaseconect.js';

document.getElementById("formulario-crear").addEventListener("submit", (event) => {
  event.preventDefault();

  const nombre = document.querySelector("input[placeholder='Nombre']").value;
  const apellidos = document.querySelector("input[placeholder='Apellidos']").value;
  const email = document.getElementById("email").value;
  const password = document.getElementById("password").value;
  const password2 = document.getElementById("password2").value;
  const errorMsg = document.getElementById("error-msg");

  if (password !== password2) {
    errorMsg.style.display = "block";
    errorMsg.textContent = "Las contraseñas no coinciden.";
    return; // Detiene el envío del formulario
  } else {
    errorMsg.style.display = "none";
  }
  const account = new ManageAccount();
  account.register(nombre, apellidos, email, password);
});

document.getElementById("password").addEventListener("input", () => {
  const password = document.getElementById("password").value;
  const passwordWarning = document.getElementById("password-warning");

  if (password.length < 8) {
    passwordWarning.style.display = "block"; // Muestra la advertencia
  } else {
    passwordWarning.style.display = "none"; // Oculta la advertencia si cumple
  }
});

console.log('Formulario de Registro');