import { fromLonLat } from 'ol/proj'
import { Feature } from 'ol'
import { Point } from 'ol/geom'
import { Style, Icon } from 'ol/style'
import VectorLayer from 'ol/layer/Vector'
import VectorSource from 'ol/source/Vector'

export async function agregarMarcadoresAlMapa(map) {
  try {
    const response = await fetch('/frontend/public/data/puntos.json')
    const puntos = await response.json()

    const features = puntos.map((punto) => {
      const feature = new Feature({
        geometry: new Point(fromLonLat(punto.coords)),
        nombre: punto.nombre,
        id: punto.id,
      })

      feature.setStyle(
        new Style({
          image: new Icon({
            src: punto.icono,
            anchor: [0.5, 1],
            scale: 0.5,
          }),
        }),
      )

      return feature
    })

    const capaMarcadores = new VectorLayer({
      source: new VectorSource({ features }),
    })

    map.addLayer(capaMarcadores)
  } catch (error) {
    console.error('Error al cargar los marcadores:', error)
  }
}
