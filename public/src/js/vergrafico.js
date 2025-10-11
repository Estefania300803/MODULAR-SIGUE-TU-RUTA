    function mostrarImagen(ruta) {
    const isMobile = window.innerWidth < 768;
    const imgModal = document.getElementById('modalImage');
    const modal = new bootstrap.Modal(document.getElementById('imagenModal'));

    if (isMobile) {
        imgModal.src = `./assets/imagenes/${ruta}.png`;

        imgModal.onload = () => {
        modal.show();

        setTimeout(() => {
            if (!imgModal.panzoomInstance) {
            const panzoom = Panzoom(imgModal, {
                maxScale: 10,
                minScale: 0.1, // Permite hacer zoom out
                startScale: 0.2,
                contain: 'outside',
            });
            imgModal.panzoomInstance = panzoom;
            imgModal.parentElement.addEventListener('wheel', panzoom.zoomWithWheel);
            }
        }, 300);
        };
    } else {
        const numero = ruta.slice(1);
        const lista = document.getElementById(`accordion${ruta}`);
        const imagen = document.getElementById(`rutac${numero}-imagen`);
        const btn = document.getElementById(`btn${ruta}`);

        if (lista && lista.style.display !== 'none') {
        lista.style.display = 'none';
        if (imagen) {
            imagen.style.display = 'block';
            imagen.src = `./assets/imagenes/${ruta}.png`;

            setTimeout(() => {
            if (!imagen.panzoomInstance) {
                const panzoom = Panzoom(imagen, {
                maxScale: 5,
                minScale: 1,
                contain: 'outside',
                });
                imagen.panzoomInstance = panzoom;
                imagen.parentElement.addEventListener('wheel', panzoom.zoomWithWheel);
            }
            }, 300);
        }

        btn.innerHTML = `<i class="bi bi-arrow-left-right me-1"></i> Ver lista de la ruta`;
        } else {
        if (lista) lista.style.display = 'block';
        if (imagen) imagen.style.display = 'none';
        btn.innerHTML = `<i class="bi bi-map me-1"></i> Ver gráfico de la ruta`;
        }
    }
    }
