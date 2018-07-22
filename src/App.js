import React, { Component } from 'react'
import { BrowserRouter as Router, Route, Redirect } from 'react-router-dom'
import TopMenu from './components/TopMenu'
import LoginForm from './components/Login'
import { Provider, Consumer } from './AppContext'
import FormPage from './components/FormPage'

const PrivateRoute = ({ component: Component, ...rest }) => (
  <Route
    {...rest}
    render={props => (
      <Consumer>
        {({ isAuthenticated }) =>
          isAuthenticated === true ? (
            <Component {...props} />
          ) : (
            <Redirect to="/login" />
          )
        }
      </Consumer>
    )}
  />
)

class App extends Component {
  render() {
    return (
      <Provider>
        <Router>
          <div>
            <TopMenu />
            <Route
              path="/login"
              render={() => (
                <Consumer>
                  {({ login, isAuthenticated }) => (
                    <LoginForm
                      login={login}
                      isAuthenticated={isAuthenticated}
                    />
                  )}
                </Consumer>
              )}
            />
            <PrivateRoute exact path="/" component={FormPage} />
          </div>
        </Router>
      </Provider>
    )
  }
}

export default App
