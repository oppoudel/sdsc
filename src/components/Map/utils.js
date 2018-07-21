import { loadModules } from 'esri-loader'
import { bpdApp } from './mapConfig'

//Get lat, long using geolocation API
const options = {
  enableHighAccuracy: true,
  timeout: 5000,
  maximumAge: 0
}

export const getGeolocation = callback => {
  window.navigator.geolocation.getCurrentPosition(
    pos => callback([pos.coords.longitude, pos.coords.latitude]),
    err => console.warn(err.message),
    options
  )
}

export const addPoint = (x, y) => {
  loadModules(['esri/Graphic', 'esri/layers/GraphicsLayer']).then(
    ([Graphic, GraphicsLayer]) => {
      let { esriMap, mapView } = bpdApp
      esriMap.removeAll()
      const point = {
        type: 'point',
        x: x,
        y: y
      }
      const marker = {
        type: 'simple-marker',
        color: [0, 123, 255]
      }
      const pointGraphic = new Graphic({
        geometry: point,
        symbol: marker
      })
      const layer = new GraphicsLayer({
        graphics: [pointGraphic]
      })
      esriMap.add(layer)
      mapView.goTo([x, y])
    }
  )
}
