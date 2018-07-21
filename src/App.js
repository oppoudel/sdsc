import React, { Component } from 'react'
import { BrowserRouter as Router, Route } from 'react-router-dom'
import TopMenu from './components/TopMenu'
import LoginForm from './components/Login'
import { Provider, Consumer } from './AppContext'
import FormPage from './components/FormPage'

class App extends Component {
  render() {
    return (
      <Provider>
        <Router>
          <div>
            <TopMenu />
            <Route exact path="/" component={FormPage} />
            <Route
              path="/login"
              render={() => (
                <Consumer>
                  {({ login }) => <LoginForm login={login} />}
                </Consumer>
              )}
            />
          </div>
        </Router>
      </Provider>
    )
  }
}

export default App
