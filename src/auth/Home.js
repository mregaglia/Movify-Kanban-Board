import React from "react";
import { connect } from "react-redux";
import { Redirect } from "react-router-dom";
import { path } from "ramda";
import { bool, func } from "prop-types";

const Home = ({ authenticated }) => {
  if (authenticated) return <Redirect to="/kanban" />;
  else if (authenticated === false) return <Redirect to="/login" />;
  else return <div>splash</div>;
};

Home.propTypes = {
  authenticated: bool,
  checkAuth: func
};

export default connect(state => ({
  authenticated: path(["auth", "authenticated"], state)
}))(Home);
