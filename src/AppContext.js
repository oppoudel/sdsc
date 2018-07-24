import React, { Component } from "react";
import { generateToken } from "@esri/arcgis-rest-auth";
import { tokenUrl } from "./config";
const AppContext = React.createContext();

export class Provider extends Component {
  login = data => {
    generateToken(tokenUrl, data)
      .catch(error => this.setState({ error: error.originalMessage }))
      .then(response => {
        if (response) {
          localStorage.setItem("bpdToken", JSON.stringify(response));
          this.setState({ isAuthenticated: true, error: "" });
        }
      });
  };
  logout = () => {
    localStorage.removeItem("bpdToken");
    this.setState({ isAuthenticated: false, error: "" });
  };
  state = {
    isAuthenticated: true,
    error: "",
    login: this.login,
    logout: this.logout
  };
  async componentDidMount() {}
  render() {
    return (
      <AppContext.Provider value={this.state}>
        {this.props.children}
      </AppContext.Provider>
    );
  }
}

export const Consumer = AppContext.Consumer;
