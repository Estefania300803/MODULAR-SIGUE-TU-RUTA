// Abrir el menú
document.getElementById('open-menu-btn').addEventListener('click', function() {
    document.getElementById('side-menu').style.width = '290px';
    this.style.display = 'none';  // Ocultar el botón
});

// Cerrar el menú
document.getElementById('close-menu-btn').addEventListener('click', function() {
    document.getElementById('side-menu').style.width = '0';
    document.getElementById('open-menu-btn').style.display = 'block';  // Mostrar el botón nuevamente
});

//menu 2
const toggleButton = document.getElementById('toggleList');
  const listContainer = document.getElementById('listContainer');

  toggleButton.addEventListener('click', () => {
    listContainer.classList.toggle('show');
  });