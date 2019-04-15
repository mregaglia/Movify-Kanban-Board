import React, { Component } from "react";
import { ThemeProvider } from "styled-components";
import theme from "./style/theme";
import Login from "./auth/Login";

class App extends Component {
  render() {
    return (
      <ThemeProvider theme={theme}>
        <Login />
      </ThemeProvider>
    );
  }
}

export default App;
