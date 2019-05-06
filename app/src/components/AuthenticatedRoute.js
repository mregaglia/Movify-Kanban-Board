import React from "react";
import { connect } from "react-redux";
import { path } from "ramda";
import { bool, func, object, oneOfType } from "prop-types";
import { Redirect, Route } from "react-router-dom";

const AuthenticatedRoute = ({
  authenticated,
  component: Component,
  ...props
}) => (
  <Route
    {...props}
    render={props => {
      return authenticated ? (
        <Component {...props} />
      ) : (
        <Redirect
          to={{ pathname: "/login", state: { from: props.location } }}
        />
      );
    }}
  />
);

AuthenticatedRoute.propTypes = {
  authenticated: bool,
  component: oneOfType([func, object])
};

export default connect(state => ({
  authenticated: path(["auth", "authenticated"], state)
}))(AuthenticatedRoute);
