import React, { useContext } from "react";
import { Link } from "react-router-dom";
import { Button, Container, Header, Menu } from "semantic-ui-react";
import AppContext from "../AppContext";

export default function TopMenu() {
  const { logout, isAuthenticated } = useContext(AppContext);
  return (
    <Menu fixed="top">
      <Container>
        <Menu.Item>
          <Link to="/">Test</Link>
        </Menu.Item>
        <Menu.Item>
          <Header as="h3" color="teal">
            BPD Auth
          </Header>
        </Menu.Item>
        <Menu.Menu position="right">
          <Menu.Item>
            {!isAuthenticated ? (
              <Link to="/login">Login</Link>
            ) : (
              <Button onClick={logout} color="teal">
                Logout
              </Button>
            )}
          </Menu.Item>
        </Menu.Menu>
      </Container>
    </Menu>
  );
}
