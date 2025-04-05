import GeoJSON from 'ol/format/GeoJSON'
import VectorLayer from 'ol/layer/Vector'
import VectorSource from 'ol/source/Vector'
import { Style, Stroke, Circle as CircleStyle, Fill } from 'ol/style'
import { Feature } from 'ol'
import { Point } from 'ol/geom'
import { getVectorContext } from 'ol/render'

export function agregarRutaAlMapa(map) {
  fetch('/frontend/public/data/route.geojson')
    .then((res) => res.json())
    .then((geojson) => {
      const format = new GeoJSON()
      const features = format.readFeatures(geojson, {
        dataProjection: 'EPSG:4326',
        featureProjection: 'EPSG:3857',
      })

      const routeFeature = features[0]
      const routeGeometry = routeFeature.getGeometry()

      const geoMarker = new Feature({
        type: 'geoMarker',
        geometry: new Point(routeGeometry.getFirstCoordinate()),
      })

      const styles = {
        route: new Style({
          stroke: new Stroke({ color: '#FF0000', width: 4 }),
        }),
        geoMarker: new Style({
          image: new CircleStyle({
            radius: 6,
            fill: new Fill({ color: 'black' }),
            stroke: new Stroke({ color: 'white', width: 2 }),
          }),
        }),
      }

      const source = new VectorSource({
        features: [routeFeature, geoMarker],
      })

      const layer = new VectorLayer({
        source,
        style: (feature) => styles[feature.get('type')] || styles.route,
      })

      map.addLayer(layer)

      let animando = false
      let distancia = 0
      let tiempoAnterior
      const velocidad = 15

      function moverPunto(event) {
        const tiempo = event.frameState.time
        const delta = tiempo - tiempoAnterior
        distancia = (distancia + (velocidad * delta) / 1e6) % 2
        tiempoAnterior = tiempo

        const coordActual = routeGeometry.getCoordinateAt(distancia > 1 ? 2 - distancia : distancia)
        geoMarker.setGeometry(new Point(coordActual))

        const ctx = getVectorContext(event)
        ctx.setStyle(styles.geoMarker)
        ctx.drawGeometry(geoMarker.getGeometry())
        map.render()
      }

      function iniciarAnimacion() {
        animando = true
        tiempoAnterior = Date.now()
        layer.on('postrender', moverPunto)
        geoMarker.setGeometry(null)
        map.render()
      }

      function detenerAnimacion() {
        animando = false
        geoMarker.setGeometry(routeGeometry.getLastCoordinate())
        layer.un('postrender', moverPunto)
        map.render()
      }

      const btn = document.createElement('button')
      btn.textContent = 'Iniciar animación'
      btn.style.position = 'absolute'
      btn.style.top = '10px'
      btn.style.left = '10px'
      btn.style.zIndex = 9999
      document.body.appendChild(btn)

      btn.addEventListener('click', () => {
        if (animando) {
          detenerAnimacion()
          btn.textContent = 'Iniciar animación'
        } else {
          iniciarAnimacion()
          btn.textContent = 'Detener animación'
        }
      })
    })
    .catch((err) => {
      console.error('Error al cargar la ruta:', err)
    })
}
