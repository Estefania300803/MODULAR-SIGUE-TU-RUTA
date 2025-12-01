// ************************************************************
//  MENÚ LATERAL DE RUTAS / SIMBOLOGÍA (MÓVIL / RESPONSIVO)
// ************************************************************
//  Este script controla:
//    1) Apertura y cierre de un menú lateral (side-menu) usando width:
//         - Botón con id="open-menu-btn" abre el menú.
//         - Botón con id="close-menu-btn" lo cierra.
//    2) Mostrar / ocultar una lista secundaria dentro del menú:
//         - Botón con id="toggleList" alterna la clase 'show' en listContainer.
// ************************************************************


// ------------------------------------------------------------
// 1. Abrir el menú lateral
// ------------------------------------------------------------
document.getElementById('open-menu-btn').addEventListener('click', function () {
  // Al hacer clic, se cambia el width del contenedor lateral a 290px,
  // lo que hace que el menú se deslice y se vea en pantalla.
  document.getElementById('side-menu').style.width = '290px';

  // Se oculta el botón de abrir mientras el menú está visible
  this.style.display = 'none';
});


// ------------------------------------------------------------
// 2. Cerrar el menú lateral
// ------------------------------------------------------------
document.getElementById('close-menu-btn').addEventListener('click', function () {
  // Al cerrar, se reduce el ancho del menú a 0, ocultándolo nuevamente.
  document.getElementById('side-menu').style.width = '0';

  // Se vuelve a mostrar el botón de abrir el menú
  document.getElementById('open-menu-btn').style.display = 'block';
});


// ------------------------------------------------------------
// 3. Mostrar / ocultar lista secundaria (menu 2)
// ------------------------------------------------------------
//  toggleButton: botón que controla el despliegue de la lista
//  listContainer: contenedor de la lista que se quiere mostrar/ocultar
const toggleButton = document.getElementById('toggleList');
const listContainer = document.getElementById('listContainer');

// Al hacer clic en el botón, se alterna la clase 'show' en el contenedor.
// Depende del CSS que tengas para '.show' (por ejemplo, display: block / none)
// para que la lista aparezca o desaparezca.
toggleButton.addEventListener('click', () => {
  listContainer.classList.toggle('show');
});
