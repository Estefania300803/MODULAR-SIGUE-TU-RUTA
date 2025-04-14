document.addEventListener("DOMContentLoaded", function () {
    const map = L.map('mi_mapa').setView([20.8097, -102.7582], 15);
  
    L.tileLayer('https://tile.openstreetmap.org/{z}/{x}/{y}.png', {
      attribution: '&copy; OpenStreetMap contributors'
    }).addTo(map);
  
    L.marker([20.8097, -102.7582])
      .addTo(map)
      .bindPopup("Plaza Principal de Tepatitlán");
  
    // Puedes agregar más marcadores o rutas aquí
  });
  