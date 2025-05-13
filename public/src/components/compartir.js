document.getElementById('btn-compartir').addEventListener('click', async () => {
    const shareData = {
      title: document.title,
      text: 'Sifue tu Ruta',
      url: window.location.href
    };

    if (navigator.share) {
      try {
        await navigator.share(shareData);
        console.log('Contenido compartido con éxito');
      } catch (error) {
        console.error('Error al compartir:', error);
      }
    } else {
      alert('Tu navegador no soporta la función de compartir.');
    }
  });