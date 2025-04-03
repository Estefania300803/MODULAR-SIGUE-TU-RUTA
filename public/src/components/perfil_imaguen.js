const storage = getStorage(app); // Inicializar el almacenamiento
const inputImagen = document.getElementById('inputImagen');
const imagenPerfil = document.getElementById('imagenPerfil');

inputImagen.addEventListener('change', async (event) => {
    const archivo = event.target.files[0];  // Obtiene el archivo seleccionado
    if (archivo) {
        const reader = new FileReader();
        
        // Lee el archivo y lo carga en el <img>
        reader.onload = async function(e) {
            imagenPerfil.src = e.target.result;  // Cambia la imagen mostrada
            
            // Subir la imagen a Firebase Storage
            const storageRef = ref(storage, 'perfil-imagenes/' + archivo.name);  // Ruta en Firebase Storage
            await uploadBytes(storageRef, archivo);  // Subir archivo

            // Obtener la URL de la imagen subida
            const downloadURL = await getDownloadURL(storageRef);

            // Aquí puedes actualizar la base de datos con la URL de la imagen
            await actualizarPerfilEnFirestore(downloadURL);
        };
        
        reader.readAsDataURL(archivo);  // Convierte la imagen a una URL base64
    }
});
