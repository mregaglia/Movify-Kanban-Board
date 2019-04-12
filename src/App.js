import React, { Component } from "react";
import { ThemeProvider } from "styled-components";
import theme from "./style/theme";
import logo from "./logo.svg";
import "./App.css";

class App extends Component {
  render() {
    return (
      <div className="App">
        <ThemeProvider theme={theme}>
          <header className="App-header">
            <img src={logo} className="App-logo" alt="logo" />
            <p>
              Edit <code>src/App.js</code> and save to reload.
            </p>
            <a
              className="App-link"
              href="https://reactjs.org"
              target="_blank"
              rel="noopener noreferrer"
            >
              Learn React
            </a>
          </header>
        </ThemeProvider>
      </div>
    );
  }
}

export default App;
