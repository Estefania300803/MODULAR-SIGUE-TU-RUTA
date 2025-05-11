<?php
// Leer el cuerpo de la petición y decodificar JSON
$data = json_decode(file_get_contents("php://input"), true);

// Validar que vengan lat y lng
if (!isset($data["lat"]) || !isset($data["lng"])) {
  http_response_code(400);
  echo "Faltan datos";
  exit;
}

$lat = $data["lat"];
$lng = $data["lng"];
$timestamp = time();

// Guardar localmente en gps_log.txt (opcional para depuración)
file_put_contents("gps_log.txt", date("Y-m-d H:i:s") . " → $lat,$lng\n", FILE_APPEND);

// === 1. Obtener los datos actuales de Firebase ===
$firebase_url = "https://sigue-tu-ruta-tepatitlan-default-rtdb.firebaseio.com/ubicaciones.json"; // Cambió de /ubicacion a /ubicaciones

$ch = curl_init($firebase_url);
curl_setopt($ch, CURLOPT_RETURNTRANSFER, true);
$response = curl_exec($ch);
curl_close($ch);

$ubicaciones = json_decode($response, true);
if (!$ubicaciones) $ubicaciones = [];

// === 2. Agregar nueva coordenada al final ===
$ubicaciones[] = [
  "lat" => $lat,
  "lng" => $lng,
  "timestamp" => $timestamp
];

// === 3. Mantener solo los últimos 10 ===
if (count($ubicaciones) > 10) {
  $ubicaciones = array_slice($ubicaciones, -10); // Últimos 10
}

// === 4. Reenviar a Firebase ===
$payload = json_encode($ubicaciones);

$ch = curl_init($firebase_url);
curl_setopt($ch, CURLOPT_CUSTOMREQUEST, "PUT"); // Reemplaza toda la lista con los últimos 10
curl_setopt($ch, CURLOPT_POSTFIELDS, $payload);
curl_setopt($ch, CURLOPT_RETURNTRANSFER, true);
curl_setopt($ch, CURLOPT_HTTPHEADER, [
  "Content-Type: application/json",
  "Content-Length: " . strlen($payload)
]);

$result = curl_exec($ch);
$httpcode = curl_getinfo($ch, CURLINFO_HTTP_CODE);
curl_close($ch);

if ($httpcode === 200) {
  echo "OK";
} else {
  http_response_code(500);
  echo "Error al reenviar a Firebase. Código: $httpcode";
}
?>
