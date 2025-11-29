// Indica que usaremos el módem SIM800 con TinyGSM
#define TINY_GSM_MODEM_SIM800

// Incluye la librería para manejar el módem GSM/GPRS
#include <TinyGsmClient.h>
// Incluye la librería para decodificar datos del GPS
#include <TinyGPSPlus.h>
// Incluye la librería para usar puertos seriales adicionales en el ESP32
#include <HardwareSerial.h>

// Alias para el puerto serie principal (USB)
#define SerialMon Serial

// Pines del ESP32 conectados al SIM800L
#define MODEM_RX 26  // Pin del ESP32 que recibe datos del SIM800L (TX del SIM800L)
#define MODEM_TX 27  // Pin del ESP32 que envía datos al SIM800L (RX del SIM800L)

// Crea un puerto serie adicional (UART1) para el SIM800L
HardwareSerial SerialAT(1);
// Crea un objeto TinyGsm que usará ese puerto serie
TinyGsm modem(SerialAT);

// Crea el objeto GPS
TinyGPSPlus gps;
// Crea un puerto serie adicional (UART2) para el GPS
HardwareSerial gpsSerial(2);

// Variables globales para guardar la latitud y longitud como texto
String latStr = "";
String lngStr = "";

// APN de la red celular (Telcel)
const char apn[] = "internet";
// Dominio donde está el archivo PHP receptor
const char server[] = "sigueturutagps.shop";
// Ruta del archivo PHP que recibe las coordenadas
const char path[] = "/recibir.php";

// Identificador fijo de este rastreador (ruta C02)
const char ruta[] = "C02"; // Para el otro solo cambiamos C02 por C01

// Declaración de las funciones que se usan más abajo
void configurarSIM();
void conectarRed();
void obtenerCoordenadas();
void enviarDatos();
void sendAT(String command, uint32_t timeout = 1000);

void setup() {
  // Inicia el puerto serie para depuración (USB)
  SerialMon.begin(115200);
  delay(3000);

  // Inicializa el puerto serie para el SIM800L
  // Ojo: aquí usas el orden (TX, RX) según cómo cableaste el módulo
  SerialAT.begin(9600, SERIAL_8N1, MODEM_TX, MODEM_RX);
  delay(1000);

  // Inicializa el puerto serie para el GPS (pines 16 = RX, 17 = TX)
  gpsSerial.begin(9600, SERIAL_8N1, 16, 17);

  // Reinicia y configura el módem SIM800L
  configurarSIM();

  // Conecta a la red GSM y luego a GPRS (datos)
  conectarRed();
}

void loop() {
  // Intenta obtener coordenadas del GPS
  obtenerCoordenadas();

  // Si se obtuvieron coordenadas válidas, se envían al servidor
  if (latStr != "" && lngStr != "") {
    enviarDatos();
  } else {
    Serial.println("⚠️ No se obtuvieron coordenadas válidas. No se enviará nada.");
  }

  // Espera 60 segundos antes de volver a leer y enviar
  delay(60000);
}

// Reinicia el módem SIM800L y muestra el estado de la SIM
void configurarSIM() {
  SerialMon.println("Reiniciando módem SIM800L...");
  // Intenta reiniciar el módem
  if (!modem.restart()) {
    SerialMon.println("Error al reiniciar el módem");
    return;
  }

  // Muestra el estado de la SIM (1 suele ser lista)
  SerialMon.print("Estado de la SIM: ");
  SerialMon.println(modem.getSimStatus());
}

// Conexión a la red GSM y luego a GPRS
void conectarRed() {
  SerialMon.println("Esperando red GSM...");
  // Espera que haya señal de red GSM
  if (!modem.waitForNetwork()) {
    SerialMon.println("No hay red disponible");
    return;
  }
  SerialMon.println("Red GSM conectada");

  SerialMon.println("Conectando a GPRS...");
  // Intenta conectar a GPRS usando el APN definido
  if (!modem.gprsConnect(apn, "", "")) {
    SerialMon.println("Fallo al conectar GPRS");
    return;
  }
  SerialMon.println("GPRS conectado correctamente");
}

// Intenta leer coordenadas del GPS durante un tiempo máximo
void obtenerCoordenadas() {
  Serial.println("Esperando coordenadas del GPS...");

  // Limpia las variables de latitud y longitud
  latStr = "";
  lngStr = "";

  // Guarda el tiempo de inicio para controlar el timeout
  unsigned long start = millis();

  // Espera hasta 60 segundos para obtener una ubicación válida
  while (millis() - start < 60000) {
    // Mientras haya datos del GPS, se los pasa al decodificador TinyGPSPlus
    while (gpsSerial.available()) {
      gps.encode(gpsSerial.read());
    }

    // Si hay una nueva ubicación disponible
    if (gps.location.isUpdated()) {
      // Convierte la latitud y longitud a String con 6 decimales
      latStr = String(gps.location.lat(), 6);
      lngStr = String(gps.location.lng(), 6);

      // Muestra las coordenadas en el monitor serie
      Serial.print("Latitud: ");
      Serial.println(latStr);
      Serial.print("Longitud: ");
      Serial.println(lngStr);
      Serial.println("----------");
      // Sale del while porque ya se obtuvo una coordenada
      break;
    }
  }
}

// Envía las coordenadas en formato JSON al servidor PHP
void enviarDatos() {
  // Construye el JSON con latitud, longitud y la ruta C02
  String json = "{\"lat\":\"" + latStr + "\",\"lng\":\"" + lngStr + "\",\"ruta\":\"" + String(ruta) + "\"}";
  SerialMon.print("JSON a enviar: ");
  SerialMon.println(json);

  // Cierra cualquier sesión HTTP previa por si quedó abierta
  sendAT("AT+HTTPTERM", 1000);
  // Inicializa el servicio HTTP en el SIM800L
  sendAT("AT+HTTPINIT", 1000);
  // Indica que usará el perfil de conexión CID 1
  sendAT("AT+HTTPPARA=\"CID\",1", 1000);
  // Configura la URL a la que se hará la petición HTTP
  sendAT("AT+HTTPPARA=\"URL\",\"http://" + String(server) + String(path) + "\"", 1500);
  // Indica que el contenido que se enviará será JSON
  sendAT("AT+HTTPPARA=\"CONTENT\",\"application/json\"", 1000);

  // Indica al SIM800L cuántos bytes de datos se van a enviar y el tiempo máximo
  sendAT("AT+HTTPDATA=" + String(json.length()) + ",10000", 1000);
  delay(100);
  // Envía el JSON por el puerto del SIM800L
  SerialAT.print(json);
  delay(1000);

  // Ordena al SIM800L que haga una petición HTTP POST (HTTPACTION=1)
  SerialMon.println("Enviando datos al PHP...");
  sendAT("AT+HTTPACTION=1", 10000);

  // Espera un poco y luego lee la respuesta del servidor
  delay(3000);
  SerialMon.println("Leyendo respuesta del servidor:");
  sendAT("AT+HTTPREAD", 3000);

  // Termina la sesión HTTP
  sendAT("AT+HTTPTERM", 1000);
  SerialMon.println("Proceso de envío terminado");
}

// Envía un comando AT al SIM800L y muestra la respuesta en el monitor serie
void sendAT(String command, uint32_t timeout) {
  // Envía el comando al SIM800L
  SerialAT.println(command);
  // También lo muestra en el monitor serie para depuración
  SerialMon.print(">> ");
  SerialMon.println(command);

  // Guarda el tiempo de inicio
  long int time = millis();

  // Lee respuestas del SIM800L durante el tiempo indicado
  while ((millis() - time) < timeout) {
    while (SerialAT.available()) {
      char c = SerialAT.read();
      // Muestra cada carácter que responde el SIM800L
      SerialMon.write(c);
    }
  }

  // Pausa pequeña entre comandos
  delay(300);
}
