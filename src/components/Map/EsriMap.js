import { loadModules } from 'esri-loader'
import React, { Component, Fragment } from 'react'
import { Header, Card } from 'semantic-ui-react'
import { getGeolocation, addPoint } from './utils'
import { bpdApp } from './mapConfig'

const styles = {
  header: {
    marginTop: '3em'
  },
  mapDiv: {
    height: '300px',
    width: '100',
    marginTop: '1em',
    position: 'relative'
  }
}

export default class EsriMap extends Component {
  viewdivRef = React.createRef()
  state = {
    esriMap: {
      center: bpdApp.initCenter,
      zoom: 16
    }
  }
  componentDidMount = () => {
    this.createMap()
  }
  createMap() {
    const {
      esriMap: { zoom, center }
    } = this.state

    loadModules(['esri/views/MapView', 'esri/Map']).then(([MapView, Map]) => {
      let webmap, view
      if (!bpdApp.esriMap) {
        webmap = new Map({
          basemap: 'topo-vector'
        })
        bpdApp.esriMap = webmap
      } else {
        webmap = bpdApp.esriMap
      }
      if (!bpdApp.mapView) {
        view = new MapView({
          map: webmap,
          container: this.viewdivRef.current,
          zoom: zoom,
          center: center
        })
        bpdApp.mapView = view
      } else {
        view = bpdApp.mapView
      }
      view.when(() => getGeolocation(cords => addPoint(...cords)))
    })
  }
  componentWillUnmount = () => {
    bpdApp.esriMap = null
    bpdApp.mapView = null
  }

  render() {
    return (
      <Fragment>
        <Header as="h2" style={styles.header}>
          Location Details
        </Header>
        <Card fluid>
          <div style={styles.mapDiv} ref={this.viewdivRef} />
        </Card>
      </Fragment>
    )
  }
}
