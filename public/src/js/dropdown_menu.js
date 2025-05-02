document.addEventListener('DOMContentLoaded', function() {
    document.querySelectorAll('.toggle-ruta').forEach(icon => {
        icon.addEventListener('click', function(event) {
            event.preventDefault();
            event.stopPropagation();

            toggleIcon(this);

            const rutaId = this.getAttribute('data-ruta');
            let polyline;

            if (rutaId === "C01") {
                polyline = polyC01;
            } else if (rutaId === "C02") {
                polyline = polyC02;
            }

            if (polyline) {
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
