import React, { Component } from "react";
import { BrowserRouter as Router, Route, Redirect } from "react-router-dom";
import TopMenu from "./components/TopMenu";
import LoginForm from "./pages/LoginPage";
import { Provider, Consumer } from "./AppContext";
import FormPage from "./pages/FormPage";

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
);

class App extends Component {
  render() {
    return (
      <Provider>
        <Router>
          <div>
            <Consumer>
              {({ logout, isAuthenticated }) => (
                <TopMenu logout={logout} isAuthenticated={isAuthenticated} />
              )}
            </Consumer>
            <Route
              path="/login"
              render={() => (
                <Consumer>
                  {({ login, isAuthenticated, error }) => (
                    <LoginForm
                      login={login}
                      isAuthenticated={isAuthenticated}
                      error={error}
                    />
                  )}
                </Consumer>
              )}
            />
            <PrivateRoute exact path="/" component={FormPage} />
          </div>
        </Router>
      </Provider>
    );
  }
}

export default App;
