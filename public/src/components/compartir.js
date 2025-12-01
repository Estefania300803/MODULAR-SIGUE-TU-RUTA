// ************************************************************
//  BOTÓN "COMPARTIR" - API Web Share
// ************************************************************
//  Este script:
//    - Escucha el clic en el botón con id "btn-compartir".
//    - Construye un objeto shareData con:
//        * title: título de la pestaña actual (document.title)
//        * text: texto fijo "Sifue tu Ruta"
//        * url: la URL actual de la página (window.location.href)
//    - Si el navegador soporta navigator.share:
//        * Abre el diálogo nativo de compartir (móvil o navegador compatible).
//    - Si NO lo soporta:
//        * Muestra un alert avisando que no se puede usar la función.
// ************************************************************

document.getElementById('btn-compartir').addEventListener('click', async () => {
  // Objeto con la información que se quiere compartir
  const shareData = {
    title: document.title,        // Título de la página actual
    text: 'Sifue tu Ruta',        // Texto descriptivo que acompaña al enlace
    url: window.location.href     // URL actual de la ventana
  };

  // Verifica si el navegador soporta la API Web Share
  if (navigator.share) {
    try {
      // Abre el diálogo nativo de compartir con los datos definidos
      await navigator.share(shareData);
      console.log('Contenido compartido con éxito');
    } catch (error) {
      // Si el usuario cancela o ocurre un error, se muestra en consola
      console.error('Error al compartir:', error);
    }
  } else {
    // Si el navegador no soporta navigator.share, se avisa al usuario
    alert('Tu navegador no soporta la función de compartir.');
  }
});
