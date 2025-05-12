<?php
// === 1. Leer el cuerpo de la petición y decodificar JSON ===
$data = json_decode(file_get_contents("php://input"), true);

// === 2. Validar que vengan lat y lng ===
if (!isset($data["lat"]) || !isset($data["lng"])) {
  http_response_code(400);
  echo "Faltan datos";
  exit;
}

// === 3. Guardar valores en variables ===
$lat = $data["lat"];
$lng = $data["lng"];
$timestamp = time();

// === 4. Guardar localmente SOLO las últimas 10 entradas en gps_log.txt (para depuración) ===
$log_file = "gps_log.txt";
$nueva_linea = date("Y-m-d H:i:s") . " → $lat,$lng\n";

// Leer contenido actual del archivo (si existe)
$lineas = file_exists($log_file) ? file($log_file, FILE_IGNORE_NEW_LINES) : [];

// Agregar nueva línea
$lineas[] = $nueva_linea;

// Conservar solo las últimas 10 líneas
if (count($lineas) > 10) {
  $lineas = array_slice($lineas, -10);
}

// Escribir de nuevo al archivo
file_put_contents($log_file, implode("\n", $lineas) . "\n");

// === 5. Obtener las ubicaciones actuales desde Firebase (ubicaciones.json) ===
$firebase_url = "https://sigue-tu-ruta-tepatitlan-default-rtdb.firebaseio.com/ubicaciones.json";

$ch = curl_init($firebase_url);
curl_setopt($ch, CURLOPT_RETURNTRANSFER, true);
$response = curl_exec($ch);
curl_close($ch);

// Decodificar las ubicaciones actuales
$ubicaciones = json_decode($response, true);
if (!$ubicaciones) $ubicaciones = [];

// === 6. Agregar nueva coordenada al final del arreglo ===
$ubicaciones[] = [
  "lat" => $lat,
  "lng" => $lng,
  "timestamp" => $timestamp
];

// === 7. Limitar a solo las últimas 10 coordenadas ===
if (count($ubicaciones) > 10) {
  $ubicaciones = array_slice($ubicaciones, -10); // Conservar últimas 10
}

// === 8. Reenviar el arreglo completo actualizado a Firebase ===
$payload = json_encode($ubicaciones);

$ch = curl_init($firebase_url);
curl_setopt($ch, CURLOPT_CUSTOMREQUEST, "PUT"); // Reemplaza toda la lista
curl_setopt($ch, CURLOPT_POSTFIELDS, $payload);
curl_setopt($ch, CURLOPT_RETURNTRANSFER, true);
curl_setopt($ch, CURLOPT_HTTPHEADER, [
  "Content-Type: application/json",
  "Content-Length: " . strlen($payload)
]);

$result = curl_exec($ch);
$httpcode = curl_getinfo($ch, CURLINFO_HTTP_CODE);
curl_close($ch);

// === 9. Confirmar resultado ===
if ($httpcode === 200) {
  echo "OK";
} else {
  http_response_code(500);
  echo "Error al reenviar a Firebase. Código: $httpcode";
}
?>
