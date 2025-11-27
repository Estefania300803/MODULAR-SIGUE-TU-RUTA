# 🚍 Sigue Tu Ruta – Plataforma Modular de Rastreo GPS en Tiempo Real

Sigue Tu Ruta es un sistema modular de rastreo en tiempo real para los camiones de las rutas C01 y CO2 del transporte público para Tepatitlán de Morelos.  
Utiliza un ESP32 con módulos GPS NEO-6M y SIM800L, un proxy PHP, Firebase Functions, y un frontend web desarrollado con HTML, CSS, JS y Leaflet.js.  

## 🧩 Arquitectura del Sistema

El proyecto está compuesto por tres módulos principales, que trabajan en conjunto:

-------------------------------------------------------------------------------------------------------------------
|       Módulo        |   Carpeta  |                                Descripción                                   |
|---------------------|------------|------------------------------------------------------------------------------|
|       GPS (IoT)     |   /GPS     | Código del ESP32 y script PHP que envían las coordenadas GPS hacia Firebase. |
|Cloud Functions(Back)| /functions | Funciones en Node.js (Firebase Functions) que manejan los datos en la        |
|                     |            | la nube.                                                                     |
|   Frontend Web      |  /public   | Sitio web interactivo con Leaflet.js para mostrar el mapa y las rutas.       |
-------------------------------------------------------------------------------------------------------------------

## ⚙️ Estructura del Proyecto

MODULAR-SIGUE-TU-RUTA/
│
├── .firebaserc
├── .gitignore
├── firebase.json
├── firebase-debug.log
│
├── functions/
│   ├── index.js
│   ├── .env
│   ├── firebase-key.json
│   ├── package.json
│   └── node_modules/
│
├── GPS/
│   ├── codigoProxy.php
│   └── codigoSP32/
│       └── codigoSP32.ino
│
└── public/
    ├── index.html
    ├── mapa.html
    ├── camiones.html
    ├── login.html
    ├── registro.html
    ├── perfil.html
    ├── nosotros.html
    ├── home_page.html
    ├── home_page_singin.html
    ├── restablecer_contraseña.html
    │
    ├── assets/
    │   ├── css/
    │   │   ├── base.css
    │   │   ├── components.css
    │   │   ├── layout.css
    │   │   ├── theme.css
    │   │   └── pages/
    │   │       ├── camiones.css
    │   │       ├── home_registro.css
    │   │       ├── login_page.css
    │   │       ├── mapa.css
    │   │       ├── nosotros.css
    │   │       ├── page_laterales.css
    │   │       ├── perfil.css
    │   │       └── restablecer_contraseña.css
    │   │
    │   ├── iconos/
    │   │   ├── camion_verde.svg
    │   │   ├── Fav.svg
    │   │   ├── iconoCamion.png
    │   │   ├── Logo_s-l.svg
    │   │   ├── Noti.svg
    │   │   ├── parada_camiones.svg
    │   │   ├── Pin_ubicacion.svg
    │   │   └── Rutas.svg
    │   │
    │   └── imagenes/
    │       ├── C01.png
    │       ├── C02.png
    │       ├── camion.png
    │       ├── fondo.jpeg
    │       ├── Login.jpg
    │       ├── logo.png
    │       ├── mapa.png
    │       └── perfil.jpg
    │
    └── src/
        ├── components/
        │   ├── compartir.js
        │   ├── mapa_leaflet.js
        │   ├── modales.js
        │   ├── sidebar.js
        │   ├── siderbar_menu_simbologia.js
        │   └── ubicacion_gps.js
        │
        ├── js/
        │   ├── dropdown_menu.js
        │   └── vergrafico.js
        │
        └── views/
            ├── login.js
            ├── perfil.js
            ├── registro.js
            └── UsuarioLogueado.js

## 🛰️ Módulo GPS (ESP32)

Archivo principal: `GPS/codigoSP32/codigoSP32.ino`  
- Utiliza las librerías `TinyGSM` y `TinyGPSPlus`.  
- Obtiene la latitud, longitud y hora del módulo GPS NEO-6M.  
- Envía los datos mediante el módulo SIM800L (GPRS) a `codigoProxy.php`.  
- El envío ocurre cada 3 minutos.
- Este archivo es la programación implementada en los sp32 para la captura y envio de coordenadas.

Archivo PHP: `GPS/codigoProxy.php`  
- Recibe los datos del ESP32.  
- Valida la información.  
- Envía los datos al Realtime Database de Firebase.
- Este archivo esta cargado en hostinger no en firebase.


## ☁️ Backend – Firebase Functions

Ubicación: `/functions`  
- `index.js`: Define funciones HTTP:
  - `/recibirGPS`: guarda las coordenadas en la base de datos.
  - `/firebase-config`: devuelve configuración al frontend.
- `.env`: contiene las variables de entorno (claves privadas).
- `firebase-key.json`: credencial del servicio para conexión segura.

Dependencias principales:
- `firebase-functions`
- `firebase-admin`
- `express`
- `dotenv`

## 💻 Frontend Web

Ubicación: `/public`

- `index.html` / `mapa.html`: Página principal del mapa en tiempo real.
- `src/components/mapa_leaflet.js`: Inicializa y actualiza el mapa con Leaflet.
- `src/components/ubicacion_gps.js`: Escucha cambios de coordenadas en Firebase.
- `assets/css/`: Contiene estilos generales y por página.
- `src/views/`: Controla vistas dinámicas (login, registro, perfil, etc.).
- `assets/iconos/` y `assets/imagenes/`: Contienen recursos visuales del sistema.

### 🗺️ Visualización
El mapa muestra en tiempo real la ubicación del camión usando Leaflet.js.  
Cada vez que Firebase actualiza las coordenadas en `/ubicacion`, el marcador se mueve automáticamente.


## 🔐 Seguridad

- Variables sensibles (claves API, credenciales) guardadas en `.env`.
- Comunicación cifrada vía HTTPS entre módulos.
- Firebase Functions actúa como intermediario seguro para evitar exponer `firebaseConfig`.
- Validación de datos antes de guardar coordenadas.


## 🧠 Tecnologías Utilizadas

|         Área          |               Tecnología              |
|-----------------------|---------------------------------------|
|    Microcontrolador   |                  ESP32                |
|     Comunicación      |              SIM800L (GPRS)           |
|         GPS           |                  NEO-6M               |
|       Backend         |      Firebase Functions (Node.js)     |
|  Servidor intermedio  |                   PHP 8               |
|     Base de datos     |        Firebase Realtime Database     |
|       Frontend        |   HTML5, CSS3, JavaScript, Leaflet.js |
|  Control de versiones |               Git y GitHub            |



## 🚀 Instalación

### 1️⃣ Clonar el repositorio
```bash
git clone https://github.com/usuario/MODULAR-SIGUE-TU-RUTA.git
cd MODULAR-SIGUE-TU-RUTA
```

### 2️⃣ Instalar dependencias del backend
```bash
cd functions
npm install
```

### 3️⃣ Configurar Firebase
1. Crear un proyecto en [Firebase Console](https://console.firebase.google.com/).  
2. Habilitar Realtime Database y Functions.  
3. Añadir las credenciales en `functions/.env` y `functions/firebase-key.json`.  
4. Desplegar:
   ```bash
   firebase deploy
   ```

### 4️⃣ Subir sitio al hosting de Firebase
El contenido de `/public` se despliega automáticamente con Firebase Hosting.

---

## 👩‍💻 Autores

- Estefania Guadalupe Ramirez Tavares
- Angela Ruvalcaba Hernández  
- Emmanuel Hernandez Gutierrez

Año: 2025  