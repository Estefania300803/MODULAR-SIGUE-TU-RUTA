import { initializeApp } from "https://www.gstatic.com/firebasejs/11.2.0/firebase-app.js";
import { getAnalytics } from "https://www.gstatic.com/firebasejs/11.2.0/firebase-analytics.js";
import { getAuth, createUserWithEmailAndPassword, signInWithEmailAndPassword, signOut, GoogleAuthProvider, signInWithPopup } from "https://www.gstatic.com/firebasejs/11.2.0/firebase-auth.js";
import { getFirestore, collection, getDocs, setDoc, doc } from "https://www.gstatic.com/firebasejs/11.2.0/firebase-firestore.js";
import { sendEmailVerification } from "https://www.gstatic.com/firebasejs/11.2.0/firebase-auth.js";

const firebaseConfig = {
    apiKey: "AIzaSyDzxaGnZoN1vN4sGiyXtRQGN9BLYQoMPpA",
    authDomain: "sigue-tu-ruta-tepatitlan.firebaseapp.com",
    projectId: "sigue-tu-ruta-tepatitlan",
    storageBucket: "sigue-tu-ruta-tepatitlan.firebasestorage.app",
    messagingSenderId: "473228179036",
    appId: "1:473228179036:web:6285a4b5d7ea69a10b5899",
    measurementId: "G-S40S9K1BKP"
};

const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
const auth = getAuth();
const firestore = getFirestore(app);
const provider = new GoogleAuthProvider();


// ESTO ES PARA LA PARTE DEL REGISTRO
export class ManageAccount {
    //Esto guarda los datos del registro en la base de datos
  async register(nombre, apellidos, email, password) {
    try {
      const userCredential = await createUserWithEmailAndPassword(auth, email, password);
      const user = userCredential.user;

      // Enviar correo de verificación
      await sendEmailVerification(user);
      alert("Se ha enviado un correo de verificación. Por favor, revisa tu bandeja de entrada antes de iniciar sesión.");

      // Guarda los datos en Firestore
      const usersCollection = collection(firestore, "users");
      const usersSnapshot = await getDocs(usersCollection);
      const nextId = usersSnapshot.size + 1;

      await setDoc(doc(firestore, "users", nextId.toString()), {
        nombre: nombre,
        apellidos: apellidos,
        email: email,
        uid: user.uid
      });
      //Aqui es cuando revisa que no haya estado registrado y que todo este bien
      console.log("Usuario registrado con ID:", nextId);
      alert("Registro exitoso. Serás redirigido a la página de inicio de sesión.");
      window.location.href = "login.html";
    } catch (error) {
      console.error("Error al registrar:", error.message);
      alert("Error al registrar: " + error.message);
    }
  }
    
  //Esto es lo que hace que revise si esta el correo y la contraseña en firebase para que inicie sesión
  authenticate(email, password) {
    signInWithEmailAndPassword(auth, email, password)
        .then((userCredential) => {
            const user = userCredential.user;

            if (user.emailVerified) {
                window.location.href = "home_page_singin.html";
            } else {
                alert("Debes verificar tu correo antes de iniciar sesión.");
                signOut(auth); // Cierra sesión para evitar accesos no verificados
            }
        })
        .catch((error) => {
            console.error(error.message);
            alert("Error al iniciar sesión: " + error.message);
        });
}


  //Esto es para cuando el usuario cierre sesión
  signOut() {
    signOut(auth)
      .then((_) => {
        window.location.href = "index.html";
      })
      .catch((error) => {
        console.error(error.message);
      });
  }
}


//Todo lo de autoenticacion con google
 export function IngresarConGoogle() {
    signInWithPopup(auth, provider)
   .then((result) => {
    // Se obtiene el token de Google para acceder a la API
     const credential = GoogleAuthProvider.credentialFromResult(result);
     const token = credential ? credential.accessToken : null;
     // Información del usuario autenticado
     const user = result.user;
     console.log("Usuario autenticado:", user);
     // Redireccionar al usuario después de iniciar sesión
     window.location.href = "home_page_singin.html";
   }).catch((error) => {
     console.error("Error al iniciar sesión con Google:", error.message);
     alert("Error: " + error.message);
   });
}