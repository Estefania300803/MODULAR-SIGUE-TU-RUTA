// Obtener elementos del DOM
const toggleMenuBtn = document.querySelector('button[onclick="toggleMenu2()"]');  // Seleccionamos el botón
const menu = document.getElementById("user-menu2");  // Seleccionamos el menú

// Lógica para abrir y cerrar el menú
toggleMenuBtn.addEventListener('click', () => {
    toggleMenu2();
});

// Función para mostrar u ocultar el menú
function toggleMenu2() {
    // Verificamos si el menú ya tiene la clase 'active'
    if (menu.classList.contains("active")) {
        // Si tiene la clase 'active', la eliminamos (cerramos el menú)
        menu.classList.remove("active");
    } else {
        // Si no tiene la clase 'active', la añadimos (abrimos el menú)
        menu.classList.add("active");
    }
}
