import { generateToken } from "@esri/arcgis-rest-auth";
import React, { useState } from "react";
import { tokenUrl } from "./config";
const AppContext = React.createContext();

export function Provider(props) {
  const [location, setLocation] = useState({});
  function onXYupdate(x, y) {
    setLocation({ x, y });
  }

  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [error, setError] = useState("");
  function login(data) {
    generateToken(tokenUrl, data)
      .catch(error => setError(error.originalMessage))
      .then(response => {
        if (response) {
          localStorage.setItem("bpdToken", JSON.stringify(response));
          setIsAuthenticated(true);
        }
      });
  }
  function logout() {
    localStorage.removeItem("bpdToken");
    setIsAuthenticated(false);
  }
  const state = {
    x: location.x,
    y: location.y,
    isAuthenticated,
    error,
    onXYupdate: onXYupdate,
    login,
    logout
  };

  return (
    <AppContext.Provider value={state}>{props.children}</AppContext.Provider>
  );
}

export const Consumer = AppContext.Consumer;
export default AppContext;
