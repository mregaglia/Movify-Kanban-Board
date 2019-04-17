import React, { Component } from "react";
import { ThemeProvider } from "styled-components";
import { BrowserRouter as Router, Route } from "react-router-dom";
import { getToken, getBaseUrl } from "./utils/storage";
import { setToken, setBaseUrl } from "./utils/api";
import theme from "./style/theme";
import AuthenticatedRoute from "./components/AuthenticatedRoute";
import Home from "./auth/Home";
import Login from "./auth/Login";
import Kanban from "./kanban/Kanban";

class App extends Component {
  componentDidMount() {
    const token = getToken();
    const baseUrl = getBaseUrl();
    if (token) setToken(token);
    if (baseUrl) setBaseUrl(baseUrl);
  }

  render() {
    return (
      <Router>
        <ThemeProvider theme={theme}>
          <div>
            <Route exact path="/" component={Home} />
            <Route exact path="/login" component={Login} />
            <AuthenticatedRoute exact path="/kanban" component={Kanban} />
          </div>
        </ThemeProvider>
      </Router>
    );
  }
}

export default App;
