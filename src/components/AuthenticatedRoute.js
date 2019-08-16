import React from "react";
import { connect } from "react-redux";
import { path } from "ramda";
import { bool, func, object, oneOfType } from "prop-types";
import { Redirect, Route } from "react-router-dom";

const AuthenticatedRoute = ({
  authenticated,
  component: Component,
  ...routeProps
}) => (
    <Route
      {...routeProps}
      render={props => {
        return authenticated ? (
          <Component {...props} {...routeProps} />
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
  component: oneOfType([func, object]),
  location: object
};

export default connect(state => ({
  authenticated: path(["auth", "authenticated"], state)
}))(AuthenticatedRoute);
