import { loadModules } from "esri-loader";
import React, { Component } from "react";
import { getGeolocation } from "../utils";

const styles = {
  mapDiv: {
    height: "300px",
    width: "100",
    marginTop: "4em",
    position: "relative"
  }
};

export default class EsriMap extends Component {
  viewdivRef = React.createRef();
  state = {
    esriMap: {
      center: [-76.593, 39.289],
      zoom: 14
    }
  };
  componentDidMount = () => {
    this.createMap();
  };

  createMap() {
    const {
      esriMap: { zoom, center }
    } = this.state;
    getGeolocation(cords =>
      this.setState(prevState => ({
        esriMap: { ...prevState.esriMap, center: cords }
      }))
    );
    loadModules(["esri/views/MapView", "esri/Map"]).then(([MapView, Map]) => {
      const webmap = new Map({
        basemap: "topo-vector"
      });
      const view = new MapView({
        map: webmap,
        container: "viewDiv",
        zoom: zoom,
        center: center
      });
    });
  }

  render() {
    return <div id="viewDiv" style={styles.mapDiv} />;
  }
}
