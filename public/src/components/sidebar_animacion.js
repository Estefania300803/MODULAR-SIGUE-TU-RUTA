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