document.addEventListener("DOMContentLoaded", () => {
    // Referencias a los elementos
    const cargarImagenButton = document.getElementById('cargarImagen');
    const inputImagen = document.getElementById('inputImagen');
    const imagenPerfil = document.getElementById('imagenPerfil');

    // Evento para mostrar el input de archivos al hacer clic en el botón
    cargarImagenButton.addEventListener('click', () => {
        inputImagen.click();  // Abre el explorador de archivos
    });

    // Evento para cargar la imagen seleccionada en el <img>
    inputImagen.addEventListener('change', (event) => {
        const archivo = event.target.files[0];  // Obtiene el archivo seleccionado
        if (archivo) {
            const reader = new FileReader();
            
            // Lee el archivo y lo carga en el <img>
            reader.onload = function(e) {
                imagenPerfil.src = e.target.result;
            };
            
            reader.readAsDataURL(archivo);  // Convierte la imagen a una URL base64
        }
    });
});
