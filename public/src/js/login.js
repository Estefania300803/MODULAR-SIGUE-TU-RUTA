
const RECAPTCHA_SITE_KEY = '6Ldjnb4rAAAAAGfVbbnPl0F2DvjbOvezoDFtTChR'; 
const VERIFY_URL = '/auth/verify-recaptcha'; 


const form = document.getElementById('formulario-sesion');
const emailInput = document.getElementById('email');
const passInput  = document.getElementById('password');
const btnLogin   = document.getElementById('btn-login');

let recaptchaWidgetId = null;

window.initLoginRecaptcha = () => {
  if (!window.grecaptcha) return;
  recaptchaWidgetId = grecaptcha.render('recaptcha-login', {
    sitekey: RECAPTCHA_SITE_KEY,
    size: 'invisible',
    callback: 'onRecaptchaLogin' // nombre global
  });
};

// El callback DEBE ser global para reCAPTCHA v2
window.onRecaptchaLogin = async (token) => {
  try {
    // 1) Verificar el token en tu backend
    const resp = await fetch(VERIFY_URL, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ token })
    });
    const data = await resp.json();

    if (!data?.success) {
      // Falló validación de captcha
      alert('Verificación reCAPTCHA falló. Intenta de nuevo.');
      grecaptcha.reset(recaptchaWidgetId);
      btnLogin.disabled = false;
      return;
    }

    // 2) Si pasó reCAPTCHA, ahora sí intenta el login de Firebase
    //    (ajusta a tu implementación real con Firebase Auth)
    await doFirebaseLogin(emailInput.value, passInput.value);

  } catch (err) {
    console.error(err);
    alert('Hubo un problema validando el reCAPTCHA.');
  } finally {
    grecaptcha.reset(recaptchaWidgetId);
    btnLogin.disabled = false;
  }
};

// Intercepta el submit y ejecuta el captcha
form.addEventListener('submit', (e) => {
  e.preventDefault();
  if (!emailInput.value || !passInput.value) {
    alert('Completa tu correo y contraseña.');
    return;
  }
  btnLogin.disabled = true;
  if (recaptchaWidgetId !== null) {
    grecaptcha.execute(recaptchaWidgetId);
  } else {
    alert('reCAPTCHA no inicializado. Recarga la página.');
    btnLogin.disabled = false;
  }
});

// ===== EJEMPLO: reemplaza con tu lógica real de Firebase Auth =====
async function doFirebaseLogin(email, password) {
  // Aquí va tu signInWithEmailAndPassword(firebaseAuth, email, password)
  // o tu flujo actual. Ejemplo ilustrativo:
  // const { user } = await signInWithEmailAndPassword(auth, email, password);
  // window.location.href = '/';
  console.log('Login OK para:', email);
  alert('Login exitoso (demo). Integra aquí tu signInWithEmailAndPassword.');
}
