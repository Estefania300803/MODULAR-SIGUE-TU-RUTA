// ************************************************************
//  MÓDULO DE MODALES - POLÍTICAS, TÉRMINOS Y "CÓMO LLEGAR"
// ************************************************************
//  Este archivo se encarga de:
//    1. Abrir los modales de Políticas y Términos usando Bootstrap.
//    2. Habilitar/deshabilitar el botón "Continuar" según un checkbox.
//    3. Controlar un modal personalizado de "Cómo llegar":
//       - Abrir/cerrar overlay.
//       - Cerrar haciendo clic fuera del contenido.
//       - Mostrar un mensaje (alert) al enviar el formulario.
// ************************************************************

// -------------------------------------------------------------------
//  BLOQUE 1: MODALES DE POLÍTICAS, TÉRMINOS Y BOTÓN "CONTINUAR"
// -------------------------------------------------------------------
document.addEventListener("DOMContentLoaded", function () {
    // Botón/enlace que abre el modal de POLÍTICAS
    document.getElementById("openModal").addEventListener("click", function (event) {
        event.preventDefault(); // Evita el comportamiento por defecto del enlace/botón
        // Crea una instancia del modal de Bootstrap asociado al id "Modalpolitica"
        var myModal = new bootstrap.Modal(document.getElementById("Modalpolitica"));
        // Muestra el modal en pantalla
        myModal.show();
    });

    // Botón/enlace que abre el modal de TÉRMINOS
    document.getElementById("abremodal").addEventListener("click", function (event) {
        event.preventDefault(); // Evita comportamiento por defecto
        // Crea una instancia del modal de Bootstrap asociado al id "Modalterminos"
        var myModal = new bootstrap.Modal(document.getElementById("Modalterminos"));
        // Muestra el modal en pantalla
        myModal.show();
    });

    // Checkbox principal de aceptación de políticas/términos
    // Cuando cambia su estado (checked / no checked) se habilita o deshabilita el botón "Continuar"
    document.getElementById("Checkboxprincipal").addEventListener("change", function () {
        // Si el checkbox está marcado (this.checked === true), el botón se habilita (disabled = false)
        // Si NO está marcado, el botón se deshabilita (disabled = true)
        document.getElementById("botoncontinuar").disabled = !this.checked;
    });
});


// -------------------------------------------------------------------
//  BLOQUE 2: MODAL PERSONALIZADO "CÓMO LLEGAR"
// -------------------------------------------------------------------
document.addEventListener("DOMContentLoaded", function () {
    // Botón que abrirá el modal de "cómo llegar"
    const btnLlegar = document.getElementById("btnllegar");
    // Overlay (capa oscura + contenedor del modal personalizado)
    const overlay = document.getElementById("como-llegar-overlay");
    // Formulario dentro del modal para capturar origen y destino
    const form = document.getElementById("como-llegar-form");

    // Verifica que existan los elementos antes de agregar eventos
    // Esto evita errores si el script se carga en páginas donde no están estos IDs.
    if (btnLlegar && overlay && form) {

        // --------------------------------------------------------
        // Función para abrir/cerrar el modal de "cómo llegar"
        // --------------------------------------------------------
        function toggleComoLlegarModal() {
            // Alterna la clase "active" en el overlay:
            //  - Si no la tiene, la agrega y el modal se muestra.
            //  - Si la tiene, la quita y el modal se oculta.
            overlay.classList.toggle("active");

            // Alterna la clase "modal-open" en el body:
            //  - Normalmente se usa para deshabilitar el scroll de fondo
            //    cuando el modal está abierto.
            document.body.classList.toggle("modal-open");
        }

        // --------------------------------------------------------
        // Abrir modal al hacer clic en el botón "¿Cómo llegar?"
        // --------------------------------------------------------
        btnLlegar.addEventListener("click", toggleComoLlegarModal);

        // --------------------------------------------------------
        // Cerrar modal al hacer clic fuera del contenido (en el overlay)
        // --------------------------------------------------------
        overlay.addEventListener("click", (e) => {
            // Si el clic fue directamente sobre el overlay (no sobre el contenido interno),
            // se cierra el modal llamando a la misma función toggle.
            if (e.target === overlay) toggleComoLlegarModal();
        });

        // --------------------------------------------------------
        // Manejar envío del formulario dentro del modal
        // --------------------------------------------------------
        form.addEventListener("submit", (e) => {
            e.preventDefault(); // Evita el envío real del formulario (no recarga la página)

            // Obtiene los valores escritos por el usuario
            const origen = document.getElementById("origen").value;
            const destino = document.getElementById("destino").value;

            // Muestra un mensaje temporal (placeholder) con la búsqueda de ruta
            // Aquí en un futuro podrías integrar Google Maps, Leaflet, etc.
            alert(`Buscando ruta desde "${origen}" hasta "${destino}"`);

            // Cierra el modal después de "enviar" la información
            toggleComoLlegarModal();
        });
    } else {
        // Si algunos de los elementos no existen en el DOM,
        // se muestra un error en consola para facilitar depuración.
        console.error("Uno o más elementos no fueron encontrados en el DOM");
    }
});
