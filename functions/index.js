//ESTE ARCHIVO ES EL QUE AGARRRA LAS CREDENCIALES DE FIREBASE PARA DESPUÉS PODERLAS LLAMAR DESDE EL PUBLIC
// HACE LA CONEXIÓN ENTRE EL .env (firebase), node.js Y EL PUBLIC
const functions = require("firebase-functions");
const express = require("express");
const cors = require("cors");
const admin = require("firebase-admin");
require("dotenv").config();

const app = express();
app.use(cors());
app.use(express.json());

// Inicializa Firebase Admin con la clave
admin.initializeApp({
  credential: admin.credential.cert(require("./firebase-key.json"))
});

// Ruta pública para enviar config de Firebase al frontend
app.get("/firebase-config", (req, res) => {
  const firebaseConfig = {
    apiKey: process.env.API_KEY,
    authDomain: process.env.AUTH_DOMAIN,
    projectId: process.env.PROJECT_ID,
    storageBucket: process.env.STORAGE_BUCKET,
    messagingSenderId: process.env.MESSAGING_SENDER_ID,
    appId: process.env.APP_ID
  };
  res.json(firebaseConfig);
});

// Exporta app como función HTTP
exports.app = functions.https.onRequest(app);

//PARA MANDAR LAS COORDENADAS DEL GPS QUE SE MANDARON AL PHP AQUI
app.post("/recibirGPS", (req, res) => {
  const data = req.body;

  if (!data.lat || !data.lng) {
    return res.status(400).send("Faltan datos");
  }

  // Guarda la coordenada como un nuevo punto en la colección "ubicaciones"
  admin.database().ref("/ubicaciones").push({
    lat: data.lat,
    lng: data.lng,
    timestamp: Date.now()
  }).then(() => {
    res.status(200).send("Ubicación guardada");
  }).catch((err) => {
    console.error("Error:", err);
    res.status(500).send("Error al guardar");
  });
});

