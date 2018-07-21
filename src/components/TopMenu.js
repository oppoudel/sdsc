import React from 'react'
import { Link } from 'react-router-dom'
import { Menu, Container, Header } from 'semantic-ui-react'

export default () => {
  return (
    <Menu fixed="top">
      <Container>
        <Menu.Item>
          <Link to="/">Test</Link>
        </Menu.Item>
        <Menu.Item>
          <Link to="/login">Login</Link>
        </Menu.Item>
        <Menu.Item>
          <Header as="h3" color="teal">
            BPD Auth
          </Header>
        </Menu.Item>
      </Container>
    </Menu>
  )
}
