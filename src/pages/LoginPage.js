import React, { useContext, useState } from "react";
import { Redirect } from "react-router-dom";
import {
  Button,
  Container,
  Form,
  Grid,
  Header,
  Message,
  Segment
} from "semantic-ui-react";
import AppContext from "../AppContext";

function useFormInput(initialValue) {
  const [value, setValue] = useState(initialValue);
  function handleChange(e) {
    setValue(e.target.value);
  }
  return {
    value,
    onChange: handleChange
  };
}

export default function Login() {
  const { isAuthenticated, login, error } = useContext(AppContext);
  const username = useFormInput("");
  const password = useFormInput("");

  const handleSubmit = e => {
    e.preventDefault();
    login({
      username: `baltimore\\${username.value}`,
      password: password.value
    });
  };

  if (isAuthenticated === true) {
    return <Redirect to="/" />;
  }
  return (
    <Container className="login-form">
      <style>{`
      body > div,
      body > div > div,
      body > div > div > div.login-form {
        height: 100%;
      }
    `}</style>
      <Grid
        textAlign="center"
        style={{ height: "100%" }}
        verticalAlign="middle"
      >
        <Grid.Column style={{ maxWidth: 450 }}>
          <Header as="h2" color="teal" textAlign="center">
            Log-in to your account
          </Header>
          <Form size="large" onSubmit={handleSubmit}>
            <Segment stacked>
              <Form.Input
                fluid
                icon="user"
                iconPosition="left"
                placeholder="Username"
                {...username}
              />
              <Form.Input
                fluid
                icon="lock"
                iconPosition="left"
                placeholder="Password"
                type="password"
                {...password}
              />

              <Button color="teal" fluid size="large" type="submit">
                Login
              </Button>
            </Segment>
          </Form>
          {error.length > 0 ? <Message negative>{error}</Message> : null}
        </Grid.Column>
      </Grid>
    </Container>
  );
}
