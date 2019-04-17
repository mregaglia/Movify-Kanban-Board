import React, { Component } from "react";
import { ThemeProvider } from "styled-components";
import { getToken, getBaseUrl } from "./utils/storage";
import { setToken, setBaseUrl } from "./utils/api";
import theme from "./style/theme";
import Login from "./auth/Login";

class App extends Component {
  componentDidMount() {
    const token = getToken();
    const baseUrl = getBaseUrl();
    if (token) setToken(token);
    if (baseUrl) setBaseUrl(baseUrl);
  }

  render() {
    return (
      <ThemeProvider theme={theme}>
        <Login />
      </ThemeProvider>
    );
  }
}

export default App;
