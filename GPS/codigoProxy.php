<?php
// Lee el cuerpo de la petición HTTP y lo decodifica desde JSON a un arreglo
$data = json_decode(file_get_contents("php://input"), true);

// Verifica que el JSON tenga los campos "lat", "lng" y "ruta"
if (!isset($data["lat"]) || !isset($data["lng"]) || !isset($data["ruta"])) {
  http_response_code(400);  // Responde error 400 si falta algo
  echo "Faltan datos (lat, lng o ruta)";
  exit;  // Termina la ejecución
}

// Guarda la latitud, longitud y ruta recibidas en variables
$lat   = $data["lat"];
$lng   = $data["lng"];
$ruta  = $data["ruta"];      // Ejemplo: "C01" o "C02"
$timestamp = time();         // Guarda el tiempo actual en formato UNIX

// Opcional: sanitizar la ruta para evitar caracteres raros
$ruta = preg_replace('/[^A-Za-z0-9_-]/', '', $ruta);

// Si después de sanitizar la ruta queda vacía, marcar error
if ($ruta === "") {
  http_response_code(400);
  echo "Ruta inválida";
  exit;
}

// Define el archivo local donde se guardarán las últimas 3 coordenadas
$log_file = "gps_log.txt";
// Crea una línea con fecha/hora, ruta y las coordenadas
$nueva_linea = date("Y-m-d H:i:s") . " [$ruta] → $lat,$lng";

// Lee el archivo si existe, si no, crea un arreglo vacío
$lineas = file_exists($log_file)
  ? file($log_file, FILE_IGNORE_NEW_LINES | FILE_SKIP_EMPTY_LINES)
  : [];

// Agrega la nueva coordenada al arreglo
$lineas[] = $nueva_linea;

// Mantiene solo las últimas 3 líneas almacenadas
$lineas = array_slice($lineas, -3);

// Escribe ese contenido nuevamente en el archivo
file_put_contents($log_file, implode("\n", $lineas) . "\n");

// Prepara el JSON que se enviará a Firebase con lat, lng, timestamp y ruta
$payload = json_encode([
  "lat"       => $lat,
  "lng"       => $lng,
  "timestamp" => $timestamp,
  "ruta"      => $ruta   // Guardamos también la ruta en el nodo
]);

// URL base del Realtime Database de Firebase
$firebase_base = "https://sigue-tu-ruta-tepatitlan-default-rtdb.firebaseio.com";
// Ruta completa al nodo donde se guardan ubicaciones de ESA ruta
// Ejemplo: /ubicaciones/C01.json o /ubicaciones/C02.json
$firebase_url  = $firebase_base . "/ubicaciones/" . $ruta . ".json";

// Inicializa una conexión CURL apuntando a la URL de Firebase de esa ruta
$ch = curl_init($firebase_url);
// Indica que será una petición POST para insertar un nuevo hijo
curl_setopt($ch, CURLOPT_POST, true);
// Coloca el JSON que se enviará
curl_setopt($ch, CURLOPT_POSTFIELDS, $payload);
// Pide que devuelva la respuesta del servidor
curl_setopt($ch, CURLOPT_RETURNTRANSFER, true);
// Envía encabezados indicando que es JSON
curl_setopt($ch, CURLOPT_HTTPHEADER, [
  "Content-Type: application/json",
  "Content-Length: " . strlen($payload)
]);

// Ejecuta la petición POST
$result   = curl_exec($ch);
// Obtiene el código HTTP devuelto por Firebase
$httpcode = curl_getinfo($ch, CURLINFO_HTTP_CODE);
// Cierra la conexión CURL
curl_close($ch);

// Si Firebase respondió 200, la inserción fue exitosa
if ($httpcode === 200) {

  // Vuelve a leer todo el contenido del nodo /ubicaciones/{ruta}
  $ch = curl_init($firebase_url);
  curl_setopt($ch, CURLOPT_RETURNTRANSFER, true);
  $respUbicaciones = curl_exec($ch);
  curl_close($ch);

  // Decodifica las ubicaciones obtenidas de esa ruta
  $ubicaciones = json_decode($respUbicaciones, true);

  // Si lo obtenido es un arreglo válido, procede
  if (is_array($ubicaciones)) {

    // Verifica si hay más de 5 ubicaciones guardadas para esa ruta
    if (count($ubicaciones) > 5) {

      // Crea un arreglo temporal con la key y el timestamp de cada nodo
      $lista = [];
      foreach ($ubicaciones as $key => $dato) {
        $lista[] = [
          "key"       => $key,
          "timestamp" => isset($dato["timestamp"]) ? $dato["timestamp"] : 0
        ];
      }

      // Ordena las ubicaciones por timestamp (primero las más viejas)
      usort($lista, function($a, $b) {
        return $a["timestamp"] <=> $b["timestamp"];
      });

      // Calcula cuántas ubicaciones sobran (más de 5)
      $sobran = count($lista) - 5;

      // Obtiene las más viejas que deben borrarse
      $aBorrar = array_slice($lista, 0, $sobran);

      // Elimina cada ubicación vieja directamente en Firebase
      foreach ($aBorrar as $item) {
        $key = $item["key"];
        // Construye la URL de Firebase para eliminar un nodo específico de esa ruta
        // Ejemplo: /ubicaciones/C01/-Nkfjsd83jd.json
        $urlDelete = $firebase_base . "/ubicaciones/" . $ruta . "/$key.json";

        // Ejecuta una petición DELETE para borrar el nodo
        $ch = curl_init($urlDelete);
        curl_setopt($ch, CURLOPT_CUSTOMREQUEST, "DELETE");
        curl_setopt($ch, CURLOPT_RETURNTRANSFER, true);
        curl_exec($ch);
        curl_close($ch);
      }
    }
  }

  // Responde "OK" al cliente (ESP32)
  echo "OK";

} else {
  // Si Firebase respondió diferente de 200, es error del servidor
  http_response_code(500);
  echo "Error al enviar a Firebase. Código: $httpcode";
}
?>
