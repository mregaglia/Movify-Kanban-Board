import React, { useEffect } from "react";
import { connect } from "react-redux";
import { func, object } from "prop-types";
import { login } from "./auth.actions";

const Login = ({ login, auth }) => {
  useEffect(() => {
    login();
  }, []);

  return (
    <div>
      <span>hello</span>
      {auth.loading && <p>loading...</p>}
    </div>
  );
};

Login.propTypes = {
  login: func,
  auth: object
};

export default connect(
  state => ({ auth: state.auth }),
  { login }
)(Login);
