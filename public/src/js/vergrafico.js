// ************************************************************
//  FUNCIÓN mostrarImagen(ruta)
// ************************************************************
//  Esta función muestra el gráfico de una ruta de dos formas
//  dependiendo del tamaño de pantalla:
//
//  - En móvil (< 768px de ancho):
//      * Abre un modal Bootstrap con la imagen de la ruta.
//      * Inicializa Panzoom sobre la imagen para permitir zoom y movimiento.
//  - En pantallas grandes:
//      * Alterna entre ver la LISTA de paradas (accordion)
//        y ver la IMAGEN de la ruta en grande.
//      * Cuando muestra la imagen, también inicializa Panzoom.
//
//  Parámetro:
//    - ruta: string que representa el id base de la ruta (ej. "C01", "C02").
// ************************************************************
function mostrarImagen(ruta) {
    // Determina si el dispositivo es móvil según el ancho de la ventana
    const isMobile = window.innerWidth < 768;

    // Referencia a la imagen dentro del modal (vista móvil)
    const imgModal = document.getElementById('modalImage');
    // Instancia del modal de Bootstrap asociado al contenedor 'imagenModal'
    const modal = new bootstrap.Modal(document.getElementById('imagenModal'));

    // ----------------------------------------------------------
    // Comportamiento en móviles: mostrar la imagen dentro de un modal
    // ----------------------------------------------------------
    if (isMobile) {
        // Establece la ruta de la imagen a mostrar dentro del modal
        imgModal.src = `./assets/imagenes/${ruta}.png`;

        // Cuando la imagen termina de cargarse...
        imgModal.onload = () => {
            // Muestra el modal con la imagen
            modal.show();

            // Pequeño retraso para asegurar que la imagen está renderizada
            setTimeout(() => {
                // Si todavía no se ha inicializado Panzoom sobre esta imagen
                if (!imgModal.panzoomInstance) {
                    // Crea una instancia de Panzoom para permitir zoom y desplazamiento
                    const panzoom = Panzoom(imgModal, {
                        maxScale: 10,      // Zoom máximo
                        minScale: 0.1,     // Zoom mínimo (permite hacer mucho zoom out)
                        startScale: 0.2,   // Escala inicial
                        contain: 'outside' // Comportamiento del contenedor
                    });
                    // Guarda la instancia para no volver a crearla
                    imgModal.panzoomInstance = panzoom;
                    // Permite que la rueda del mouse controle el zoom
                    imgModal.parentElement.addEventListener('wheel', panzoom.zoomWithWheel);
                }
            }, 300);
        };
    } else {
        // ------------------------------------------------------
        // Comportamiento en escritorio: alternar lista <-> gráfico
        // ------------------------------------------------------

        // Obtiene el número de ruta quitando el primer carácter (ej. "C01" -> "01")
        const numero = ruta.slice(1);

        // Elemento que contiene la lista/accordion de la ruta (paradas, info, etc.)
        const lista = document.getElementById(`accordion${ruta}`);
        // Elemento <img> donde se mostrará el gráfico de la ruta en escritorio
        const imagen = document.getElementById(`rutac${numero}-imagen`);
        // Botón que alterna entre "Ver gráfico" y "Ver lista"
        const btn = document.getElementById(`btn${ruta}`);

        // Si la lista existe y actualmente está visible (display distinto de 'none')
        if (lista && lista.style.display !== 'none') {
            // Oculta la lista
            lista.style.display = 'none';

            if (imagen) {
                // Muestra la imagen de la ruta
                imagen.style.display = 'block';
                // Establece la ruta de la imagen
                imagen.src = `./assets/imagenes/${ruta}.png`;

                // Retraso para asegurarse de que la imagen se renderiza antes de Panzoom
                setTimeout(() => {
                    // Solo inicializa Panzoom una vez
                    if (!imagen.panzoomInstance) {
                        const panzoom = Panzoom(imagen, {
                            maxScale: 5,       // Zoom máximo menor que en móvil
                            minScale: 1,       // No permite hacer zoom out por debajo de 1
                            contain: 'outside' // Comportamiento del contenedor
                        });
                        // Guarda la instancia para reutilizarla
                        imagen.panzoomInstance = panzoom;
                        // Asocia zoom con la rueda del mouse sobre el contenedor
                        imagen.parentElement.addEventListener('wheel', panzoom.zoomWithWheel);
                    }
                }, 300);
            }

            // Cambia el texto del botón para volver a ver la lista de la ruta
            btn.innerHTML = `<i class="bi bi-arrow-left-right me-1"></i> Ver lista de la ruta`;
        } else {
            // Caso contrario: la lista está oculta o no hay imagen visible,
            // así que se vuelve a mostrar la lista y se oculta el gráfico.

            if (lista) lista.style.display = 'block';
            if (imagen) imagen.style.display = 'none';

            // Cambia el texto del botón para ver el gráfico de la ruta
            btn.innerHTML = `<i class="bi bi-map me-1"></i> Ver gráfico de la ruta`;
        }
    }
}
