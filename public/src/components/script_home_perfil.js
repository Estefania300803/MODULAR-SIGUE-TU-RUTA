function mostrarFormulario(tipo) {
    // Obtener el contenedor del formulario
    let formContainer = document.getElementById("formulario-container");

    // Limpiar cualquier formulario anterior antes de abrir uno nuevo
    formContainer.innerHTML = "";

    let container = document.createElement("div");
    container.classList.add("correo"); // Agregar clase para los estilos

    if (tipo === "correo") {
        container.innerHTML = `
            <div class="layotcorreo">
                <label for="Titulocorreo">Correo:</label>
                <input type="email" id="email" name="email" value="Emanuel@gmail.com"> 
                <div>
                    <button class="boton-cancelar" onclick="cerrarFormulario()">Cancelar</button>
                    <button class = "boton-guardar" onclick="guardarCorreo()">Guardar</button>
                </div>
            </div>
        `;
    } else if (tipo === "seguridad") {
        container.innerHTML = `
            <div class="layotseguridad">
                <label for="Tituloseguridad">Contraseña actual:</label>
                <input type="password" id="actual">
                
                <label for="Tituloseguridad">Nueva contraseña:</label>
                <input type="password" id="nueva">

                <label style="left: -18%;" for="Tituloseguridad">Confirmar contraseña:</label>
                <input type="password" id="confirmar">

                <div class = "botones-container">
                    <button class="boton-cancelar"  onclick="cerrarFormulario()">Cancelar</button>
                    <button class ="boton-guardar" onclick="guardarPassword()">Guardar</button>
                </div>
            </div>
        `;
    }

    //Insertar el nuevo formulario 
    formContainer.appendChild(container);
}

//Función para cerrar el formulario cuando se presiona cancelar
function cerrarFormulario() {
    let formContainer = document.getElementById("formulario-container");
    formContainer.innerHTML = ""; // Vacía el contenedor
}

//Función para guardar el correo solo es provicional
function guardarCorreo() {
    let email = document.getElementById("email").value;
    alert("Correo guardado: " + email);
    cerrarFormulario();
}

//Función para guardar la nueva contraseña solo es provicional
function guardarPassword() {
    let nueva = document.getElementById("nueva").value;
    let confirmar = document.getElementById("confirmar").value;
    
    if (nueva === confirmar) {
        alert("Contraseña guardada correctamente");
        cerrarFormulario();
    } else {
        alert("Las contraseñas no coinciden");
    }
}
