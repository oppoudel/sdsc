import React, { Component } from 'react'
import { Redirect } from 'react-router-dom'
import {
  Button,
  Form,
  Grid,
  Header,
  Segment,
  Container
} from 'semantic-ui-react'

export default class Login extends Component {
  state = {
    username: '',
    password: ''
  }
  handleChange = (e, { name, value }) => this.setState({ [name]: value })
  handleSubmit = e => {
    e.preventDefault()
    const { username, password } = this.state
    this.props.login({ username: `baltimore\\${username}`, password })
  }
  render() {
    const { isAuthenticated } = this.props
    if (isAuthenticated === true) {
      return <Redirect to="/" />
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
          style={{ height: '100%' }}
          verticalAlign="middle"
        >
          <Grid.Column style={{ maxWidth: 450 }}>
            <Header as="h2" color="teal" textAlign="center">
              Log-in to your account
            </Header>
            <Form size="large" onSubmit={this.handleSubmit}>
              <Segment stacked>
                <Form.Input
                  fluid
                  icon="user"
                  iconPosition="left"
                  placeholder="Username"
                  name="username"
                  onChange={this.handleChange}
                />
                <Form.Input
                  fluid
                  icon="lock"
                  iconPosition="left"
                  placeholder="Password"
                  type="password"
                  name="password"
                  onChange={this.handleChange}
                />

                <Button color="teal" fluid size="large" type="submit">
                  Login
                </Button>
              </Segment>
            </Form>
          </Grid.Column>
        </Grid>
      </Container>
    )
  }
}
