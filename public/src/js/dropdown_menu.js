// ************************************************************
//  CONTROL DE VISIBILIDAD DE RUTAS EN EL MAPA (ICONO OJO)
// ************************************************************
//  Este script hace lo siguiente:
//    - Espera a que el DOM esté cargado.
//    - Busca todos los elementos con la clase .toggle-ruta (iconos de ojo).
//    - Al hacer clic en uno de ellos:
//        * Evita el comportamiento por defecto del enlace.
//        * Evita que el clic se propague a otros manejadores.
//        * Cambia el icono entre "ojo abierto" y "ojo tachado".
//        * Muestra u oculta la polyline correspondiente en el mapa Leaflet.
//    - La función toggleIcon(element) se encarga de alternar las clases
//      de Bootstrap Icons: bi-eye <-> bi-eye-slash.
// ************************************************************

document.addEventListener('DOMContentLoaded', function () {
    // Cuando el documento termine de cargar, se seleccionan
    // todos los elementos que tengan la clase .toggle-ruta
    document.querySelectorAll('.toggle-ruta').forEach(icon => {
        // Por cada icono encontrado se agrega un listener de click
        icon.addEventListener('click', function (event) {
            // Evita que el enlace (si lo es) haga scroll o cambie de página
            event.preventDefault();
            // Evita que el evento se propague a otros elementos padres
            event.stopPropagation();

            // Alterna la apariencia del icono (ojo abierto / ojo cerrado)
            toggleIcon(this);

            // Obtiene el identificador de ruta desde el atributo data-ruta
            const rutaId = this.getAttribute('data-ruta');
            let polyline;

            // Según el ID de ruta, se asigna la polyline correspondiente
            // (polyC01, polyC02 deben estar definidas en otro archivo JS)
            if (rutaId === "C01") {
                polyline = polyC01;
            } else if (rutaId === "C02") {
                polyline = polyC02;
            }

            // Si se encontró una polyline válida
            if (polyline) {
                // Si la ruta ya está dibujada en el mapa, se remueve
                if (map.hasLayer(polyline)) {
                    map.removeLayer(polyline);
                } else {
                    // Si no está en el mapa, se agrega
                    polyline.addTo(map);
                }
            }
        });
    });
});

// ************************************************************
//  toggleIcon(element)
// ************************************************************
//  Cambia el icono de ojo de Bootstrap:
//    - Si tiene bi-eye, lo cambia a bi-eye-slash.
//    - Si tiene bi-eye-slash, lo cambia a bi-eye.
//  Esto da feedback visual al usuario sobre si la ruta está
//  visible o no en el mapa.
// ************************************************************
function toggleIcon(element) {
    if (element.classList.contains('bi-eye')) {
        // Si el icono es "ojo abierto", se cambia a "ojo tachado"
        element.classList.remove('bi-eye');
        element.classList.add('bi-eye-slash');
    } else {
        // Si el icono es "ojo tachado", se regresa a "ojo abierto"
        element.classList.remove('bi-eye-slash');
        element.classList.add('bi-eye');
    }
}
