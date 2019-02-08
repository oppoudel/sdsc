import React, { useContext } from "react";
import { BrowserRouter as Router, Redirect, Route } from "react-router-dom";
import AppContext, { Provider } from "./AppContext";
import TopMenu from "./components/TopMenu";
import FormPage from "./pages/FormPage";
import LoginPage from "./pages/LoginPage";

const PrivateRoute = ({ component: Component, ...rest }) => {
  const { isAuthenticated } = useContext(AppContext);
  return (
    <Route
      {...rest}
      render={props =>
        isAuthenticated === true ? (
          <Component {...props} />
        ) : (
          <Redirect to="/login" />
        )
      }
    />
  );
};

function App() {
  return (
    <Provider>
      <Router>
        <div>
          <TopMenu />
          <Route path="/login" render={() => <LoginPage />} />
          <PrivateRoute exact path="/" component={FormPage} />
        </div>
      </Router>
    </Provider>
  );
}

export default App;
