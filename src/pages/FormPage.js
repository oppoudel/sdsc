import React from 'react';
import { Container, Header } from 'semantic-ui-react';
import { Consumer } from '../AppContext';
import Search from '../components/SearchAddress/Search';
import EsriMap from '../components/Map/EsriMap';
import LocationDetails from '../components/LocationDetails';

const styles = {
  header: {
    marginTop: '3em'
  }
};

export default () => {
  return (
    <Container>
      <Header as="h2" style={styles.header}>
        Location Details
      </Header>
      <Consumer>
        {({ onXYupdate, x, y }) => (
          <div>
            <Search updateXY={onXYupdate} />
            <EsriMap updateXY={onXYupdate} />
            <LocationDetails x={x} y={y} />
          </div>
        )}
      </Consumer>
    </Container>
  );
};
