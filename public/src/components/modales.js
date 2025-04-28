document.addEventListener("DOMContentLoaded", function() {
    // permite que el modal se abra en politicas
    document.getElementById("openModal").addEventListener("click", function(event) {
        event.preventDefault();
        var myModal = new bootstrap.Modal(document.getElementById("Modalpolitica"));
        myModal.show();
    });

    // abre el modal de terminos
    document.getElementById("abremodal").addEventListener("click", function(event) {
        event.preventDefault();
        var myModal = new bootstrap.Modal(document.getElementById("Modalterminos"));
        myModal.show();
    });

    // Habilita o deshabilita el botón "Continuar" según el estado del checkbox en la pantalla principal
    document.getElementById("Checkboxprincipal").addEventListener("change", function() {
        document.getElementById("botoncontinuar").disabled = !this.checked;
    });
});

//Modal de como llegar

document.addEventListener("DOMContentLoaded", function () {
    const btnLlegar = document.getElementById("btnllegar");
    const overlay = document.getElementById("como-llegar-overlay");
    const form = document.getElementById("como-llegar-form");

    // Verifica si los elementos existen antes de agregar eventos
    if (btnLlegar && overlay && form) {

        // Función para abrir/cerrar modal
        function toggleComoLlegarModal() {
            overlay.classList.toggle("active");
            document.body.classList.toggle("modal-open");
        }

        // Abrir modal
        btnLlegar.addEventListener("click", toggleComoLlegarModal);

        // Cerrar al hacer clic fuera del modal
        overlay.addEventListener("click", (e) => {
            if (e.target === overlay) toggleComoLlegarModal();
        });

        // Manejar envío del formulario
        form.addEventListener("submit", (e) => {
            e.preventDefault();
            const origen = document.getElementById("origen").value;
            const destino = document.getElementById("destino").value;

            alert(`Buscando ruta desde "${origen}" hasta "${destino}"`);
            toggleComoLlegarModal();
        });
    } else {
        console.error("Uno o más elementos no fueron encontrados en el DOM");
    }
});
