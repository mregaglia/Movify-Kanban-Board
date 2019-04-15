import React, { useEffect } from "react";
import { connect } from "react-redux";
import { func, object } from "prop-types";
import { login } from "./auth.actions";

const Login = ({ login, user }) => {
  useEffect(() => {
    login();
  }, []);

  return (
    <div>
      <span>hello</span>
      {user.loading && <p>loading...</p>}
    </div>
  );
};

Login.propTypes = {
  login: func,
  user: object
};

export default connect(
  state => ({ user: state.user }),
  { login }
)(Login);
