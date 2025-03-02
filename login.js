import { ManageAccount, IngresarConGoogle } from './firebaseconect.js';

document.getElementById("formulario-sesion").addEventListener("submit", (event) => {
  event.preventDefault();

  const email = document.getElementById("email").value;
  const password = document.getElementById("password").value;

  const account = new ManageAccount();
  account.authenticate(email, password);
  
});

console.log('Formulario de Inicio de Sesión');

document.getElementById("google-login").addEventListener("click", () => {
    IngresarConGoogle();
  });

  import { resetPassword } from "./firebaseconect.js";

document.getElementById("forgot-password-link").addEventListener("click", (event) => {
    event.preventDefault(); // Evita que el enlace recargue la página

    const email = prompt("Ingresa tu correo electrónico para restablecer tu contraseña:");

    if (email) {
        resetPassword(email);
    } else {
        alert("Debes ingresar un correo válido.");
    }
});
