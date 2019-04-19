import React, { useEffect } from "react";
import { connect } from "react-redux";
import { pathOr } from "ramda";
import { func, object } from "prop-types";
import { Redirect } from "react-router-dom";
import { login } from "./auth.actions";
import { getAuthorizeUrl, getCode } from "./auth.service";

const Login = ({ login, auth, location }) => {
  useEffect(() => {
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
      {auth.isCheckingAuth && <p>checking auth</p>}
      {!auth.loading && !auth.isCheckingAuth && (
        <a href={getAuthorizeUrl()}>Login on BullHorn</a>
      )}
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
  { login }
)(Login);
