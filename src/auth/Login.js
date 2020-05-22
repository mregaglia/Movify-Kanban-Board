import React, { useEffect } from "react";
import { connect } from "react-redux";
import { pathOr } from "ramda";
import { func, object } from "prop-types";
import { Redirect } from "react-router-dom";
import styled from "styled-components";
import Loader from "../components/Loader";
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

const Button = styled.button(({ disabled, theme }) => ({
  display: "inline-block",
  padding: 16,
  marginLeft: "10%",
  borderWidth: 0,
  borderRadius: theme.dimensions.borderRadius,
  backgroundColor: disabled ? theme.colors.lightRed : theme.colors.red,
  color: theme.colors.darkWhite,
  fontFamily: theme.fonts.fontFamily,
  fontSize: theme.textDimensions.xlarge,
  textDecoration: "none",
  cursor: disabled ? "default" : "pointer"
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
      <Button disabled={isLoading} onClick={() => authorize()}>
        Sign in with Bullhorn
          {isLoading && <Loader style={{ marginLeft: 16 }} />}
      </Button>
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
