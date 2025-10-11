const express = require('express');
const path = require('path');  // Esto es para los arhivos

const app = express();
const port = 3000;

// Servir archivos estáticos desde la carpeta "public"
app.use(express.static(path.join(__dirname, 'public')));  

// Ruta para acceder a mapa.html
app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'mapa.html'));
});

// Ruta para recibir las coordenadas (si necesitas procesarlas)
app.post('/recibir-coordenadas', (req, res) => {
  const { latitude, longitude } = req.body;

  if (!latitude || !longitude) {
    return res.status(400).send('Faltan coordenadas');
  }

  console.log(`Coordenadas recibidas: Latitud: ${latitude}, Longitud: ${longitude}`);
  res.status(200).send('Coordenadas recibidas correctamente');
});

// Iniciar el servidor
app.listen(port, () => {
  console.log(`Servidor corriendo en http://localhost:${port}`);
});
