import React, { useContext } from "react";
import { Container, Header } from "semantic-ui-react";
import AppContext from "../AppContext";
import LocationDetails from "../components/LocationDetails";
import EsriMap from "../components/Map/EsriMap";
import Search from "../components/SearchAddress/Search";

const styles = {
  header: {
    marginTop: "3em"
  }
};

function FormPage() {
  const { onXYupdate, x, y } = useContext(AppContext);
  return (
    <Container>
      <Header as="h2" style={styles.header}>
        Location Details
      </Header>
      <Search updateXY={onXYupdate} />
      <EsriMap updateXY={onXYupdate} />
      <LocationDetails x={x} y={y} />
    </Container>
  );
}

export default FormPage;
