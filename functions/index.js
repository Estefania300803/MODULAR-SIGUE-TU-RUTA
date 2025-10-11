// ==============================
// Firebase Functions GEN 1 (CommonJS)
// ==============================
const functions = require("firebase-functions");
const express = require("express");
const cors = require("cors");
const admin = require("firebase-admin");
require("dotenv").config(); // opcional: útil en local con .env

// Inicializa Admin con la configuración del proyecto de Functions
admin.initializeApp();

const app = express();
app.use(cors({ origin: true }));
app.use(express.json());

// ==============================
// reCAPTCHA v3
// ==============================
// Configura el secreto de forma segura:
//   - En local: .env -> RECAPTCHA_SECRET=xxxxx
//   - En prod:  firebase functions:config:set recaptcha.secret="xxxxx"
const SECRET_KEY =
  process.env.RECAPTCHA_SECRET ||
  (functions.config().recaptcha && functions.config().recaptcha.secret);

// Score mínimo (puedes ajustarlo con .env o functions:config)
const MIN_SCORE = parseFloat(process.env.RECAPTCHA_MIN_SCORE || "0.5");

// (Opcional) Restringe hostnames si quieres
// .env: RECAPTCHA_HOSTNAMES=localhost,tudominio.com
const ALLOWED_HOSTNAMES = (process.env.RECAPTCHA_HOSTNAMES || "")
  .split(",")
  .map(s => s.trim())
  .filter(Boolean);
const isHostnameAllowed = (hostname) =>
  ALLOWED_HOSTNAMES.length === 0 || ALLOWED_HOSTNAMES.includes(hostname);

app.post("/verify-reCAPTCHA", async (req, res) => {
  try {
    if (!SECRET_KEY) {
      return res.status(500).json({
        success: false,
        message:
          "Falta configurar RECAPTCHA_SECRET. Usa .env en local o 'firebase functions:config:set recaptcha.secret=\"...\"' en producción.",
      });
    }

    const { recaptcha_token, recaptcha_action } = req.body || {};
    if (!recaptcha_token) {
      return res
        .status(400)
        .json({ success: false, message: "Falta recaptcha_token" });
    }

    const params = new URLSearchParams();
    params.append("secret", SECRET_KEY);
    params.append("response", recaptcha_token);

    // fetch es global en Node >=18 (no uses node-fetch)
    const googleResp = await fetch(
      "https://www.google.com/recaptcha/api/siteverify",
      {
        method: "POST",
        headers: { "Content-Type": "application/x-www-form-urlencoded" },
        body: params,
      }
    );

    const data = await googleResp.json();
    // data: { success, score, action, hostname, challenge_ts, ... }

    if (!data.success) {
      return res.status(400).json({
        success: false,
        message: "Google no validó el token",
        details: data["error-codes"] || null,
      });
    }

    if (!isHostnameAllowed(data.hostname || "")) {
      return res.status(400).json({
        success: false,
        message: `Hostname no permitido (${data.hostname})`,
      });
    }

    const score = typeof data.score === "number" ? data.score : null;
    if (score !== null && score < MIN_SCORE) {
      return res.status(403).json({
        success: false,
        message: `Score bajo (${score}). Sospechoso.`,
        score,
        action: data.action || null,
      });
    }

    if (recaptcha_action && data.action && recaptcha_action !== data.action) {
      return res.status(400).json({
        success: false,
        message: `Acción no coincide (esperada: ${recaptcha_action}, recibida: ${data.action})`,
        score,
        action: data.action,
      });
    }

    return res.json({
      success: true,
      message: "Verificación correcta",
      score,
      action: data.action ?? null,
      hostname: data.hostname ?? null,
    });
  } catch (err) {
    console.error("[verify-reCAPTCHA] Error:", err);
    return res
      .status(500)
      .json({ success: false, message: "Error interno", code: "INTERNAL" });
  }
});

// ==============================
// Config pública de Firebase (opcional para tu front)
// ==============================
app.get("/firebase-config", (req, res) => {
  const firebaseConfig = {
    apiKey: process.env.API_KEY,
    authDomain: process.env.AUTH_DOMAIN,
    projectId: process.env.PROJECT_ID,
    storageBucket: process.env.STORAGE_BUCKET,
    messagingSenderId: process.env.MESSAGING_SENDER_ID,
    appId: process.env.APP_ID,
  };
  res.json(firebaseConfig);
});

// ==============================
// Ejemplo: guardar coordenadas en RTDB (opcional)
// Requiere Realtime Database habilitada y reglas seguras
// ==============================
app.post("/recibirGPS", async (req, res) => {
  try {
    const { lat, lng } = req.body || {};
    if (typeof lat !== "number" || typeof lng !== "number") {
      return res.status(400).send("Faltan datos numéricos lat/lng");
    }

    await admin.database().ref("/ubicaciones").push({
      lat,
      lng,
      timestamp: Date.now(),
    });

    res.status(200).send("Ubicación guardada");
  } catch (err) {
    console.error("[recibirGPS] Error:", err);
    res.status(500).send("Error al guardar");
  }
});

// ==============================
// Export GEN 1 (sin cpu / sin opciones de Gen 2)
// ==============================
exports.app = functions.https.onRequest(app);
