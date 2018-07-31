import React from "react";
import { Container, Header } from "semantic-ui-react";
import Search from "../components/SearchAddress/Search";
import EsriMap from "../components/Map/EsriMap";
import InputForm from "../components/InputForm";

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
      <InputForm />
    </Container>
  );
};
