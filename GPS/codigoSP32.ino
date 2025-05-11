#define TINY_GSM_MODEM_SIM800
#include <TinyGsmClient.h>
#include <TinyGPSPlus.h>
#include <HardwareSerial.h>

#define SerialMon Serial

// === PINES PARA SIM800L ===
#define MODEM_RX 26
#define MODEM_TX 27

// UART para SIM800L
HardwareSerial SerialAT(1);
TinyGsm modem(SerialAT);

// === GPS ===
TinyGPSPlus gps;
HardwareSerial gpsSerial(2); // UART2 para GPS

// === VARIABLES GLOBALES ===
String latStr = "";
String lngStr = "";
const char apn[] = "internet"; // Telcel
const char server[] = "sigueturutagps.shop"; // Dominio en Hostinger
const char path[] = "/recibir.php"; // Archivo receptor

// === DECLARACIÓN DE FUNCIONES ===
void configurarSIM();
void conectarRed();
void obtenerCoordenadas();
void enviarDatos();
void sendAT(String command, uint32_t timeout = 1000);

// === CONFIGURACIÓN INICIAL ===
void setup() {
  SerialMon.begin(115200);
  delay(3000);

  // Inicializar UART para SIM800L
  SerialAT.begin(9600, SERIAL_8N1, MODEM_TX, MODEM_RX);
  delay(1000);

  // Inicializar UART para GPS
  gpsSerial.begin(9600, SERIAL_8N1, 16, 17);

  // Paso 1: Reiniciar y configurar módem
  configurarSIM();

  // Paso 2: Conectar a red GSM y GPRS
  conectarRed();
}

// === LOOP PRINCIPAL ===
void loop() {
  obtenerCoordenadas();

  // Paso 3: Verificar y enviar datos si son válidos
  if (latStr != "" && lngStr != "") {
    enviarDatos();
  } else {
    Serial.println("⚠️ No se obtuvieron coordenadas válidas. No se enviará nada.");
  }

  // Esperar 3 minutos antes de la siguiente lectura/envío
  delay(180000);
}

// === FUNCIONES ===

// Reinicia el módem SIM800L y muestra estado de la SIM
void configurarSIM() {
  SerialMon.println("Reiniciando módem SIM800L...");
  if (!modem.restart()) {
    SerialMon.println("Error al reiniciar el módem");
    return;
  }

  SerialMon.print("Estado de la SIM: ");
  SerialMon.println(modem.getSimStatus());
}

// Conexión a la red GSM y GPRS
void conectarRed() {
  SerialMon.println("Esperando red GSM...");
  if (!modem.waitForNetwork()) {
    SerialMon.println("No hay red disponible");
    return;
  }
  SerialMon.println("Red GSM conectada");

  SerialMon.println("Conectando a GPRS...");
  if (!modem.gprsConnect(apn, "", "")) {
    SerialMon.println("Fallo al conectar GPRS");
    return;
  }
  SerialMon.println("GPRS conectado correctamente");
}

// Inicializa el GPS, obtiene las coordenadas y las guarda
void obtenerCoordenadas() {
  Serial.println("Esperando coordenadas del GPS...");

  latStr = "";
  lngStr = "";

  unsigned long start = millis();
  while (millis() - start < 60000) { // Espera máxima de 60 segundos
    while (gpsSerial.available()) {
      gps.encode(gpsSerial.read());
    }

    if (gps.location.isUpdated()) {
      latStr = String(gps.location.lat(), 6);
      lngStr = String(gps.location.lng(), 6);

      Serial.print("Latitud: ");
      Serial.println(latStr);
      Serial.print("Longitud: ");
      Serial.println(lngStr);
      Serial.println("----------");
      break;
    }
  }
}

// Envía las coordenadas en formato JSON a tu servidor PHP
void enviarDatos() {
  String json = "{\"lat\":\"" + latStr + "\",\"lng\":\"" + lngStr + "\"}";
  SerialMon.print("JSON a enviar: ");
  SerialMon.println(json);

  sendAT("AT+HTTPTERM", 1000);
  sendAT("AT+HTTPINIT", 1000);
  sendAT("AT+HTTPPARA=\"CID\",1", 1000);
  sendAT("AT+HTTPPARA=\"URL\",\"http://" + String(server) + String(path) + "\"", 1500);
  sendAT("AT+HTTPPARA=\"CONTENT\",\"application/json\"", 1000);

  sendAT("AT+HTTPDATA=" + String(json.length()) + ",10000", 1000);
  delay(100);
  SerialAT.print(json);
  delay(1000);

  SerialMon.println("Enviando datos al PHP...");
  sendAT("AT+HTTPACTION=1", 10000);

  delay(3000);
  SerialMon.println("Leyendo respuesta del servidor:");
  sendAT("AT+HTTPREAD", 3000);

  sendAT("AT+HTTPTERM", 1000);
  SerialMon.println("Proceso de envío terminado");
}

// Enviar comandos AT al SIM800L con espera y salida por Serial
void sendAT(String command, uint32_t timeout) {
  SerialAT.println(command);
  SerialMon.print(">> ");
  SerialMon.println(command);
  long int time = millis();
  while ((millis() - time) < timeout) {
    while (SerialAT.available()) {
      char c = SerialAT.read();
      SerialMon.write(c);
    }
  }
  delay(300);
}
