// ************************************************************
//  CONTROL DE SIDEBAR LATERAL Y MENÚ DE USUARIO
// ************************************************************
//  Este archivo hace dos cosas principales:
//
//  1) Maneja la apertura/cierre del sidebar lateral:
//      - Cuando se hace clic en el botón con id="menu",
//        alterna la clase 'active' en el elemento <aside>.
//
//  2) Maneja el menú desplegable de usuario (user-menu):
//      - Abre/cierra el menú de usuario.
//      - Muestra/oculta un overlay de fondo para oscurecer la pantalla.
// ************************************************************

// Obtiene el elemento <aside> (barra lateral) y el botón del menú principal
const aside = document.getElementById('aside'),
    menu = document.getElementById('menu');

// Cuando el usuario hace clic en el botón con id="menu"
menu.onclick = () => {
    // Alterna la clase 'active' en el <aside>.
    // Si el aside no tiene 'active', se la agrega (se muestra / se expande).
    // Si ya la tiene, se la quita (se oculta / se colapsa).
    aside.classList.toggle('active');
};

// ************************************************************
//  FUNCIÓN toggleMenu()
// ************************************************************
//  Controla el menú de usuario (generalmente el menú del perfil).
//  - Alterna la clase 'active' en:
//      * El menú de usuario (id="user-menu").
//      * El overlay de fondo (id="menu-overlay").
//  Esto se suele usar para un menú flotante tipo dropdown
//  o panel que aparece sobre el contenido.
//
//  Esta función normalmente se llama desde el HTML, por ejemplo:
//      onclick="toggleMenu()"
// ************************************************************
function toggleMenu() {
    // Elemento que contiene el menú de usuario (opciones: perfil, salir, etc.)
    var menu = document.getElementById("user-menu");
    // Elemento overlay que oscurece el fondo cuando el menú está abierto
    var overlay = document.getElementById("menu-overlay");

    // Si el menú ya está activo (visible)...
    if (menu.classList.contains("active")) {
        // ...lo cerramos removiendo la clase 'active'
        menu.classList.remove("active");
        // ...y también ocultamos el overlay
        overlay.classList.remove("active");
    } else {
        // Si el menú NO está activo, lo abrimos agregando la clase 'active'
        menu.classList.add("active");
        // Y mostramos el overlay para oscurecer el resto de la pantalla
        overlay.classList.add("active");
    }
}
// ************************************************************