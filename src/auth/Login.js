import React, { useEffect } from "react";
import { connect } from "react-redux";
import { pathOr } from "ramda";
import { func, object } from "prop-types";
import { Redirect } from "react-router-dom";
import styled from "styled-components";
import LoginForm from "./Login.form";
import { authorize, login } from "./auth.actions";
import { getCode } from "./auth.service";

const Welcome = styled.div(({ theme }) => ({
  marginTop: "10%",
  marginBottom: 60,
  marginLeft: "10%",
  color: theme.colors.red,
  fontFamily: theme.fonts.fontFamily,
  fontSize: theme.textDimensions.big
}));

const Login = ({ authorize, login, auth, location }) => {
  useEffect(() => {
    const code = getCode(window.location.href);
    if (code.length > 0) login(code);
  }, [login]);

  if (auth.authenticated)
    return (
      <Redirect to={pathOr("/", ["state", "from", "pathname"], location)} />
    );

  const isLoading = auth.loading || auth.isCheckingAuth;

  return (
    <div>
      <Welcome>Welcome to Movify Kanban Board !</Welcome>
      <LoginForm isLoading={isLoading} onSubmit={authorize} />
    </div>
  );
};

Login.propTypes = {
  auth: object,
  authorize: func,
  checkAuth: func,
  login: func,
  location: object
};

export default connect(
  state => ({ auth: state.auth }),
  { authorize, login }
)(Login);
