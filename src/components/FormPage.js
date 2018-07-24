import React from "react";
import { Container, Header } from "semantic-ui-react";
import Search from "./SearchAddress/Search";
import EsriMap from "./Map/EsriMap";

const styles = {
  header: {
    marginTop: "3em"
  }
};

export default () => {
  return (
    <Container>
      <Header as="h2" style={styles.header}>
        Location Details
      </Header>
      <Search />
      <EsriMap />
    </Container>
  );
};
