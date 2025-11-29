#include <TinyGPSPlus.h>
#include <HardwareSerial.h>

#define SerialMon Serial

// === GPS ===
TinyGPSPlus gps;
HardwareSerial gpsSerial(2); // UART2 para GPS

// Pines para GPS (ajusta si usas otros)
#define GPS_RX 16   // RX del ESP32 (conectado al TX del GPS)
#define GPS_TX 17   // TX del ESP32 (opcional, al RX del GPS si lo usas)

// Tiempo máximo para intentar obtener fix en cada intento (ms)
const unsigned long TIMEOUT_GPS = 60000; // 60 segundos

void setup() {
  SerialMon.begin(115200);
  delay(2000);
  SerialMon.println();
  SerialMon.println(F("===== PRUEBA UNITARIA DEL RASTREADOR (SOLO GPS) ====="));
  SerialMon.println(F("Iniciando UART para GPS..."));

  // Iniciar puerto serie para GPS
  gpsSerial.begin(9600, SERIAL_8N1, GPS_RX, GPS_TX);
  delay(1000);

  SerialMon.println(F("Esperando coordenadas... saca el módulo a cielo abierto."));
}

void loop() {
  SerialMon.println();
  SerialMon.println(F("---- Nuevo intento de lectura de coordenadas ----"));

  String latStr = "";
  String lngStr = "";

  unsigned long start = millis();
  bool fixObtenido = false;

  // Intentar obtener coordenadas durante TIMEOUT_GPS ms
  while (millis() - start < TIMEOUT_GPS) {
    while (gpsSerial.available()) {
      char c = gpsSerial.read();
      gps.encode(c);
    }

    if (gps.location.isUpdated()) {
      double lat = gps.location.lat();
      double lng = gps.location.lng();

      latStr = String(lat, 6);
      lngStr = String(lng, 6);

      SerialMon.print(F("Latitud:  "));
      SerialMon.println(latStr);
      SerialMon.print(F("Longitud: "));
      SerialMon.println(lngStr);
      SerialMon.print(F("Satélites: "));
      SerialMon.println(gps.satellites.value());
      SerialMon.print(F("Precisión HDOP: "));
      SerialMon.println(gps.hdop.hdop());

      fixObtenido = true;
      break; // salimos del while al primer fix
    }
  }

  if (!fixObtenido) {
    SerialMon.println(F("⏱ No se obtuvo fix de GPS en 60 segundos."));
    SerialMon.println(F("   Revisa antena, alimentación y que esté a cielo abierto."));
  } else {
    SerialMon.println(F("✅ Fix obtenido correctamente."));
  }

  SerialMon.println(F("Esperando 10 segundos antes del siguiente intento..."));
  delay(10000);
}
