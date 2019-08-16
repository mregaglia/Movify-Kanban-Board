import React, { useEffect } from "react";
import { connect } from "react-redux";
import { func, object } from "prop-types";
import { ThemeProvider } from "styled-components";
import { BrowserRouter as Router } from "react-router-dom";
import Modal from "react-modal";
import { getToken, getBaseUrl } from "./utils/storage";
import { setToken, setBaseUrl } from "./utils/api";
import theme from "./style/theme";
import { checkAuth } from "./auth/auth.actions";
import Routes from "./Routes"

const App = ({ checkAuth }) => {
  useEffect(() => {
    Modal.setAppElement("body");

    const token = getToken();
    const baseUrl = getBaseUrl();
    if (token) setToken(token);
    if (baseUrl) setBaseUrl(baseUrl);

    checkAuth();
  }, [checkAuth]);

  return (
    <Router>
      <ThemeProvider theme={theme}>
        <Routes />
      </ThemeProvider>
    </Router>
  );
}

App.propTypes = {
  addCandidate: func,
  checkAuth: func,
  location: object,
  updateKanbanJobSubmission: func,
  updateRecruitmentJobSubmission: func
};

export default connect(
  null,
  { checkAuth }
)(App);