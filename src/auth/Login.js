import React, { useEffect } from "react";
import { connect } from "react-redux";
import { pathOr } from "ramda";
import { func, object } from "prop-types";
import { Redirect } from "react-router-dom";
import { checkAuth, login } from "./auth.actions";
import { getAuthorizeUrl, getCode } from "./auth.service";

const Login = ({ checkAuth, login, auth, location }) => {
  useEffect(() => {
    checkAuth();
    const code = getCode(window.location.href);
    if (code.length > 0) login(code);
  }, []);

  if (auth.authenticated)
    return (
      <Redirect to={pathOr("/", ["state", "from", "pathname"], location)} />
    );

  return (
    <div>
      {auth.loading && <p>loading...</p>}
      <a href={getAuthorizeUrl()}>Login on BullHorn</a>
    </div>
  );
};

Login.propTypes = {
  auth: object,
  checkAuth: func,
  login: func,
  location: object
};

export default connect(
  state => ({ auth: state.auth }),
  { checkAuth, login }
)(Login);
