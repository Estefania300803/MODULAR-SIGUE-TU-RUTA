document.addEventListener("DOMContentLoaded", function() {
    // permite que el modal se abra en politicas
    document.getElementById("openModal").addEventListener("click", function(event) {
        event.preventDefault();
        var myModal = new bootstrap.Modal(document.getElementById("Modalpolitica"));
        myModal.show();
    });

    // Habilita o deshabilita el botón "Continuar" según el estado del checkbox en el modal de politicas
    document.getElementById("termsCheckbox").addEventListener("change", function() {
        document.getElementById("continueButton").disabled = !this.checked;
    });

    // abre el modal de terminos
    document.getElementById("abremodal").addEventListener("click", function(event) {
        event.preventDefault();
        var myModal = new bootstrap.Modal(document.getElementById("Modalterminos"));
        myModal.show();
    });

    // Habilita o deshabilita el botón "Continuar" según el estado del checkbox en el modal de Terminos
    document.getElementById("check").addEventListener("change", function() {
        document.getElementById("continua2").disabled = !this.checked;
    });

    // Habilita o deshabilita el botón "Continuar" según el estado del checkbox en la pantalla principal
    document.getElementById("Checkboxprincipal").addEventListener("change", function() {
        document.getElementById("botoncontinuar").disabled = !this.checked;
    });
});
