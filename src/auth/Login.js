import React, { useEffect } from "react";
import { connect } from "react-redux";
import { func, object } from "prop-types";
import { checkAuth, login } from "./auth.actions";
import { getAuthorizeUrl, getCode } from "./auth.service";

const Login = ({ checkAuth, login, auth }) => {
  useEffect(() => {
    checkAuth();
    const code = getCode(window.location.href);
    if (code.length > 0) login(code);
  }, []);

  return (
    <div>
      {auth.authenticated && <p>Logged in</p>}
      {!auth.authenticated && <p>Logged out</p>}
      {auth.loading && <p>loading...</p>}
      <a href={getAuthorizeUrl()}>Login on BullHorn</a>
    </div>
  );
};

Login.propTypes = {
  auth: object,
  checkAuth: func,
  login: func
};

export default connect(
  state => ({ auth: state.auth }),
  { checkAuth, login }
)(Login);
