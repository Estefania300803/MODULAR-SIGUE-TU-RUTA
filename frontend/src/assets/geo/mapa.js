import 'ol/ol.css'
import Map from 'ol/Map'
import View from 'ol/View'
import TileLayer from 'ol/layer/Tile'
import OSM from 'ol/source/OSM'
import { fromLonLat } from 'ol/proj'

export function crearMapa(container) {
  return new Map({
    target: container,
    layers: [new TileLayer({ source: new OSM() })],
    view: new View({
      center: fromLonLat([-102.76488, 20.80909]),
      zoom: 13,
      projection: 'EPSG:3857',
    }),
  })
}
