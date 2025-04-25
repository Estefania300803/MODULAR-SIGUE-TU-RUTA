document.addEventListener('DOMContentLoaded', function() {
    document.querySelectorAll('.toggle-ruta').forEach(icon => {
        icon.addEventListener('click', function(event) {
            event.preventDefault();
            event.stopPropagation();

            toggleIcon(this);

            const rutaId = this.getAttribute('data-ruta');

            // Validar si es la ruta C02 y que map y polyline existan
            if (rutaId === "C02" && typeof map !== 'undefined' && typeof polyline !== 'undefined') {
                if (map.hasLayer(polyline)) {
                    map.removeLayer(polyline);
                } else {
                    polyline.addTo(map);
                }
            }
        });
    });
});

function toggleIcon(element) {
    if (element.classList.contains('bi-eye')) {
        element.classList.remove('bi-eye');
        element.classList.add('bi-eye-slash');
    } else {
        element.classList.remove('bi-eye-slash');
        element.classList.add('bi-eye');
    }
}
