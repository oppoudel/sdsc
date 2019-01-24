import { geoQueries } from '../config';
import { queryFeatures } from '@esri/arcgis-rest-feature-service';
import isEqual from 'react-fast-compare';

import React, { Component } from 'react';
import { Input } from 'semantic-ui-react';

export default class ServiceList extends Component {
  state = {
    Neighborhood: '',
    PoliceDistrict: '',
    PolicePost: '',
    VRI: '',
    CouncilDistrict: '',
    Trash: '',
    Zoning: ''
  };
  componentDidMount() {
    this.runQueryFeatures();
  }
  componentDidUpdate({ children: _, ...prevProps }) {
    const { children, ...props } = this.props;
    if (!isEqual(prevProps, props)) {
      this.runQueryFeatures();
    }
  }
  getFeatures = item => {
    const { x, y } = this.props;
    return queryFeatures({
      url: item.url,
      geometryType: 'esriGeometryPoint',
      geometry: [x, y],
      inSR: { wkid: 4326 },
      returnGeometry: false,
      spatialRel: 'esriSpatialRelIntersects'
    });
  };
  runQueryFeatures = () => {
    const { x, y } = this.props;
    if (x && y) {
      geoQueries.forEach((item, i) => {
        this.getFeatures(item).then(feature => {
          if (feature.features.length > 0) {
            this.setState({
              [item.name]: feature.features[0].attributes[item.fName]
            });
          } else {
            this.setState({ [item.name]: 'No' });
          }
        });
      });
    }
  };
  render() {
    const {
      Neighborhood,
      PoliceDistrict,
      PolicePost,
      VRI,
      CouncilDistrict,
      Trash,
      Zoning
    } = this.state;
    return (
      <div>
        <Input label="Neighborhood" value={Neighborhood} fluid />
        <br />
        <Input label="Police District" value={PoliceDistrict} fluid />
        <br />
        <Input label="Police Post" value={PolicePost} fluid /> <br />
        <Input label="VRI Zone" value={VRI} fluid /> <br />
        <Input label="Council District" value={CouncilDistrict} fluid />
        <br />
        <Input label="Trash/Recycle Days" value={Trash} fluid />
        <br />
        <Input label="Zoning" value={Zoning} fluid />
      </div>
    );
  }
}
