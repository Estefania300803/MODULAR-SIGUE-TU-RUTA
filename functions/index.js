//ESTE ARCHIVO ES EL QUE AGARRRA LAS CREDENCIALES DE FIREBASE PARA DESPUÉS PODERLAS LLAMAR DESDE EL PUBLIC
// HACE LA CONEXIÓN ENTRE EL .env (firebase), node.js Y EL PUBLIC
import express from 'express';
import cors from 'cors';

const functions = require("firebase-functions");
const express = require("express");
const cors = require("cors");
const admin = require("firebase-admin");
require("dotenv").config();

const app = express();
app.use(cors());
app.use(cors({ origin: true }));
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


app.post('/verify-recaptcha', async (req, res) => {
  try {
    const token = req?.body?.token || req?.query?.token;
    if (!token) {
      return res.status(400).json({ success: false, error: 'missing-token' });
    }

    const secret = process.env.RECAPTCHA_SECRET;
    if (!secret) {
      console.error('RECAPTCHA_SECRET is missing');
      return res.status(500).json({ success: false, error: 'missing-secret' });
    }

    const params = new URLSearchParams();
    params.append('secret', secret);
    params.append('response', token);
    // opcional: params.append('remoteip', req.ip);

    const googleResp = await fetch('https://www.google.com/recaptcha/api/siteverify', {
      method: 'POST',
      headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
      body: params
    });

    // Maneja respuestas no-200 de Google para evitar que reviente tu función
    if (!googleResp.ok) {
      const text = await googleResp.text().catch(() => '');
      console.error('siteverify not ok:', googleResp.status, text);
      return res.status(502).json({ success: false, error: 'google-bad-gateway' });
    }

    const result = await googleResp.json();

    // En dev devuelve todo para ver bien los errores (error-codes, hostname, etc.)
    return res.status(200).json(result);
  } catch (e) {
    console.error('verify-recaptcha error:', e);
    return res.status(500).json({ success: false, error: 'server-error' });
  }
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

