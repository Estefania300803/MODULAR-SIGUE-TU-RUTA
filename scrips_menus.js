function toggleMenu() {
    var menu = document.getElementById("user-menu");
    var overlay = document.getElementById("menu-overlay");

    if (menu.classList.contains("active")) {
        menu.classList.remove("active");
        overlay.classList.remove("active");
    } else {
        menu.classList.add("active");
        overlay.classList.add("active");
    }
}

// Asegurar que los eventos se carguen después de que el DOM esté listo
document.addEventListener("DOMContentLoaded", function () {
    document.getElementById("btn-user").addEventListener("click", toggleMenu);
    document.getElementById("menu-overlay").addEventListener("click", toggleMenu);
});
