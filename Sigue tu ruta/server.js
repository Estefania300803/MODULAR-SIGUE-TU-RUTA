import express from "express";
import admin from "firebase-admin";
import path from "path";
import { fileURLToPath } from "url";
import fs from "fs";

// Configurar __dirname en ESM (ya que no está definido por defecto)
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Cargar la clave de Firebase (asegúrate de que clave.json está en la misma carpeta que server.js)
const serviceAccount = JSON.parse(fs.readFileSync("./clave.json", "utf-8"));

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
  databaseURL: "https://sigue-tu-ruta-1472-20783.firebaseapp.com/" // aqui va la url de firebase
});

const app = express();
const PORT = 3000;

// Ajustar la ruta para servir archivos estáticos correctamente
app.use(express.static(path.join(__dirname, "public")));
app.use(express.static(path.join(__dirname, "src")));

// Ruta para cargar home_page.html
app.get("/", (req, res) => {
  res.sendFile(path.join(__dirname, "public", "home_page.html"));
});

app.listen(PORT, () => {
  console.log(`🔥 Servidor corriendo en http://localhost:${PORT}`);
  console.log("✅ Firebase Admin inicializado correctamente");
});
