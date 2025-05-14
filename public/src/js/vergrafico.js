function mostrarImagen(ruta) {
    const isMobile = window.innerWidth < 768;

    if (isMobile) {
        document.getElementById('modalImage').src = `./assets/imagenes/${ruta}.png`;
        const myModal = new bootstrap.Modal(document.getElementById('imagenModal'));
        myModal.show();
    } else {
        const numero = ruta.slice(1); // "01" de "C01"
        const lista = document.getElementById(`accordion${ruta}`);
        const imagen = document.getElementById(`rutac${numero}-imagen`);
        const btn = document.getElementById(`btn${ruta}`);

        if (lista && lista.style.display !== 'none') {
            lista.style.display = 'none';
            if(imagen) imagen.style.display = 'block';
            btn.innerHTML = `<i class="bi bi-arrow-left-right me-1"></i> Ver lista de la ruta`;
        } else {
            if (lista) lista.style.display = 'block';
            if (imagen) imagen.style.display = 'none';
            btn.innerHTML = `<i class="bi bi-map me-1"></i> Ver gráfico de la ruta`;
        }
    }
}


