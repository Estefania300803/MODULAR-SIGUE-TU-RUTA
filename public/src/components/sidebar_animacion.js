document.addEventListener("DOMContentLoaded", function () {
    const sidebar = document.getElementById("sidebar");

    if (sidebar) {
        sidebar.addEventListener("mouseenter", () => {
            sidebar.classList.add("expanded");
        });

        sidebar.addEventListener("mouseleave", () => {
            sidebar.classList.remove("expanded");
        });
    } else {
        console.error("Error: No se encontró el elemento #sidebar en el DOM.");
    }
});

document.addEventListener("DOMContentLoaded", function() {
    const currentPath = window.location.pathname.split('/').pop();  // Obtiene el nombre del archivo
    const menuItems = document.querySelectorAll('.sidebar .menu-item a');

    menuItems.forEach(item => {
        const href = item.getAttribute('href');
        if (href === currentPath) {
        item.parentElement.classList.add('active');  // Agrega la clase al <li>
        }
    });
    });